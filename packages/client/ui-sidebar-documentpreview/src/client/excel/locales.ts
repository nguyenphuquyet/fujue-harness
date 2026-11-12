/** Locale-owned Excel preview controls and parser feedback. */
export const zh = {
  title: '表格', language: 'zh', loading: '文档渲染中...',
  invalid: '无法打开此表格。请检查文件格式、内容或密码保护。',
  tooLarge: '此表格超过预览大小限制。', timeout: '打开表格超时。请缩小文件后重试。',
  encoding: '无法识别此文本文件的编码。请另存为 UTF-8 或带 BOM 的 UTF-16 后重试。',
  formulaWarning: '此工作簿包含公式，显示结果可能缺失或不准确。',
  unsupportedNotice: '当前预览不支持此工作簿中的{features}。请使用系统应用打开，以获得完整体验。',
  charts: '图表', images: '图片', shapes: '形状', conditionalFormatting: '条件格式', featureSeparator: '、',
  retry: '重试',
} satisfies Record<string, string>

/** Excel preview dictionary keys. */
export type ExcelPreviewKey = keyof typeof zh

/** English Excel preview copy. */
export const en = {
  title: 'Spreadsheet', language: 'en', loading: 'Rendering document...',
  invalid: 'This spreadsheet could not be opened. Check its format, contents, or password protection.',
  tooLarge: 'This workbook exceeds the preview size limit.', timeout: 'Opening this workbook timed out. Try a smaller file.',
  encoding: 'This text encoding could not be read. Save the file as UTF-8 or UTF-16 with a BOM and retry.',
  formulaWarning: 'This workbook contains formulas. Displayed results may be missing or inaccurate.',
  unsupportedNotice: 'This preview does not support {features} in this workbook. Open it in a system application for the full experience.',
  charts: 'charts', images: 'images', shapes: 'shapes', conditionalFormatting: 'conditional formatting', featureSeparator: ', ',
  retry: 'Retry',
} satisfies Record<ExcelPreviewKey, string>

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** Excel preview status and third-party locale selection. */
    sidebarExcel: ExcelPreviewKey
  }
}







/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  title: 'Bảng tính', language: 'vi', loading: 'Đang kết xuất tài liệu...',
  invalid: 'Không thể mở bảng tính này. Hãy kiểm tra định dạng, nội dung hoặc mật khẩu bảo vệ.',
  tooLarge: 'Bảng tính này vượt quá giới hạn kích thước xem trước.', timeout: 'Mở bảng tính này quá thời gian. Hãy thử tệp nhỏ hơn.',
  encoding: 'Không thể đọc mã hóa văn bản này. Hãy lưu tệp dưới dạng UTF-8 hoặc UTF-16 có BOM rồi thử lại.',
  formulaWarning: 'Bảng tính này chứa công thức. Kết quả hiển thị có thể bị thiếu hoặc không chính xác.',
  unsupportedNotice: 'Bản xem trước này không hỗ trợ {features} trong bảng tính này. Hãy mở bằng ứng dụng hệ thống để có trải nghiệm đầy đủ.',
  charts: 'biểu đồ', images: 'hình ảnh', shapes: 'hình dạng', conditionalFormatting: 'định dạng có điều kiện', featureSeparator: ', ',
  retry: 'Thử lại',
} satisfies Record<keyof typeof en, string>
