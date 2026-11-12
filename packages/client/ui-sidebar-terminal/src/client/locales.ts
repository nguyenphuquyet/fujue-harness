/** Copy owned by the sidebar terminal feature. */
import type {} from '@deepseek-ai/dsh-client-ui-slots'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    sidebarTerminal: keyof typeof zh
  }
}

/** Simplified Chinese terminal copy. */
export const zh = {
  'shortcut.noSession': '请先选择会话',
  recoveryFailed: '恢复终端失败：{message}', retryRecovery: '重试恢复终端',
  shell: '选择 Shell', shellLoading: '正在读取 Shell…', shellEmpty: '没有可用的 Shell', description: '在会话工作区运行命令',
  title: '终端', new: '新建终端', loading: '正在读取终端环境…', creating: '正在启动…',
  connecting: '正在连接…', disconnected: '连接已断开。', reconnect: '重新连接',
  readonly: '此页面当前只读。', control: '接管输入',
  closed: '终端已关闭。', exited: '进程已退出（{code}）', failed: '终端错误：{message}',
  rename: '终端名称', unavailable: '不可用', retry: '重试',
  cleanupFailed: '终端「{title}」未能结束：{message}',
  missingTerminal: '此终端已不存在，请新建终端。',
  inputFull: '输入缓冲区已满，请重新连接后重试。',
  attachmentEnded: '终端连接已结束，请重新连接。',
  invalidOutput: '终端画面传输异常，请重新连接。',
  terminalLimit: '终端数量已达上限，请关闭不用的终端后重试。已退出的终端也计入数量。',
  'badge.agent': 'Agent', 'badge.agentHint': '由 Agent 打开。你一输入就由你接管，Agent 之后只能读取。',
  'badge.sandbox': '沙箱',
  'badge.readOnlyHint': '命令在 Agent 的只读沙箱里运行，包括你在这里输入的命令。',
  'badge.workspaceWriteHint': '命令在 Agent 的工作区沙箱里运行，包括你在这里输入的命令。',
} satisfies Record<string, string>

/** English terminal copy. */
export const en = {
  'shortcut.noSession': 'Select a session first',
  recoveryFailed: 'Terminal recovery failed: {message}', retryRecovery: 'Retry terminal recovery',
  shell: 'Choose shell', shellLoading: 'Loading shells…', shellEmpty: 'No shells available', description: 'Run commands in the Session workspace',
  title: 'Terminal', new: 'New terminal', loading: 'Reading terminal environment…', creating: 'Starting…',
  connecting: 'Connecting…', disconnected: 'Disconnected.', reconnect: 'Reconnect',
  readonly: 'This view is read-only.', control: 'Take control',
  closed: 'Terminal closed.', exited: 'Process exited ({code})', failed: 'Terminal error: {message}',
  rename: 'Terminal name', unavailable: 'Unavailable', retry: 'Retry',
  cleanupFailed: 'Terminal “{title}” could not be ended: {message}',
  missingTerminal: 'This terminal no longer exists. Open a new terminal.',
  inputFull: 'The input buffer is full. Reconnect and try again.',
  attachmentEnded: 'The terminal connection ended. Reconnect to continue.',
  invalidOutput: 'The terminal screen could not be received. Reconnect to recover it.',
  terminalLimit: 'The terminal limit has been reached. Close unused terminals and try again. Exited terminals also count toward the limit.',
  'badge.agent': 'Agent', 'badge.agentHint': 'Opened by the agent. Typing here takes over; the agent can then only read it.',
  'badge.sandbox': 'Sandbox',
  'badge.readOnlyHint': "Commands run in the agent's read-only sandbox, including commands you type here.",
  'badge.workspaceWriteHint': "Commands run in the agent's workspace sandbox, including commands you type here.",
} satisfies Record<keyof typeof zh, string>

/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  'shortcut.noSession': 'Chọn một phiên trước',
  recoveryFailed: 'Khôi phục terminal thất bại: {message}', retryRecovery: 'Thử lại khôi phục terminal',
  shell: 'Chọn shell', shellLoading: 'Đang tải shell…', shellEmpty: 'Không có shell nào khả dụng', description: 'Chạy lệnh trong không gian làm việc của phiên',
  title: 'Terminal', new: 'Terminal mới', loading: 'Đang đọc môi trường terminal…', creating: 'Đang khởi động…',
  connecting: 'Đang kết nối…', disconnected: 'Đã ngắt kết nối.', reconnect: 'Kết nối lại',
  readonly: 'Chế độ xem này chỉ đọc.', control: 'Tiếp nhận điều khiển',
  closed: 'Terminal đã đóng.', exited: 'Tiến trình đã thoát ({code})', failed: 'Lỗi terminal: {message}',
  rename: 'Tên terminal', unavailable: 'Không khả dụng', retry: 'Thử lại',
  cleanupFailed: 'Không thể kết thúc terminal “{title}”: {message}',
  missingTerminal: 'Terminal này không còn tồn tại. Hãy mở một terminal mới.',
  inputFull: 'Bộ đệm đầu vào đã đầy. Hãy kết nối lại và thử lại.',
  attachmentEnded: 'Kết nối terminal đã kết thúc. Hãy kết nối lại để tiếp tục.',
  invalidOutput: 'Không thể nhận màn hình terminal. Hãy kết nối lại để khôi phục.',
  terminalLimit: 'Đã đạt giới hạn terminal. Hãy đóng các terminal không dùng và thử lại. Các terminal đã thoát cũng được tính vào giới hạn.',

    'badge.agent': 'Agent', 'badge.agentHint': 'Do agent mở. Gõ tại đây sẽ tiếp quản; sau đó agent chỉ có thể đọc.',
    'badge.sandbox': 'Sandbox',
    'badge.readOnlyHint': 'Lệnh chạy trong sandbox chỉ đọc của agent, kể cả lệnh bạn gõ tại đây.',
    'badge.workspaceWriteHint': 'Lệnh chạy trong sandbox không gian làm việc của agent, kể cả lệnh bạn gõ tại đây.'
} satisfies Record<keyof typeof en, string>
