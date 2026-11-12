/** Account settings copy, owned by the account feature. */
import { onboardingZh, onboardingEn, onboardingVi } from './locales/onboarding.ts'

/** English account dictionary. */
export const en = {
  modelSignInRequired: 'Model unavailable. Please sign in and try again.',
  sessionExpired: 'You have signed out of your account, please log in again.',
  ...onboardingEn,
  close: 'Close', addApiKey: 'Add API Key', retry: 'Sign in again',
  loginTitle: 'Get started', loginDescription: 'Sign in to your DeepSeek account or add an API Key to get started. Your projects and files are stored locally.',
  browserTitle: 'Waiting for sign in', browserPrompt: 'Page did not open automatically? ', copyLink: 'Copy sign-in link', copiedLink: 'Link copied', copyFailed: 'Copy failed',
  browserDescription: ', then open it in your browser to finish signing in.',
  timeoutTitle: 'Sign in timed out', timeoutDescription: 'Sign in again to continue.',
  failureTitle: 'Could not sign in',
  platformFailed: 'Could not complete the operation. Try again.', platformRetry: 'Retry',
  loading: 'Loading…', backToHarness: 'Back to FuJue Harness',
  settings: 'Settings', contactUs: 'Feedback', menu: 'Account menu',
  nav: 'Account', signedIn: 'Signed in to DeepSeek', signedOut: 'Not signed in',
  signIn: 'Sign in', signOut: 'Sign out',
  signOutUnknownDescription: 'Could not check running tasks. Signing out may interrupt tasks using this account. Sign out now?',
  signOutDescription: 'Signing out will not delete any data. You can sign in to this account again.',
  signOutRunningDescription: 'Tasks are currently running. Signing out will interrupt them. Sign out now?', cancel: 'Cancel', open: 'Open browser',
  initializing: 'Starting sign in…', waiting: 'Continue in your browser',
  completing: 'Completing sign in…', expired: 'Sign in expired. Try again.',
  failed: 'Could not complete the operation. Try again.',
  noResponse: 'Something went wrong. Please check your network connection and try again.',
  settingsSignedOutTitle: 'You are not signed in to FuJue Harness',
  settingsSignedOutDescription: 'Sign in to FuJue Harness to get your dedicated API Key',
  signInDescription: 'Use your DeepSeek account to get started.',
  profileUnavailable: 'Account details are not available yet.',
  balance: 'Topped-up balance', bonusBalance: 'Granted balance', balanceUnavailable: 'View on Platform', balanceSignedOut: 'Sign in to view',
  accountInfo: 'More account information', more: 'More', usage: 'View usage', topUp: 'Top up',
  quotaTitle: 'No balance available',
  quotaDescription: 'FuJue Harness cannot start a new task with this account when no balance is available. Would you like to top up? You can also top up later in Settings → Account.',
  quotaTopUp: 'Top up',
} as const
/** Account locale keys. */
export type AccountKey = keyof typeof en
/** Chinese account settings copy. */
export const zh: Record<AccountKey, string> = {
  modelSignInRequired: '当前模型暂不可用，请登录后再试',
  sessionExpired: '登录信息已失效，请重新登录',
  ...onboardingZh,
  close: '关闭', addApiKey: '添加 API Key', retry: '重新登录',
  loginTitle: '开始使用', loginDescription: '登录 DeepSeek 账号，或添加 API Key，即可开始使用。你的项目和文件保存在本地。',
  browserTitle: '等待登录', browserPrompt: '没有自动打开新页面？', copyLink: '复制登录链接', copiedLink: '链接已复制', copyFailed: '复制失败',
  browserDescription: '，手动打开登录页完成登录。',
  timeoutTitle: '登录已超时', timeoutDescription: '请重新登录后继续操作。',
  failureTitle: '登录失败',
  platformFailed: '操作未完成，请重试', platformRetry: '重试',
  loading: '加载中…', backToHarness: '返回 FuJue Harness',
  settings: '设置', contactUs: '意见反馈', menu: '账号菜单',
  nav: '账号与余额', signedIn: '已登录 DeepSeek', signedOut: '尚未登录',
  signIn: '登录', signOut: '退出登录',
  signOutUnknownDescription: '暂时无法确认任务状态。退出登录可能会中断使用此账号的任务，是否继续？',
  signOutDescription: '退出登录不会丢失任何数据，你仍可以登录此账号。',
  signOutRunningDescription: '当前有进程正在执行中，点击“退出登录”，将会打断进程，是否即刻退出登录？', cancel: '取消', open: '打开浏览器',
  initializing: '正在发起登录…', waiting: '请在浏览器中继续',
  completing: '正在完成登录…', expired: '登录已过期，请重试。',
  failed: '操作未完成，请重试。',
  noResponse: '操作未完成，可能是网络异常，请检查你的网络状况后重试',
  settingsSignedOutTitle: '当前未登录 FuJue Harness 账号',
  settingsSignedOutDescription: '登录 FuJue Harness 账号获取专属 API Key',
  signInDescription: '登录 DeepSeek 账号以开始使用',
  profileUnavailable: '账号资料暂不可用',
  balance: '充值余额', bonusBalance: '赠金余额', balanceUnavailable: '前往开放平台查看', balanceSignedOut: '登录后查看',
  accountInfo: '更多账号信息', more: '更多', usage: '查询用量', topUp: '充值',
  quotaTitle: '当前无可用余额',
  quotaDescription: '没有可用额度时，FuJue Harness 无法开始新的任务，是否前往充值？或者可以稍后前往 设置 → 账号与余额 进行充值。',
  quotaTopUp: '去充值',
}







