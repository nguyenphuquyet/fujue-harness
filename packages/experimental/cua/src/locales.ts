/** Locale-owned application-access approval messages. */

/** English application-access messages. */
export const en = {
  question: 'Allow agent to control this application via computer use?',
  detail: 'Manage app permissions for all sessions on the plugin page.',
  approve: 'Allow for this session',
}

/** Chinese application-access messages. */
export const zh = {
  question: '允许智能体通过 Computer Use 控制此应用吗？',
  detail: '在插件页面管理所有会话的应用权限。',
  approve: '本会话允许',
} satisfies Record<keyof typeof en, string>

/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  question: 'Cho phép agent điều khiển ứng dụng này bằng Computer Use?',
  detail: 'Quản lý quyền ứng dụng cho mọi phiên trên trang plugin.',
  approve: 'Cho phép trong phiên này',
} satisfies Record<keyof typeof en, string>

/** Display translations resolved by the Client; wire choices stay unchanged. */
export const applicationAccessDisplay = {
  question: { en: en.question, zh: zh.question, vi: vi.question },
  detail: { en: en.detail, zh: zh.detail, vi: vi.detail },
  approve: { en: en.approve, zh: zh.approve, vi: vi.approve },
}

/** Window consent never grants access to sibling windows or application launch. */
export const windowAccessQuestion = { en: 'Allow computer use to read, capture and control this window?', zh: '允许电脑操作读取、截图并控制这个窗口吗？' }
/** Launch consent does not grant access to resulting windows. */
export const launchAccessQuestion = { en: 'Allow computer use to launch this entry? Window access is requested separately.', zh: '允许电脑操作启动这个入口吗？窗口访问将单独请求授权。' }
