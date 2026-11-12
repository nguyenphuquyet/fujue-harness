/** Locale bundles for the Subagent settings page. */

import type { SettingsFormLabels } from '@deepseek-ai/dsh-client-ui-primitives'

/** Locale keys the page renders. */
export type SubagentSettingsLocaleKey =
  | 'overridden' | 'reset' | 'readOnly' | 'unavailable'
  | 'save' | 'saving' | 'saveFailed'
  | 'subagentTitle' | 'subagentDescription' | 'subagentLimitsTitle'
  | 'subagentMaxDepth'
  | 'subagentDepthHelpLabel' | 'subagentDepthHelp'
  | 'subagentDepthZero' | 'subagentDepthOne' | 'subagentDepthOverride'
  | 'subagentMaxActive'
  | 'subagentCapacityHelpLabel' | 'subagentCapacityHelp'
  | 'subagentDepthInvalid'
  | 'subagentCapacityInvalid'
  | 'subagentModelSelectionTitle'
  | 'subagentModelSelectionToggle' | 'subagentModelSelectionChoose' | 'subagentModelSelectionAllowed'
  | 'subagentModelSelectionLoading' | 'subagentModelSelectionLoadFailed' | 'subagentModelSelectionRetry'
  | 'subagentModelSelectionPartial' | 'subagentModelSelectionUnavailable'
  | 'subagentModelSelectionUnavailableGroup' | 'subagentModelSelectionEmpty'
  | 'subagentModelSelectionRequired' | 'subagentModelSelectionConflict' | 'subagentModelSelectionOff'

/** English copy. */
export const en: Record<SubagentSettingsLocaleKey, string> = {
  overridden: 'Overridden',
  reset: 'Reset to default',
  readOnly: 'This deployment stores settings read-only.',
  unavailable: 'This plugin is not loaded, so it cannot be configured right now.',
  save: 'Save',
  saving: 'Saving…',
  saveFailed: 'The deployment did not accept these values; they were left for you to correct.',
  subagentTitle: 'Subagent',
  subagentDescription: 'Set Subagent recursion depth, count, and models.',
  subagentLimitsTitle: 'Limits',
  subagentMaxDepth: 'Maximum recursion depth',
  subagentDepthHelpLabel: 'About maximum recursion depth',
  subagentDepthHelp: 'Limits how many levels of Subagents an Agent can create.',
  subagentDepthZero: 'Disable Subagents',
  subagentDepthOne: 'Only the main Agent can create Subagents',
  subagentDepthOverride: 'If a tool defines its own maximum recursion depth, that setting takes precedence.',
  subagentMaxActive: 'Subagent parallelism limit',
  subagentCapacityHelpLabel: 'About the Subagent parallelism limit',
  subagentCapacityHelp: 'Total live Subagents under the same main Agent, across all recursion levels. The main Agent is excluded. New start requests are rejected when the limit is reached.',
  subagentDepthInvalid: 'Enter a whole number of 0 or more.',
  subagentCapacityInvalid: 'Enter a whole number of 1 or more.',
  subagentModelSelectionTitle: 'Model selection',
  subagentModelSelectionToggle: 'Allow agents to choose models for Subagents',
  subagentModelSelectionChoose: 'When enabled, agents can choose a provider, model, and reasoning effort for each Subagent from the authorized models below. Applies only to new sessions.',
  subagentModelSelectionAllowed: 'Models agents may choose',
  subagentModelSelectionLoading: 'Loading models…',
  subagentModelSelectionLoadFailed: 'Models could not be loaded.',
  subagentModelSelectionRetry: 'Retry',
  subagentModelSelectionPartial: 'Some model providers could not be loaded; saved choices remain removable.',
  subagentModelSelectionUnavailable: 'Currently unavailable',
  subagentModelSelectionUnavailableGroup: 'Saved but currently unavailable',
  subagentModelSelectionEmpty: 'No model provider currently advertises a model.',
  subagentModelSelectionRequired: 'Select at least one model before saving.',
  subagentModelSelectionConflict: 'Settings changed elsewhere. Discard your draft and try again.',
  subagentModelSelectionOff: 'Subagents use configured defaults or inherit the parent agent\'s model. Saved model choices are retained.',
}

