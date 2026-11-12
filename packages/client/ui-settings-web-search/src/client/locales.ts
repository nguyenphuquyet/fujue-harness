/** Locale bundles for the web-search provider's settings page. */

import type { SettingsFormLabels } from '@deepseek-ai/dsh-client-ui-primitives'

/** Locale keys the page renders. */
export type WebSearchSettingsLocaleKey =
  | 'title' | 'description' | 'searchSection' | 'fetchSection'
  | 'providerDeepSeek' | 'providerLocal' | 'providerDeepSeekFetch' | 'providerMissing' | 'providerAuto'
  | 'providerLegacy' | 'legacyKeyHint' | 'maxUses' | 'maxUsesHint' | 'invalidMaxUses'
  | 'providersFailed' | 'retry'
  | 'pluginProviderHint' | 'searchGuide' | 'searchGuideUrl'
  | 'credential' | 'apiKeySet' | 'apiKeyUnsetApi'
  | 'baseUrl' | 'baseUrlHint'
  | 'count' | 'countHint'
  | 'overridden' | 'reset' | 'readOnly' | 'unavailable'
  | 'save' | 'saving' | 'saveFailed' | 'invalidNumber' | 'invalidCount'
  | 'billing' | 'billingAuto' | 'billingAutoHint' | 'billingAccount' | 'billingAccountHint' | 'billingApiKey' | 'billingApiKeyHint'
  | 'billingAdvancedOverride'

/** English copy. */
export const en: Record<WebSearchSettingsLocaleKey, string> = {
  title: 'Web search and fetch',
  description: 'Choose the providers web search and web fetch use.',
  searchSection: 'Web search provider',
  fetchSection: 'Web fetch provider',
  providerDeepSeek: 'DeepSeek Search API',
  providerLegacy: 'DeepSeek (legacy)',
  legacyKeyHint: 'Uses the signed-in account on account-model requests; otherwise uses this API key ({ref}), shared with Models by default.',
  maxUses: 'Maximum searches per request',
  maxUsesHint: 'Maximum server-side searches per Messages request: a positive integer, default 5.',
  invalidMaxUses: 'Enter a positive integer, or leave blank to use the default.',
  providerLocal: 'Direct fetch',
  providerDeepSeekFetch: 'DeepSeek Fetch API',
  providerMissing: '{id} (not loaded)',
  providerAuto: 'Automatic',
  providersFailed: "Couldn't load the provider list, so this menu may be incomplete.",
  retry: 'Retry',
  pluginProviderHint: 'Configure this provider in its own plugin settings.',
  credential: 'API key',
  baseUrl: 'Base URL',
  baseUrlHint: 'Include the API prefix. Leave blank to use the official address. The provider appends {path}.',
  apiKeyUnsetApi: 'No key is configured.',
  searchGuide: 'Search & Fetch guide',
  searchGuideUrl: 'https://api-docs.deepseek.com/guides/search',
  apiKeySet: 'A key is configured.',
  count: 'Results per search',
  countHint: 'Results returned per search: 1 to 50, default 10.',
  overridden: 'Overridden',
  reset: 'Reset to default',
  readOnly: 'This deployment stores settings read-only.',
  unavailable: 'This plugin is not loaded, so it cannot be configured right now.',
  save: 'Save',
  saving: 'Saving…',
  saveFailed: 'The deployment did not accept these values; they were left for you to correct.',
  invalidNumber: 'Enter a number, or leave blank to use the default.',
  invalidCount: 'Enter an integer from 1 to 50, or leave blank to use the default.',
  billing: 'Billing',
  billingAuto: 'Automatic',
  billingAutoHint: "Follows the conversation's DeepSeek account or API key; with other models, uses the API key first, then the signed-in account.",
  billingAccount: 'Signed-in DeepSeek account',
  billingAccountHint: 'Requires signing in to DeepSeek.',
  billingApiKey: 'DeepSeek API key',
  billingApiKeyHint: 'Uses the API key from the Models page; set one first.',
  billingAdvancedOverride: 'Overridden by {fields}',
}

/** Simplified Chinese copy. */
export const zh: Record<WebSearchSettingsLocaleKey, string> = {
  title: '网页搜索与获取',
  description: '选择网页搜索与网页获取使用的提供方。',
  searchSection: '网页搜索提供方',
  fetchSection: '网页获取提供方',
  providerDeepSeek: 'DeepSeek Search API',
  providerLegacy: 'DeepSeek（旧版）',
  legacyKeyHint: '账号模型发起的请求使用已登录账号；其他请求使用此 API Key（{ref}），默认与「模型」页共用',
  maxUses: '单次请求最多搜索次数',
  maxUsesHint: '每次 Messages 请求允许的服务端搜索次数上限，须为正整数，默认 5',
  invalidMaxUses: '请填正整数；留空表示使用默认值',
  providerLocal: '本机直接获取',
  providerDeepSeekFetch: 'DeepSeek Fetch API',
  providerMissing: '{id}（未加载）',
  providerAuto: '自动选择',
  providersFailed: '无法读取提供方列表，此菜单可能不完整',
  retry: '重试',
  pluginProviderHint: '请在该插件自己的设置中配置',
  credential: 'API Key',
  baseUrl: 'Base URL',
  baseUrlHint: '填写含 API 前缀的地址；留空时使用官方地址；程序追加 {path}',
  apiKeyUnsetApi: '未配置密钥。',
  searchGuide: '网页搜索与获取指南',
  searchGuideUrl: 'https://api-docs.deepseek.com/zh-cn/guides/search',
  apiKeySet: '已配置密钥。',
  count: '每次搜索结果数',
  countHint: '每次搜索返回的结果条数，1–50，默认 10。',
  overridden: '已覆盖',
  reset: '恢复默认',
  readOnly: '本部署的设置为只读。',
  unavailable: '该插件当前未加载，暂时无法配置。',
  save: '保存',
  saving: '保存中…',
  saveFailed: '本部署没有接受这些值，已保留供你修改。',
  invalidNumber: '请填数字；留空表示使用默认值。',
  invalidCount: '请填 1–50 的整数；留空表示使用默认值。',
  billing: '计费方式',
  billingAuto: '自动',
  billingAutoHint: '跟随当前会话的 DeepSeek 账号或 API Key；会话用其他模型时，优先用 API Key，没有则用已登录账号。',
  billingAccount: '已登录的 DeepSeek 账号',
  billingAccountHint: '需要先登录 DeepSeek 账号。',
  billingApiKey: 'DeepSeek API Key',
  billingApiKeyHint: '使用「模型」页配置的 API Key，需要先配置。',
  billingAdvancedOverride: '已被 {fields} 覆盖',
}

