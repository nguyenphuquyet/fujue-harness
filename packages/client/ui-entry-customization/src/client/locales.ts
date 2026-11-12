/** Copy for the More menu rows: navigation actions, and Creator draft prompts per region. */
export const en = {
  'pinTooltip': 'Pin to left sidebar',
  'pin': 'Pin {name} to sidebar',
  install: 'Browse other plugins',
  create: 'Create your plugin',
  'createPrompt.sidebar': 'Create a FuJue Harness plugin with a left sidebar entry.',
  'createPrompt.conversation': 'Create a FuJue Harness conversation view plugin.',
  'createPrompt.rightbar': 'Create a FuJue Harness plugin with a right sidebar entry.',
} as const

/** Chinese counterpart of the entry-customization dictionary. */
export const zh: Record<keyof typeof en, string> = {
  'pinTooltip': '固定到左侧栏',
  'pin': '将{name}固定到侧边栏',
  install: '浏览更多插件',
  create: '创建你的插件',
  'createPrompt.sidebar': '创建一个带左侧栏入口的 FuJue Harness 插件。',
  'createPrompt.conversation': '创建一个 FuJue Harness 会话视图插件。',
  'createPrompt.rightbar': '创建一个带右侧栏入口的 FuJue Harness 插件。',
}







/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  'pinTooltip': 'Ghim vào thanh bên trái',
  'pin': 'Ghim {name} vào thanh bên',
  install: 'Khám phá các plugin khác',
  create: 'Tạo plugin của bạn',
  'createPrompt.sidebar': 'Tạo plugin FuJue Harness với một mục ở thanh bên trái.',
  'createPrompt.conversation': 'Tạo plugin giao diện hội thoại FuJue Harness.',
  'createPrompt.rightbar': 'Tạo plugin FuJue Harness với một mục ở thanh bên phải.',
} satisfies Record<keyof typeof en, string>
