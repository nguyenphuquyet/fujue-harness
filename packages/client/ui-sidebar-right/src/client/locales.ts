/**
 * `sidebarRight` namespace dictionaries.
 *
 * Everything a user reads in this column is here, including the strings handed
 * to the docking kit — the kit renders no copy of its own, so its whole
 * vocabulary is this package's to own and translate.
 */

/** Simplified Chinese dictionary and key-set source of truth. */
export const zh = {
  'menu.close': '关闭',
  'menu.closeOthers': '关闭其他标签页',
  'menu.closeRight': '关闭右侧标签页',
  'command.close': '关闭当前页面／窗口',
  'command.refresh': '刷新当前页面',
  'command.noRefresh': '当前页面不支持刷新',
  'command.toggle': '展开／收起右侧栏',
  'command.fullscreen': '面板全屏／退出全屏',
  'command.noSession': '请先选择会话',
  'command.noFocus': '请先聚焦右侧面板',
  'command.stale': '页面已切换，请重新聚焦',
  'command.collapsed': '请先展开右侧栏',
  'command.float': '浮动面板不支持此操作',
  'command.empty': '请先打开页面',
  'command.budget': '已达两格上限',
  'command.width': '栏宽不足，拖宽侧边栏后再分栏',
  'chrome.expand': '打开侧边栏',
  'chrome.expandAria': '打开右侧边栏',
  'chrome.collapse': '收起侧边栏',
  'chrome.collapseAria': '收起右侧边栏',
  'chrome.toFullscreen': '全屏',
  'chrome.exitFullscreen': '退出全屏',
  'dock.emptyPane': '空面板',
  'dock.splitPane': '分栏',
  'dock.splitPaneDisabled': '已达两格上限',
  'dock.splitPaneNarrow': '栏宽不足，拖宽侧边栏后再分栏',
  'dock.closeTab': '关闭',
  'dock.addTab': '新标签页',
  'dock.dockFloat': '收回到侧边栏',
  'dock.closeFloat': '关闭',
  'dock.drop.center': '移到这里',
  'dock.drop.left': '左分栏',
  'dock.drop.right': '右分栏',
  'dock.drop.top': '上分栏',
  'dock.drop.bottom': '下分栏',
  'tab.guide.title': '开始',
  'tab.guide.more': '更多工具',
  'tab.unavailable': '这类内容还没有可用的查看方式。',
} satisfies Record<string, string>

/** Right-Sidebar dictionary key union. */
export type SidebarRightKey = keyof typeof zh

/** English dictionary, checked against the Chinese key set. */
export const en = {
  'menu.close': 'Close',
  'menu.closeOthers': 'Close Other Tabs',
  'menu.closeRight': 'Close Tabs to the Right',
  'command.close': 'Close current page or window',
  'command.refresh': 'Refresh current page',
  'command.noRefresh': 'This page cannot be refreshed',
  'command.toggle': 'Toggle right sidebar',
  'command.fullscreen': 'Toggle panel fullscreen',
  'command.noSession': 'Select a session first',
  'command.noFocus': 'Focus a right sidebar pane first',
  'command.stale': 'The page changed; focus it again',
  'command.collapsed': 'Expand the right sidebar first',
  'command.float': 'This action is unavailable in a floating panel',
  'command.empty': 'Open a page first',
  'command.budget': 'Two panes is the limit',
  'command.width': 'Not enough width to split, widen the sidebar',
  'chrome.expand': 'Open sidebar',
  'chrome.expandAria': 'Open right sidebar',
  'chrome.collapse': 'Collapse sidebar',
  'chrome.collapseAria': 'Collapse right sidebar',
  'chrome.toFullscreen': 'Fullscreen',
  'chrome.exitFullscreen': 'Exit fullscreen',
  'dock.emptyPane': 'Empty pane',
  'dock.splitPane': 'Split',
  'dock.splitPaneDisabled': 'Two panes is the limit',
  'dock.splitPaneNarrow': 'Not enough width to split, widen the sidebar',
  'dock.closeTab': 'Close',
  'dock.addTab': 'New tab',
  'dock.dockFloat': 'Send back to the sidebar',
  'dock.closeFloat': 'Close',
  'dock.drop.center': 'Move here',
  'dock.drop.left': 'Add left split',
  'dock.drop.right': 'Add right split',
  'dock.drop.top': 'Add top split',
  'dock.drop.bottom': 'Add bottom split',
  'tab.guide.title': 'Start',
  'tab.guide.more': 'More tools',
  'tab.unavailable': 'Nothing here can view this kind of content yet.',
} satisfies Record<SidebarRightKey, string>







/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  'menu.close': 'Đóng',
  'menu.closeOthers': 'Đóng các tab khác',
  'menu.closeRight': 'Đóng tab bên phải',
  'command.close': 'Đóng trang hoặc cửa sổ hiện tại',
  'command.refresh': 'Làm mới trang hiện tại',
  'command.noRefresh': 'Trang này không thể làm mới',
  'command.toggle': 'Bật/tắt thanh bên phải',
  'command.fullscreen': 'Bật/tắt toàn màn hình bảng',
  'command.noSession': 'Chọn một phiên trước',
  'command.noFocus': 'Tập trung vào một khung thanh bên phải trước',
  'command.stale': 'Trang đã thay đổi; hãy tập trung lại',
  'command.collapsed': 'Mở rộng thanh bên phải trước',
  'command.float': 'Hành động này không khả dụng trong bảng nổi',
  'command.empty': 'Mở một trang trước',
  'command.budget': 'Giới hạn là hai khung',
  'command.width': 'Không đủ chiều rộng để chia, hãy mở rộng thanh bên',
  'chrome.expand': 'Mở thanh bên',
  'chrome.expandAria': 'Mở thanh bên phải',
  'chrome.collapse': 'Thu gọn thanh bên',
  'chrome.collapseAria': 'Thu gọn thanh bên phải',
  'chrome.toFullscreen': 'Toàn màn hình',
  'chrome.exitFullscreen': 'Thoát toàn màn hình',
  'dock.emptyPane': 'Khung trống',
  'dock.splitPane': 'Chia',
  'dock.splitPaneDisabled': 'Giới hạn là hai khung',
  'dock.splitPaneNarrow': 'Không đủ chiều rộng để chia, hãy mở rộng thanh bên',
  'dock.closeTab': 'Đóng',
  'dock.addTab': 'Tab mới',
  'dock.dockFloat': 'Gửi lại về thanh bên',
  'dock.closeFloat': 'Đóng',
  'dock.drop.center': 'Di chuyển đến đây',
  'dock.drop.left': 'Thêm chia trái',
  'dock.drop.right': 'Thêm chia phải',
  'dock.drop.top': 'Thêm chia trên',
  'dock.drop.bottom': 'Thêm chia dưới',
  'tab.guide.title': 'Bắt đầu',
  'tab.guide.more': 'Thêm công cụ',
  'tab.unavailable': 'Chưa có gì ở đây có thể xem loại nội dung này.',
} satisfies Record<keyof typeof en, string>
