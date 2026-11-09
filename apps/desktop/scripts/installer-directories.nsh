!include "LogicLib.nsh"

Var quyetFinalDirectory
Var quyetNewDirectory
Var quyetOldDirectory
Var quyetOldMoved
Var quyetNewMoved
Var quyetDirectoryError
Var quyetDirectorySource
Var quyetDirectoryDestination
Var quyetRestoreError
Var quyetDirectoryLogDirectory
Var quyetRecoveryStopped

; MoveFileEx preserves the destination and exposes the Windows error before rollback changes it.
; Open files inside a directory can make its rename return access denied (5).
!macro quyetDirectoryOperation SOURCE DESTINATION RESULT PHASE
  Push $0
  Push $1
  Push $2
  StrCpy $0 0
  ${Do}
    ${If} "${DESTINATION}" == ""
      System::Call 'kernel32::RemoveDirectoryW(w "${SOURCE}") i.r1 ?e'
    ${Else}
      System::Call 'kernel32::MoveFileExW(w "${SOURCE}", w "${DESTINATION}", i 0) i.r1 ?e'
    ${EndIf}
    Pop ${RESULT}
    ${If} "${DESTINATION}" == ""
      ${If} ${RESULT} == 2
      ${OrIf} ${RESULT} == 3
        StrCpy $1 1
      ${EndIf}
    ${EndIf}
    ${If} $1 != 0
      StrCpy ${RESULT} 0
      ${ExitDo}
    ${EndIf}
    ClearErrors
    FileOpen $2 "$PLUGINSDIR\directory-operations.log" a
    ${IfNot} ${Errors}
      FileSeek $2 0 END
      FileWrite $2 "${PHASE}: Windows error: ${RESULT}$\r$\n"
      FileClose $2
    ${EndIf}
    ${If} ${RESULT} != 5
    ${AndIf} ${RESULT} != 32
    ${AndIf} ${RESULT} != 33
      ${ExitDo}
    ${EndIf}
    IntOp $0 $0 + 1
    ${If} $0 >= 10
      ${ExitDo}
    ${EndIf}
    IntOp $1 $0 * 250
    Sleep $1
  ${Loop}
  Pop $2
  Pop $1
  Pop $0
!macroend

!macro quyetReportDirectoryFailure
  ${If} $quyetRestoreError != 0
    StrCpy $quyetRecoveryStopped "1"
  ${EndIf}
  !ifmacrodef customInstallerDirectoryFailed
    !insertmacro customInstallerDirectoryFailed
  !else
    DetailPrint "Directory operation failed ($quyetDirectoryError): $quyetDirectorySource -> $quyetDirectoryDestination; restore error: $quyetRestoreError"
  !endif
!macroend

!macro quyetExtractPayload FILE
  !ifmacrodef customInstallerExtract
    !insertmacro customInstallerExtract "${FILE}"
  !else
    nsExec::ExecToStack '"$PLUGINSDIR\quyet-7za.exe" x -y -bd -bb0 "-o$INSTDIR" "${FILE}"'
    Pop $R0
    Pop $R1
  !endif
  ${If} $R0 != 0
    DetailPrint $R1
    Call quyetRollbackDirectories
    !ifmacrodef customInstallerExtractFailed
      !insertmacro customInstallerExtractFailed "${FILE}"
    !else
      MessageBox MB_OK|MB_ICONEXCLAMATION "$(decompressionFailed)" /SD IDOK
    !endif
    SetErrorLevel 2
    Quit
  ${EndIf}
!macroend

!macro quyetStageApplication
  !ifdef QUYET_INSTALLER_LOG_DIR
    ; electron-builder defines the cache name after including our function bodies, before this section expands.
    StrCpy $quyetDirectoryLogDirectory "${QUYET_INSTALLER_LOG_DIR}"
  !endif
  StrCpy $quyetFinalDirectory $INSTDIR
  System::Call 'ole32::CoCreateGuid(g .r0) i .r1'
  ${If} $1 != 0
    SetErrorLevel 2
    Quit
  ${EndIf}
  StrCpy $quyetNewDirectory "$INSTDIR.new-$0"
  StrCpy $quyetOldDirectory "$INSTDIR.old-$0"
  StrCpy $quyetOldMoved ""
  StrCpy $quyetNewMoved ""
  StrCpy $quyetDirectoryError 0
  StrCpy $quyetRestoreError 0
  StrCpy $quyetRecoveryStopped ""
  ClearErrors
  CreateDirectory $quyetNewDirectory
  ${If} ${Errors}
    SetErrorLevel 2
    Quit
  ${EndIf}
  File /oname=$PLUGINSDIR\quyet-7za.exe "${QUYET_SEVENZIP_PATH}"
  StrCpy $INSTDIR $quyetNewDirectory
  SetOutPath $INSTDIR
  !insertmacro installApplicationFiles
  !ifdef QUYET_SEVENZIP_LICENSE_DIR
    File /oname=7zip-installer-LICENSE.txt "${QUYET_SEVENZIP_LICENSE_DIR}\LICENSE.txt"
    File /oname=7zip-installer-COPYING.txt "${QUYET_SEVENZIP_LICENSE_DIR}\COPYING"
  !endif
  !ifdef UNINSTALLER_ICON
    File /oname=uninstallerIcon.ico "${UNINSTALLER_ICON}"
  !endif
  StrCpy $INSTDIR $quyetFinalDirectory
  SetOutPath $PLUGINSDIR