/**
 * The form frame's copy, read from this page's dictionary.
 * @param t - the page's locale reader.
 * @returns the labels the shared settings form renders.
 */
export function formLabels(t: (key: WebSearchSettingsLocaleKey) => string): SettingsFormLabels {
  return { unavailable: t('unavailable'), readOnly: t('readOnly'), saveFailed: t('saveFailed'), save: t('save'), saving: t('saving') }
}







/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  title: 'Tìm kiếm và tải web',
  description: 'Chọn nhà cung cấp cho tìm kiếm web và tải web.',
  searchSection: 'Nhà cung cấp tìm kiếm web',
  fetchSection: 'Nhà cung cấp tải web',
  providerDeepSeek: 'DeepSeek Search API',
  providerLegacy: 'DeepSeek (kế thừa)',
  legacyKeyHint: 'Các yêu cầu của mô hình tài khoản dùng tài khoản đã đăng nhập; các yêu cầu khác dùng khóa API này ({ref}), mặc định dùng chung với Mô hình.',
  maxUses: 'Số lần tìm kiếm tối đa mỗi yêu cầu',
  maxUsesHint: 'Số lần tìm kiếm phía máy chủ tối đa mỗi yêu cầu Messages: số nguyên dương, mặc định 5.',
  invalidMaxUses: 'Nhập số nguyên dương, hoặc để trống để dùng giá trị mặc định.',
  providerLocal: 'Tải trực tiếp',
  providerDeepSeekFetch: 'DeepSeek Fetch API',
  providerMissing: '{id} (chưa tải)',
  providerAuto: 'Tự động',
  providersFailed: 'Không thể tải danh sách nhà cung cấp, nên menu này có thể chưa đầy đủ.',
  retry: 'Thử lại',
  pluginProviderHint: 'Định cấu hình nhà cung cấp này trong cài đặt plugin riêng của nó.',
  credential: 'Khóa API',
  baseUrl: 'URL cơ sở',
  baseUrlHint: 'Bao gồm tiền tố API. Để trống để dùng địa chỉ chính thức. Nhà cung cấp sẽ nối thêm {path}.',
  apiKeyUnsetApi: 'Chưa có khóa nào được định cấu hình.',
  searchGuide: 'Hướng dẫn tìm kiếm và tải',
  searchGuideUrl: 'https://api-docs.deepseek.com/guides/search',
  apiKeySet: 'Đã định cấu hình một khóa.',
  count: 'Số kết quả mỗi lần tìm kiếm',
  countHint: 'Số kết quả trả về mỗi truy vấn: số nguyên từ 1 đến 50, mặc định 10. Giá trị này điều khiển số lượng kết quả, không phải số lần gọi tìm kiếm. Công cụ không giữ nhiều nguồn hơn giới hạn kết quả của chính nó.',
  overridden: 'Đã ghi đè',
  reset: 'Đặt lại về mặc định',
  readOnly: 'Bản triển khai này lưu cài đặt ở chế độ chỉ đọc.',
  unavailable: 'Plugin này chưa được tải, nên hiện không thể định cấu hình.',
  save: 'Lưu',
  saving: 'Đang lưu…',
  saveFailed: 'Bản triển khai không chấp nhận các giá trị này; chúng được giữ lại để bạn sửa.',
  invalidNumber: 'Nhập một số, hoặc để trống để dùng giá trị mặc định.',
  invalidCount: 'Nhập số nguyên từ 1 đến 50, hoặc để trống để dùng giá trị mặc định.',

    billing: 'Thanh toán',
    billingAuto: 'Tự động',
    billingAutoHint: 'Theo tài khoản DeepSeek hoặc API key của cuộc trò chuyện; với mô hình khác, dùng API key trước, sau đó đến tài khoản đã đăng nhập.',
    billingAccount: 'Tài khoản DeepSeek đã đăng nhập',
    billingAccountHint: 'Cần đăng nhập DeepSeek.',
    billingApiKey: 'API key DeepSeek',
    billingApiKeyHint: 'Dùng API key ở trang Mô hình; hãy thiết lập trước.',
    billingAdvancedOverride: 'Bị ghi đè bởi {fields}'
} satisfies Record<keyof typeof en, string>
