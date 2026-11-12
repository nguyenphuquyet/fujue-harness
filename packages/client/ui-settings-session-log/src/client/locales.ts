/** Copy for the API Session-log upload preference. */
export const en = {
  title: 'Upload Session Log when using the official model API',
  description: 'Help improve DeepSeek models and products.',
  saved: 'Preference saved',
  failed: 'Could not save preference',
}

/** Chinese preference copy. */
export const zh: Record<keyof typeof en, string> = {
  title: '在使用官方模型 API 时上传 Session Log',
  description: '帮助改进 DeepSeek 模型与产品',
  saved: '设置已保存',
  failed: '无法保存设置',
}







/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  title: 'Tải nhật ký phiên lên khi dùng API mô hình chính thức',
  description: 'Giúp cải thiện các mô hình và sản phẩm DeepSeek.',
  saved: 'Đã lưu tùy chọn',
  failed: 'Không thể lưu tùy chọn',
} satisfies Record<keyof typeof en, string>
