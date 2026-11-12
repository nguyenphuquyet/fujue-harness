/** Agent teamwork Web dictionaries. */

/** Locale namespace owned by the Agent teamwork Web UI. */
export const NS = 'agent-team'

/** Simplified Chinese dictionary and key source. */
export const zh = {
  'progress.completed': '{count} 已完成',
  'progress.active': '{count} 进行中',
  'progress.pending': '{count} 待处理',
  'command.title': '智能体团队协作',
  'command.running': '执行中',
  'command.done': '已完成',
  'command.failed': '执行失败',
  'command.failedReason': '执行失败：{reason}',
  trigger: '任务板',
  'mode.label': '启用智能体团队协作',
  'mode.infoLabel': '关于智能体团队协作',
  'mode.description': '通过共享任务板协调多个智能体的分工与进度，复杂任务表现更佳，token 开销也相应更高。',
  'mode.failed': '无法确认智能体团队协作设置已保存，请重试：{message}',
  'disable.title': '确认停用智能体团队协作？',
  'disable.description': '对话过程中停用智能体团队协作，将停止共享任务工具和团队协调指令。',
  'disable.warning': '停用后可能影响缓存复用、增加后续 token 用量与开销，并影响当前任务的协作效果。',
  'disable.cancel': '取消',
  'disable.confirm': '确认停用',
  'disable.close': '关闭',
  loading: '正在加载任务板…',
  unavailable: '任务板暂不可用',
  failure: '任务记录无效：{message}',
  empty: '暂无共享任务，可以通过对话创建',
  tasks: '共享任务',
  owner: '负责人',
  unowned: '未分配',
  blocked: '被依赖阻塞',
  'status.pending': '待处理',
  'status.in_progress': '进行中',
  'status.completed': '已完成',
} satisfies Record<string, string>

/** Agent teamwork locale key union. */
export type TeamKey = keyof typeof zh

/** English dictionary checked against the Chinese key set. */
export const en = {
  'progress.completed': '{count} completed',
  'progress.active': '{count} in progress',
  'progress.pending': '{count} pending',
  'command.title': 'Agent teamwork',
  'command.running': 'Running',
  'command.done': 'Completed',
  'command.failed': 'Failed',
  'command.failedReason': 'Failed: {reason}',
  trigger: 'Task board',
  'mode.label': 'Enable agent teamwork',
  'mode.infoLabel': 'About agent teamwork',
  'mode.description': 'Coordinate work and progress across agents with a shared task board for better results on complex tasks, with correspondingly higher token costs.',
  'mode.failed': 'Could not confirm the agent teamwork setting was saved. Try again: {message}',
  'disable.title': 'Disable agent teamwork?',
  'disable.description': 'Disabling agent teamwork during a conversation stops the use of shared task tools and team coordination instructions.',
  'disable.warning': 'Disabling it may affect cache reuse, increase subsequent token usage and costs, and affect collaboration on the current task.',
  'disable.cancel': 'Cancel',
  'disable.confirm': 'Disable',
  'disable.close': 'Close',
  loading: 'Loading task board…',
  unavailable: 'Task board is unavailable',
  failure: 'Invalid persisted task record: {message}',
  empty: 'No shared tasks yet. Create them through the conversation.',
  tasks: 'Shared tasks',
  owner: 'Owner',
  unowned: 'Unowned',
  blocked: 'Blocked by dependencies',
  'status.pending': 'Pending',
  'status.in_progress': 'In progress',
  'status.completed': 'Completed',
} satisfies Record<TeamKey, string>







/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  'progress.completed': '{count} đã hoàn thành',
  'progress.active': '{count} đang thực hiện',
  'progress.pending': '{count} đang chờ',
  'command.title': 'Cộng tác nhóm agent',
  'command.running': 'Đang chạy',
  'command.done': 'Đã hoàn thành',
  'command.failed': 'Thất bại',
  'command.failedReason': 'Thất bại: {reason}',
  trigger: 'Bảng công việc',
  'mode.label': 'Bật cộng tác nhóm agent',
  'mode.infoLabel': 'Giới thiệu về cộng tác nhóm agent',
  'mode.description': 'Phối hợp phân công và tiến độ giữa nhiều agent bằng bảng công việc chung, cho kết quả tốt hơn với các tác vụ phức tạp, đồng thời chi phí token cũng cao hơn tương ứng.',
  'mode.failed': 'Không thể xác nhận cài đặt cộng tác nhóm agent đã được lưu. Hãy thử lại: {message}',
  'disable.title': 'Tắt cộng tác nhóm agent?',
  'disable.description': 'Tắt cộng tác nhóm agent trong cuộc trò chuyện sẽ dừng việc sử dụng các công cụ công việc chung và hướng dẫn phối hợp nhóm.',
  'disable.warning': 'Việc tắt có thể ảnh hưởng đến tái sử dụng bộ nhớ đệm, làm tăng mức sử dụng token và chi phí sau đó, đồng thời ảnh hưởng đến cộng tác trong tác vụ hiện tại.',
  'disable.cancel': 'Hủy',
  'disable.confirm': 'Xác nhận tắt',
  'disable.close': 'Đóng',
  loading: 'Đang tải bảng công việc…',
  unavailable: 'Bảng công việc không khả dụng',
  failure: 'Bản ghi công việc đã lưu không hợp lệ: {message}',
  empty: 'Chưa có công việc chung. Hãy tạo qua cuộc trò chuyện.',
  tasks: 'Công việc chung',
  owner: 'Người phụ trách',
  unowned: 'Chưa phân công',
  blocked: 'Bị chặn bởi phụ thuộc',
  'status.pending': 'Đang chờ',
  'status.in_progress': 'Đang thực hiện',
  'status.completed': 'Đã hoàn thành',
} satisfies Record<keyof typeof en, string>