/** Simplified Chinese copy. */
export const zh: Record<SubagentSettingsLocaleKey, string> = {
  overridden: '已覆盖',
  reset: '恢复默认',
  readOnly: '本部署的设置为只读。',
  unavailable: '该插件当前未加载，暂时无法配置。',
  save: '保存',
  saving: '保存中…',
  saveFailed: '本部署没有接受这些值，已保留供你修改。',
  subagentTitle: '子智能体',
  subagentDescription: '设置子智能体的递归层级、数量和模型。',
  subagentLimitsTitle: '运行限制',
  subagentMaxDepth: '最大递归深度',
  subagentDepthHelpLabel: '最大递归深度说明',
  subagentDepthHelp: '限制 Agent 创建子智能体的递归层级。',
  subagentDepthZero: '禁用子智能体',
  subagentDepthOne: '仅允许主 Agent 创建子智能体',
  subagentDepthOverride: '如果某个工具单独设置了最大递归深度，以该工具的设置为准。',
  subagentMaxActive: '子智能体并行数量上限',
  subagentCapacityHelpLabel: '子智能体并行数量上限说明',
  subagentCapacityHelp: '同一主 Agent 下，所有递归层级同时存活的子智能体总数，主 Agent 不计入。达到上限时，新的启动请求会被拒绝。',
  subagentDepthInvalid: '请输入不小于 0 的整数。',
  subagentCapacityInvalid: '请输入不小于 1 的整数。',
  subagentModelSelectionTitle: '模型选择',
  subagentModelSelectionToggle: '允许 Agent 为子智能体选择模型',
  subagentModelSelectionChoose: '开启后，Agent 可以从下方授权模型中，为每个子智能体选择提供方、模型和推理强度。仅影响新会话。',
  subagentModelSelectionAllowed: 'Agent 可选择的模型',
  subagentModelSelectionLoading: '正在加载模型…',
  subagentModelSelectionLoadFailed: '无法加载模型。',
  subagentModelSelectionRetry: '重试',
  subagentModelSelectionPartial: '部分模型提供方暂时无法加载；已保存的选择仍可移除。',
  subagentModelSelectionUnavailable: '当前不可用',
  subagentModelSelectionUnavailableGroup: '已保存但当前不可用',
  subagentModelSelectionEmpty: '当前没有模型提供方公布模型。',
  subagentModelSelectionRequired: '保存前请至少选择一个模型。',
  subagentModelSelectionConflict: '设置已在其他位置更新。请放弃修改后重试。',
  subagentModelSelectionOff: '关闭后，子智能体使用配置的默认模型或继承父 Agent 的模型；已选模型会保留。',
}

/**
 * The form frame's copy, read from this page's dictionary.
 * @param t - the page's locale reader.
 * @returns the labels the shared settings form renders.
 */
export function formLabels(t: (key: SubagentSettingsLocaleKey) => string): SettingsFormLabels {
  return { unavailable: t('unavailable'), readOnly: t('readOnly'), saveFailed: t('saveFailed'), save: t('save'), saving: t('saving') }
}







/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  overridden: 'Đã ghi đè',
  reset: 'Đặt lại về mặc định',
  readOnly: 'Triển khai này lưu cài đặt ở chế độ chỉ đọc.',
  unavailable: 'Plugin này chưa được tải nên hiện không thể cấu hình.',
  save: 'Lưu',
  saving: 'Đang lưu…',
  saveFailed: 'Triển khai không chấp nhận các giá trị này; chúng được giữ lại để bạn sửa.',
  subagentTitle: 'Agent con',
  subagentDescription: 'Đặt độ sâu đệ quy, số lượng và mô hình cho Agent con.',
  subagentLimitsTitle: 'Giới hạn',
  subagentMaxDepth: 'Độ sâu đệ quy tối đa',
  subagentDepthHelpLabel: 'Giới thiệu về độ sâu đệ quy tối đa',
  subagentDepthHelp: 'Giới hạn số cấp Agent con mà một Agent có thể tạo.',
  subagentDepthZero: 'Tắt Agent con',
  subagentDepthOne: 'Chỉ Agent chính mới có thể tạo Agent con',
  subagentDepthOverride: 'Nếu một công cụ tự định nghĩa độ sâu đệ quy tối đa, cài đặt đó sẽ được ưu tiên.',
  subagentMaxActive: 'Giới hạn song song của Agent con',
  subagentCapacityHelpLabel: 'Giới thiệu về giới hạn song song của Agent con',
  subagentCapacityHelp: 'Tổng số Agent con đang hoạt động dưới cùng một Agent chính, trên mọi cấp đệ quy. Agent chính không được tính. Yêu cầu khởi chạy mới sẽ bị từ chối khi đạt giới hạn.',
  subagentDepthInvalid: 'Nhập một số nguyên từ 0 trở lên.',
  subagentCapacityInvalid: 'Nhập một số nguyên từ 1 trở lên.',
  subagentModelSelectionTitle: 'Chọn mô hình',
  subagentModelSelectionToggle: 'Cho phép agent chọn mô hình cho Agent con',
  subagentModelSelectionChoose: 'Khi bật, agent có thể chọn nhà cung cấp, mô hình và mức suy luận cho từng Agent con từ các mô hình được ủy quyền bên dưới. Chỉ áp dụng cho phiên mới.',
  subagentModelSelectionAllowed: 'Mô hình agent có thể chọn',
  subagentModelSelectionLoading: 'Đang tải mô hình…',
  subagentModelSelectionLoadFailed: 'Không thể tải mô hình.',
  subagentModelSelectionRetry: 'Thử lại',
  subagentModelSelectionPartial: 'Một số nhà cung cấp mô hình không thể tải; các lựa chọn đã lưu vẫn có thể xóa.',
  subagentModelSelectionUnavailable: 'Hiện không khả dụng',
  subagentModelSelectionUnavailableGroup: 'Đã lưu nhưng hiện không khả dụng',
  subagentModelSelectionEmpty: 'Hiện không có nhà cung cấp mô hình nào công bố mô hình.',
  subagentModelSelectionRequired: 'Chọn ít nhất một mô hình trước khi lưu.',
  subagentModelSelectionConflict: 'Cài đặt đã thay đổi ở nơi khác. Hãy bỏ bản nháp và thử lại.',
  subagentModelSelectionOff: 'Agent con dùng mặc định đã cấu hình hoặc kế thừa mô hình của agent cha. Các lựa chọn mô hình đã lưu được giữ lại.',
} satisfies Record<keyof typeof en, string>
