/**
 * `model` namespace dictionaries.
 *
 * `trigger.selectAria` intentionally matches `trigger.fallback` but remains a
 * separate key: the visible fallback label and the accessible name of
 * an unset trigger are free to diverge per locale, and folding it into
 * `trigger.aria` would announce the degenerate "Select model, current Select
 * model".
 */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'provider.account': 'DeepSeek 账号',
  'command.label': '模型',
  'command.description': '选择本会话使用的模型',
  'option.loadError': '目录加载失败：{message}',
  'trigger.fallback': '请选择模型',
  'trigger.loading': '正在加载模型…',
  'trigger.selectAria': '请选择模型',
  'trigger.aria': '选择模型，当前 {model}',
  'trigger.ariaEffort': '选择模型，当前 {model}，推理等级 {effort}',
  'menu.aria': '模型与推理等级',
  'menu.model': '模型',
  'menu.effort': '推理等级',
  'effort.providerDefault': 'Default',
  'status.loading': '正在刷新模型列表…',
  'error.action': '模型操作失败：{message}',
  'error.sessionInUse': '当前会话已被占用，可能是其他正在运行的 FuJue Harness 导致的（如其他 dsh web、桌面端），请退出其他正在运行的 FuJue Harness 后重试。',
  'action.reload': '重新加载',
  'warning.groupLoad': '{name} 加载失败：{message}',
  'search.placeholder': '搜索模型…',
  'search.clear': '清除搜索',
  'search.empty': '没有匹配的模型。',
  'empty.models': '暂无可用模型',
  'empty.efforts': '当前模型未提供推理等级。',
} satisfies Record<string, string>

/** The model namespace key union. */
export type ModelKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'provider.account': 'DeepSeek Account',
  'command.label': 'Model',
  'command.description': 'Select the model for this conversation',
  'option.loadError': 'Catalog failed to load: {message}',
  'trigger.fallback': 'Select model',
  'trigger.loading': 'Loading models…',
  'trigger.selectAria': 'Select model',
  'trigger.aria': 'Select model, current {model}',
  'trigger.ariaEffort': 'Select model, current {model}, reasoning effort {effort}',
  'menu.aria': 'Model and reasoning effort',
  'menu.model': 'Model',
  'menu.effort': 'Effort',
  'effort.providerDefault': 'Default',
  'status.loading': 'Refreshing model list…',
  'error.action': 'Model operation failed: {message}',
  'error.sessionInUse': 'This session is already in use, possibly by another running FuJue Harness instance (such as dsh web or the desktop app). Quit other running FuJue Harness instances and try again.',
  'action.reload': 'Reload',
  'warning.groupLoad': '{name} failed to load: {message}',
  'search.placeholder': 'Search models…',
  'search.clear': 'Clear search',
  'search.empty': 'No matching models.',
  'empty.models': 'No models available.',
  'empty.efforts': 'This model provides no reasoning effort levels.',
} satisfies Record<ModelKey, string>







/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  'provider.account': 'Tài khoản DeepSeek',
  'command.label': 'Mô hình',
  'command.description': 'Chọn mô hình cho cuộc hội thoại này',
  'option.loadError': 'Không tải được danh mục: {message}',
  'trigger.fallback': 'Chọn mô hình',
  'trigger.loading': 'Đang tải mô hình…',
  'trigger.selectAria': 'Chọn mô hình',
  'trigger.aria': 'Chọn mô hình, hiện tại {model}',
  'trigger.ariaEffort': 'Chọn mô hình, hiện tại {model}, mức suy luận {effort}',
  'menu.aria': 'Mô hình và mức suy luận',
  'menu.model': 'Mô hình',
  'menu.effort': 'Mức',
  'effort.providerDefault': 'Mặc định',
  'status.loading': 'Đang làm mới danh sách mô hình…',
  'error.action': 'Thao tác mô hình thất bại: {message}',
  'error.sessionInUse': 'Phiên này đang được sử dụng, có thể bởi một phiên bản FuJue Harness khác đang chạy (như dsh web hoặc ứng dụng desktop). Hãy thoát các phiên bản FuJue Harness khác đang chạy rồi thử lại.',
  'action.reload': 'Tải lại',
  'warning.groupLoad': 'Không tải được {name}: {message}',
  'search.placeholder': 'Tìm kiếm mô hình…',
  'search.clear': 'Xóa tìm kiếm',
  'search.empty': 'Không có mô hình phù hợp.',
  'empty.models': 'Không có mô hình khả dụng.',
  'empty.efforts': 'Mô hình này không cung cấp mức suy luận nào.',
} satisfies Record<keyof typeof en, string>