/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  modelSignInRequired: 'Mô hình không khả dụng. Vui lòng đăng nhập và thử lại.',
  sessionExpired: 'Bạn đã đăng xuất khỏi tài khoản, vui lòng đăng nhập lại.',
  ...onboardingVi,
  close: 'Đóng', addApiKey: 'Thêm API Key', retry: 'Đăng nhập lại',
  loginTitle: 'Bắt đầu', loginDescription: 'Đăng nhập tài khoản DeepSeek hoặc thêm API Key để bắt đầu. Dự án và tệp của bạn được lưu cục bộ.',
  browserTitle: 'Đang chờ đăng nhập', browserPrompt: 'Trang không tự mở? ', copyLink: 'Sao chép liên kết đăng nhập', copiedLink: 'Đã sao chép liên kết', copyFailed: 'Sao chép thất bại',
  browserDescription: ', sau đó mở liên kết trong trình duyệt để hoàn tất đăng nhập.',
  timeoutTitle: 'Đăng nhập đã hết thời gian', timeoutDescription: 'Đăng nhập lại để tiếp tục.',
  failureTitle: 'Không thể đăng nhập',
  platformFailed: 'Không thể hoàn tất thao tác. Hãy thử lại.', platformRetry: 'Thử lại',
  loading: 'Đang tải…', backToHarness: 'Quay lại FuJue Harness',
  settings: 'Cài đặt', contactUs: 'Phản hồi', menu: 'Menu tài khoản',
  nav: 'Tài khoản', signedIn: 'Đã đăng nhập DeepSeek', signedOut: 'Chưa đăng nhập',
  signIn: 'Đăng nhập', signOut: 'Đăng xuất',
  signOutUnknownDescription: 'Không thể kiểm tra tác vụ đang chạy. Đăng xuất có thể làm gián đoạn các tác vụ dùng tài khoản này. Đăng xuất ngay?',
  signOutDescription: 'Đăng xuất sẽ không xóa bất kỳ dữ liệu nào. Bạn có thể đăng nhập lại tài khoản này.',
  signOutRunningDescription: 'Hiện có tác vụ đang chạy. Đăng xuất sẽ làm gián đoạn chúng. Đăng xuất ngay?', cancel: 'Hủy', open: 'Mở trình duyệt',
  initializing: 'Đang bắt đầu đăng nhập…', waiting: 'Tiếp tục trong trình duyệt của bạn',
  completing: 'Đang hoàn tất đăng nhập…', expired: 'Đăng nhập đã hết hạn. Hãy thử lại.',
  failed: 'Không thể hoàn tất thao tác. Hãy thử lại.',
  noResponse: 'Đã xảy ra lỗi. Vui lòng kiểm tra kết nối mạng và thử lại.',
  settingsSignedOutTitle: 'Bạn chưa đăng nhập vào FuJue Harness',
  settingsSignedOutDescription: 'Đăng nhập FuJue Harness để nhận API Key riêng của bạn',
  signInDescription: 'Dùng tài khoản DeepSeek của bạn để bắt đầu.',
  profileUnavailable: 'Thông tin tài khoản chưa khả dụng.',
  balance: 'Số dư đã nạp', bonusBalance: 'Số dư được tặng', balanceUnavailable: 'Xem trên nền tảng', balanceSignedOut: 'Đăng nhập để xem',
  accountInfo: 'Thêm thông tin tài khoản', more: 'Thêm', usage: 'Xem mức sử dụng', topUp: 'Nạp tiền',
  quotaTitle: 'Không có số dư khả dụng',
  quotaDescription: 'FuJue Harness không thể bắt đầu tác vụ mới bằng tài khoản này khi không có số dư. Bạn có muốn nạp tiền không? Bạn cũng có thể nạp sau trong Cài đặt → Tài khoản.',
  quotaTopUp: 'Nạp tiền'
} satisfies Record<keyof typeof en, string>
