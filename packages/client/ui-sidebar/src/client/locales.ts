/** `sidebar` namespace dictionaries for shell controls and global panels. */

/** Simplified Chinese dictionary (the key-set source of truth). */
export const zh = {
  'panels.unpinTooltip': '从左侧栏取消固定',
  'panels.unpin': '从侧边栏取消固定{name}',
  'session.new': '新会话',
  'session.new.label': '新建会话',
  'toggle.open': '打开侧边栏',
  'toggle.collapse': '收起侧边栏',
  'panels.label': '全局面板',
  'navigation.label': '导航',
  'panels.more': '更多',
  'version.copied': '版本号复制成功',
} satisfies Record<string, string>

/** The sidebar namespace key union. */
export type SidebarKey = keyof typeof zh

/** English dictionary, checked complete against the zh key set. */
export const en = {
  'panels.unpinTooltip': 'Unpin from left sidebar',
  'panels.unpin': 'Unpin {name} from sidebar',
  'session.new': 'New Session',
  'session.new.label': 'New session',
  'toggle.open': 'Open sidebar',
  'toggle.collapse': 'Collapse sidebar',
  'panels.label': 'Global panels',
  'navigation.label': 'Navigation',
  'panels.more': 'More',
  'version.copied': 'Version copied',
} satisfies Record<SidebarKey, string>

/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  'panels.unpinTooltip': 'Bỏ ghim khỏi thanh bên trái',
  'panels.unpin': 'Bỏ ghim {name} khỏi thanh bên',
  'session.new': 'Phiên mới',
  'session.new.label': 'Phiên mới',
  'toggle.open': 'Mở thanh bên',
  'toggle.collapse': 'Thu gọn thanh bên',
  'panels.label': 'Bảng điều khiển toàn cục',
  'navigation.label': 'Điều hướng',
  'panels.more': 'Thêm',
  'version.copied': 'Đã sao chép phiên bản',
} satisfies Record<keyof typeof en, string>
