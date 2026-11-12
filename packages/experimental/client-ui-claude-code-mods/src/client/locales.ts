/** Web dictionaries for the chrome around a mod's band; the mods' own content is theirs. */

/** Locale namespace owned by the mods band. */
export const NS = 'claude-code-mods'

/** Simplified Chinese dictionary and key source. */
export const zh = {
  band: 'Claude Code 模组',
  pressing: '正在处理…',
  'press.failed': '按钮操作失败：{message}',
  'press.stale': '该按钮属于更早的绘制，面板已刷新',
} satisfies Record<string, string>

/** Mods band locale key union. */
export type ModsBandKey = keyof typeof zh

/** English dictionary checked against the Chinese key set. */
export const en = {
  band: 'Claude Code mods',
  pressing: 'Working…',
  'press.failed': 'The button failed: {message}',
  'press.stale': 'That button belonged to an earlier drawing; the band has refreshed',
} satisfies Record<ModsBandKey, string>

/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  band: 'Bản sửa đổi Claude Code',
  pressing: 'Đang xử lý…',
  'press.failed': 'Nút thao tác thất bại: {message}',
  'press.stale': 'Nút đó thuộc về một lần hiển thị trước đó; dải đã được làm mới',
} satisfies Record<keyof typeof en, string>
