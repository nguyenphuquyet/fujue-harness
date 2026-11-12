/** English card frame, fallback and tool-row copy. */
export const en = {
  expandBrief: 'Show more', collapseBrief: 'Show less',
  dismiss: 'Not now', dismissed: 'Dismissed', replaced: 'Replaced',
  unavailable: 'This action is unavailable. Check the plugin in Plugins.',
  transport: 'Could not confirm the result. Reconnect and check the card before retrying.',
  'row.title': 'Action card', 'row.preparing': 'Preparing a card', 'row.running': 'Proposing',
  'row.ok': 'Proposed', 'row.error': 'Not shown', 'row.stopped': 'Interrupted', 'row.inspect': 'Inspect call',
}

/** Keys shared by every dictionary. */
export type ActionCardKey = keyof typeof en

/** Chinese card frame, fallback and tool-row copy. */
export const zh: Record<ActionCardKey, string> = {
  expandBrief: '展开', collapseBrief: '收起',
  dismiss: '暂不需要', dismissed: '已忽略', replaced: '已替换',
  unavailable: '暂时无法执行，请到插件页面查看',
  transport: '暂时无法确认结果，请重新连接并查看卡片状态后再重试',
  'row.title': '操作卡片', 'row.preparing': '正在准备卡片', 'row.running': '正在提议',
  'row.ok': '已提议', 'row.error': '未显示', 'row.stopped': '已中断', 'row.inspect': '查看调用',
}

/** Vietnamese dictionary, checked against the English keys. */
export const vi: Record<ActionCardKey, string> = {
  expandBrief: 'Xem thêm', collapseBrief: 'Thu gọn',
  dismiss: 'Không phải bây giờ', dismissed: 'Đã bỏ qua', replaced: 'Đã thay thế',
  unavailable: 'Hành động này không khả dụng. Kiểm tra plugin trong mục Plugins.',
  transport: 'Không thể xác nhận kết quả. Hãy kết nối lại và kiểm tra thẻ trước khi thử lại.',
  'row.title': 'Thẻ hành động', 'row.preparing': 'Đang chuẩn bị thẻ', 'row.running': 'Đang đề xuất',
  'row.ok': 'Đã đề xuất', 'row.error': 'Không hiển thị', 'row.stopped': 'Đã ngắt', 'row.inspect': 'Kiểm tra lệnh gọi',
}
