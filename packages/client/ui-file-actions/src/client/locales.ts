/** Original-file actions and completion feedback. */

/** zh file-action labels. */
export const zh = {
  'menu.finder': '在 Finder 显示',
  'menu.reveal': '在文件夹显示',
  'menu.saveAs': '另存为…',
  'menu.copied': '已复制',
  'menu.copyImage': '复制图片',
  'menu.download': '下载',
  'menu.saveFailed': '无法保存文件，请检查源文件和目标位置后重试',
  'menu.copyFailed': '无法复制，请检查内容是否可用后重试',
  'menu.saved': '已保存',
  'menu.downloadStarted': '已开始下载',
  'menu.downloaded': '下载完成',
  'path.revealError': '无法显示文件位置，请重试',
} satisfies Record<string, string>

/** File-action dictionary keys. */
export type FileActionKey = keyof typeof zh

/** en file-action labels. */
export const en = {
  'menu.finder': 'Show in Finder',
  'menu.reveal': 'Show in folder',
  'menu.saveAs': 'Save as…',
  'menu.copied': 'Copied',
  'menu.copyImage': 'Copy image',
  'menu.download': 'Download',
  'menu.saveFailed': 'Could not save. Check the source and destination, then retry.',
  'menu.copyFailed': 'Could not copy. Check that the content is available, then retry.',
  'menu.saved': 'Saved',
  'menu.downloadStarted': 'Download started',
  'menu.downloaded': 'Download complete',
  'path.revealError': 'Could not show the file location. Try again.',
} satisfies Record<FileActionKey, string>







/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  'menu.finder': 'Hiện trong Finder',
  'menu.reveal': 'Hiện trong thư mục',
  'menu.saveAs': 'Lưu thành…',
  'menu.copied': 'Đã sao chép',
  'menu.copyImage': 'Sao chép hình ảnh',
  'menu.download': 'Tải xuống',
  'menu.saveFailed': 'Không thể lưu. Hãy kiểm tra tệp nguồn và vị trí đích, rồi thử lại.',
  'menu.copyFailed': 'Không thể sao chép. Hãy kiểm tra nội dung có sẵn, rồi thử lại.',
  'menu.saved': 'Đã lưu',
  'menu.downloadStarted': 'Đã bắt đầu tải xuống',
  'menu.downloaded': 'Tải xuống hoàn tất',
  'path.revealError': 'Không thể hiện vị trí tệp. Hãy thử lại.',
} satisfies Record<FileActionKey, string>