!macroend

Function .onGUIEnd
  Call quyetCleanupDirectories
FunctionEnd

Function quyetCleanupDirectories
  ${If} $quyetRecoveryStopped == "1"
    Return
  ${EndIf}
  ${If} $quyetFinalDirectory != ""
    Call quyetRollbackDirectories
  ${EndIf}
FunctionEnd

; Only directories created or renamed by this installer are removed during rollback.
Function quyetRollbackDirectories
  SetOutPath $PLUGINSDIR
  ${If} $quyetNewMoved == "1"
    RMDir /r "\\?\$quyetFinalDirectory"
    StrCpy $quyetNewMoved ""
  ${EndIf}
  ${If} $quyetOldMoved == "1"
    !insertmacro quyetDirectoryOperation "$quyetOldDirectory" "$quyetFinalDirectory" $quyetRestoreError "restore"
    ${If} $quyetRestoreError != 0
      ; Leave the complete backup in place if another process prevents restoration.
      DetailPrint $quyetOldDirectory
      RMDir /r "\\?\$quyetNewDirectory"
      Return
    ${EndIf}
    StrCpy $quyetOldMoved ""
  ${EndIf}
  ${If} $quyetNewDirectory != ""
    RMDir /r "\\?\$quyetNewDirectory"
  ${EndIf}
  StrCpy $INSTDIR $quyetFinalDirectory
FunctionEnd

Function quyetPromoteDirectories
  !ifmacrodef InstallerPublishStage
    !insertmacro InstallerPublishStage 2
  !endif
  ; SetOutPath opens a directory handle; release it before either rename.
  SetOutPath $PLUGINSDIR
  ClearErrors
  ${If} ${FileExists} "$quyetFinalDirectory\*.*"
    StrCpy $quyetDirectorySource $quyetFinalDirectory
    StrCpy $quyetDirectoryDestination $quyetOldDirectory
    !insertmacro quyetDirectoryOperation "$quyetDirectorySource" "$quyetDirectoryDestination" $quyetDirectoryError "backup"
    ${If} $quyetDirectoryError != 0
      Call quyetRollbackDirectories
      !insertmacro quyetReportDirectoryFailure
      SetErrors
      Return
    ${EndIf}
    StrCpy $quyetOldMoved "1"
  ${Else}
    ; NSIS can create the destination before the install section starts.
    StrCpy $quyetDirectorySource $quyetFinalDirectory
    StrCpy $quyetDirectoryDestination ""
    !insertmacro quyetDirectoryOperation "$quyetDirectorySource" "" $quyetDirectoryError "remove-empty"
    ${If} $quyetDirectoryError != 0
      Call quyetRollbackDirectories
      !insertmacro quyetReportDirectoryFailure
      SetErrors
      Return
    ${EndIf}
  ${EndIf}
  ClearErrors
  StrCpy $quyetDirectorySource $quyetNewDirectory
  StrCpy $quyetDirectoryDestination $quyetFinalDirectory
  !insertmacro quyetDirectoryOperation "$quyetDirectorySource" "$quyetDirectoryDestination" $quyetDirectoryError "promote"
  ${If} $quyetDirectoryError != 0
    Call quyetRollbackDirectories
    !insertmacro quyetReportDirectoryFailure
    SetErrors
    Return
  ${EndIf}
  StrCpy $quyetNewMoved "1"
  SetOutPath $quyetFinalDirectory
  !ifmacrodef InstallerPublishStage
    !insertmacro InstallerPublishStage 3
  !endif
  ClearErrors
FunctionEnd

!macro quyetFinishDirectories
  StrCpy $quyetNewMoved ""
  ${If} $quyetOldMoved == "1"
    RMDir /r "\\?\$quyetOldDirectory"
    StrCpy $quyetOldMoved ""
  ${EndIf}
!macroend
