/** Locale namespace owned by Session export browser feedback. */
export const NS = 'session-log-download'

/** Simplified-Chinese Session export strings. */
export const zh = {
  'menu.copyMarkdown': '复制会话为 Markdown',
  'menu.download': '下载 Session 日志',
  'menu.feedback': '反馈',
  'toast.copied': 'Session 已复制为 Markdown',
  'toast.preparationFailed': '无法读取 Session 进行复制，请重试',
  'toast.clipboardFailed': '无法写入剪贴板，请检查剪贴板权限后重试',
  'dialog.session': 'Session：{sessionId}',
  'dialog.preparingTitle': '正在导出 Session',
  'dialog.preparingDescription': '正在准备包含指定 Session、子 Session 和附件的 ZIP 文件',
  'dialog.successTitle': 'Session 导出已开始下载',
  'dialog.successDescription': '浏览器正在下载 Session ZIP 文件。',
  'dialog.errorTitle': 'Session 导出失败',
  'dialog.close': '关闭',
  'dialog.commandFailed': '无法启动 Session 导出。',
} as const

/** English Session export strings. */
export const en: Record<keyof typeof zh, string> = {
  'menu.copyMarkdown': 'Copy Session as Markdown',
  'menu.download': 'Download session log',
  'menu.feedback': 'Feedback',
  'toast.copied': 'Session copied as Markdown.',
  'toast.preparationFailed': 'Could not read the Session for copying. Try again.',
  'toast.clipboardFailed': 'Could not write to the clipboard. Check clipboard permission and try again.',
  'dialog.session': 'Session: {sessionId}',
  'dialog.preparingTitle': 'Exporting Session',
  'dialog.preparingDescription': 'Preparing a ZIP containing the selected Session, its sub-Sessions, and attachments.',
  'dialog.successTitle': 'Session download started',
  'dialog.successDescription': 'The browser is downloading the Session ZIP.',
  'dialog.errorTitle': 'Session export failed',
  'dialog.close': 'Close',
  'dialog.commandFailed': 'Could not start the Session export.',
}

/** Stable locale keys consumed by the shared modal. */
export type SessionLogDownloadKey = keyof typeof zh

/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  'menu.copyMarkdown': 'Sao chép phiên dưới dạng Markdown',
  'menu.download': 'Tải nhật ký phiên',
  'menu.feedback': 'Phản hồi',
  'toast.copied': 'Đã sao chép phiên dưới dạng Markdown.',
  'toast.preparationFailed': 'Không thể đọc phiên để sao chép. Hãy thử lại.',
  'toast.clipboardFailed': 'Không thể ghi vào clipboard. Hãy kiểm tra quyền clipboard và thử lại.',
  'dialog.session': 'Phiên: {sessionId}',
  'dialog.preparingTitle': 'Đang xuất phiên',
  'dialog.preparingDescription': 'Đang chuẩn bị tệp ZIP chứa phiên đã chọn, các phiên con và tệp đính kèm.',
  'dialog.successTitle': 'Đã bắt đầu tải phiên',
  'dialog.successDescription': 'Trình duyệt đang tải tệp ZIP của phiên.',
  'dialog.errorTitle': 'Xuất phiên thất bại',
  'dialog.close': 'Đóng',
  'dialog.commandFailed': 'Không thể bắt đầu xuất phiên.',
} satisfies Record<keyof typeof en, string>
