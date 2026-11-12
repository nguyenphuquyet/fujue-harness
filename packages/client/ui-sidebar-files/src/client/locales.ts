/**
 * `sidebarFiles` namespace dictionaries, and the namespace's declaration.
 *
 * The failure lines name what the tree could not list, one code each, because a
 * directory that is gone, one outside the workspace, and a path that is not a
 * directory each suggest a different next step.
 *
 * The namespace merge lives with its key set so that any module naming
 * `TranslateNS<'sidebarFiles'>` or `PropsLocale<'sidebarFiles'>` needs only this
 * file, whichever entry a program loads first.
 */
import type {} from '@deepseek-ai/dsh-client-ui-slots'

declare module '@deepseek-ai/dsh-client-ui-slots' {
  interface LocaleNamespaceMap {
    /** File-tree type name, guide entry, navigator controls, row states, and failure lines. */
    sidebarFiles: SidebarFilesKey
  }
}

/** Simplified Chinese dictionary and key-set source of truth. */
export const zh = {
  'shortcut.noSession': '请先选择会话',
  'type.label': '文件',
  'guide.title': '工作区文件',
  'guide.description': '浏览会话工作区的文件',
  loading: '正在读取…',
  empty: '空目录',
  emptyHidden: '隐藏项未显示',
  truncated: '条目太多，只显示了一部分。',
  noWorkspace: '这个会话没有工作区目录。',
  reload: '重新读取',
  autoRefresh: '自动刷新',
  'autoRefresh.enable': '开启自动刷新',
  'autoRefresh.disable': '关闭自动刷新',
  'entry.other': '这不是文件或目录，没法打开。',
  'entry.noViewer': '没有可以打开此文件的查看器。',
  'navigator.show': '显示文件树',
  'navigator.hide': '隐藏文件树',
  'navigator.resize': '调整文件树宽度',
  'error.notFound': '这个目录不在了。可能已被移动或删除。',
  'error.outsideWorkspace': '这个目录在工作区之外，侧栏不会读取它。',
  'error.notDirectory': '这不是一个目录。',
  'error.unavailable': '读取失败：{message}',
  'search.placeholder': '搜索文件',
  'search.settings': '搜索设置',
  'search.clear': '清空搜索',
  'search.showHidden': '显示隐藏项',
  'search.results': '{count} 个结果',
  'search.empty': '没有匹配项',
  'search.emptyHint.hidden': '隐藏项不会显示。',
  'search.emptyHint.excluded': '排除的文件和目录不会显示。',
  'search.emptyHint.both': '隐藏项以及排除的文件和目录不会显示。',
  'search.emptyHint.ignored': '被忽略文件（如 .gitignore）忽略的文件和目录不会显示。',
  'search.emptyHint.hiddenIgnored': '隐藏项，以及被忽略文件（如 .gitignore）忽略的文件和目录不会显示。',
  'search.emptyHint.excludedIgnored': '排除的文件和目录，以及被忽略文件（如 .gitignore）忽略的文件和目录不会显示。',
  'search.emptyHint.all': '隐藏项、排除的文件和目录，以及被忽略文件（如 .gitignore）忽略的文件和目录不会显示。',
  'search.emptyHint.label': '为什么没有匹配项',
  'search.truncated': '只显示前 {count} 个结果，请缩小搜索范围。',
  'search.incomplete': '文件数超过搜索上限，或部分目录未能读取，因此结果可能不完整。',
  'search.failed': '搜索失败：{message}',
  'search.retry': '重试',
  'settings.title': '排除的文件和目录',
  'settings.description': '只影响搜索结果，不影响文件树。',
  'settings.respectGitignore': '尊重忽略文件（.gitignore 等）',
  'settings.add': '添加文件或目录',
  'settings.close': '关闭',
  'settings.restore': '还原默认列表',
  'settings.remove': '删除 {path}',
  'settings.toggle': '排除 {path}',
  'settings.invalid.empty': '请输入名称或相对路径。',
  'settings.invalid.nul': '路径不能包含 NUL 字符。',
  'settings.invalid.absolute': '请使用相对于工作区的路径。',
  'settings.invalid.parent': '路径不能包含 . 或 .. 段。',
  'settings.invalid.glob': '路径不能包含通配符 * ? [ ] { } !。',
} satisfies Record<string, string>

/** Files dictionary key union. */
export type SidebarFilesKey = keyof typeof zh

/** English dictionary, checked against the Chinese key set. */
export const en = {
  'shortcut.noSession': 'Select a session first',
  'type.label': 'Files',
  'guide.title': 'Workspace files',
  'guide.description': 'Browse files in this session\'s workspace',
  loading: 'Reading…',
  empty: 'Empty directory',
  emptyHidden: 'Hidden entries are not shown',
  truncated: 'Too many entries, showing only some of them.',
  noWorkspace: 'This session has no workspace directory.',
  reload: 'Reload',
  autoRefresh: 'Auto refresh',
  'autoRefresh.enable': 'Enable auto refresh',
  'autoRefresh.disable': 'Disable auto refresh',
  'entry.other': 'Not a file or a directory, so it cannot be opened.',
  'entry.noViewer': 'No viewer can open this file.',
  'navigator.show': 'Show file tree',
  'navigator.hide': 'Hide file tree',
  'navigator.resize': 'Resize file tree',
  'error.notFound': 'That directory is gone. It may have been moved or deleted.',
  'error.outsideWorkspace': 'That directory is outside the workspace, so the sidebar will not read it.',
  'error.notDirectory': 'That is not a directory.',
  'error.unavailable': 'Read failed: {message}',
  'search.placeholder': 'Search files',
  'search.settings': 'Search settings',
  'search.clear': 'Clear search',
  'search.showHidden': 'Show hidden entries',
  'search.results': 'Results: {count}',
  'search.empty': 'No matches',
  'search.emptyHint.hidden': 'Hidden entries are not shown.',
  'search.emptyHint.excluded': 'Excluded files and directories are not shown.',
  'search.emptyHint.both': 'Hidden entries and excluded files and directories are not shown.',
  'search.emptyHint.ignored': 'Files and directories ignored by ignore files such as .gitignore are not shown.',
  'search.emptyHint.hiddenIgnored': 'Hidden entries, and files and directories ignored by ignore files such as .gitignore, are not shown.',
  'search.emptyHint.excludedIgnored': 'Excluded files and directories, and those ignored by ignore files such as .gitignore, are not shown.',
  'search.emptyHint.all': 'Hidden entries, excluded files and directories, and those ignored by ignore files such as .gitignore, are not shown.',
  'search.emptyHint.label': 'Why there are no matches',
  'search.truncated': 'Showing only the first {count} results. Narrow the search to see the rest.',
  'search.incomplete': 'The search passed its file limit, or some directories could not be read, so results may be incomplete.',
  'search.failed': 'Search failed: {message}',
  'search.retry': 'Retry',
  'settings.title': 'Excluded files and directories',
  'settings.description': 'Only affects search results, not the file tree.',
  'settings.respectGitignore': 'Respect ignore files (.gitignore, etc.)',
  'settings.add': 'Add file or directory',
  'settings.close': 'Close',
  'settings.restore': 'Restore default list',
  'settings.remove': 'Remove {path}',
  'settings.toggle': 'Exclude {path}',
  'settings.invalid.empty': 'Enter a name or relative path.',
  'settings.invalid.nul': 'The path cannot contain a NUL character.',
  'settings.invalid.absolute': 'Use a path relative to the workspace.',
  'settings.invalid.parent': 'The path cannot contain . or .. segments.',
  'settings.invalid.glob': 'The path cannot contain wildcards * ? [ ] { } !.',
} satisfies Record<SidebarFilesKey, string>







/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  'shortcut.noSession': 'Chọn một phiên trước',
  'type.label': 'Tệp',
  'guide.title': 'Tệp trong không gian làm việc',
  'guide.description': 'Duyệt tệp trong không gian làm việc của phiên này',
  'loading': 'Đang đọc…',
  'empty': 'Thư mục trống',
  'truncated': 'Quá nhiều mục, chỉ hiển thị một phần.',
  'noWorkspace': 'Phiên này không có thư mục không gian làm việc.',
  'reload': 'Tải lại',
  'autoRefresh': 'Tự động làm mới',
  'autoRefresh.enable': 'Bật tự động làm mới',
  'autoRefresh.disable': 'Tắt tự động làm mới',
  'entry.other': 'Không phải tệp hay thư mục nên không thể mở.',
  'entry.noViewer': 'Không có trình xem nào có thể mở tệp này.',
  'navigator.show': 'Hiện cây tệp',
  'navigator.hide': 'Ẩn cây tệp',
  'navigator.resize': 'Điều chỉnh độ rộng cây tệp',
  'error.notFound': 'Thư mục đó không còn nữa. Có thể nó đã bị di chuyển hoặc xóa.',
  'error.outsideWorkspace': 'Thư mục đó nằm ngoài không gian làm việc nên thanh bên sẽ không đọc nó.',
  'error.notDirectory': 'Đó không phải là thư mục.',
  'error.unavailable': 'Đọc thất bại: {message}',

    emptyHidden: 'Không hiển thị mục ẩn',
    'search.placeholder': 'Tìm tệp',
    'search.settings': 'Cài đặt tìm kiếm',
    'search.clear': 'Xóa tìm kiếm',
    'search.showHidden': 'Hiện mục ẩn',
    'search.results': 'Kết quả: {count}',
    'search.empty': 'Không có kết quả',
    'search.emptyHint.hidden': 'Không hiển thị mục ẩn.',
    'search.emptyHint.excluded': 'Không hiển thị tệp và thư mục bị loại trừ.',
    'search.emptyHint.both': 'Không hiển thị mục ẩn cùng tệp và thư mục bị loại trừ.',
    'search.emptyHint.ignored': 'Không hiển thị tệp và thư mục bị bỏ qua bởi tệp ignore như .gitignore.',
    'search.emptyHint.hiddenIgnored': 'Không hiển thị mục ẩn cùng tệp và thư mục bị bỏ qua bởi tệp ignore như .gitignore.',
    'search.emptyHint.excludedIgnored': 'Không hiển thị tệp và thư mục bị loại trừ, cùng những mục bị bỏ qua bởi tệp ignore như .gitignore.',
    'search.emptyHint.all': 'Không hiển thị mục ẩn, tệp và thư mục bị loại trừ, cùng những mục bị bỏ qua bởi tệp ignore như .gitignore.',
    'search.emptyHint.label': 'Vì sao không có kết quả',
    'search.truncated': 'Chỉ hiển thị {count} kết quả đầu tiên. Hãy thu hẹp tìm kiếm để xem phần còn lại.',
    'search.incomplete': 'Tìm kiếm đã vượt giới hạn tệp hoặc không đọc được một số thư mục, nên kết quả có thể chưa đầy đủ.',
    'search.failed': 'Tìm kiếm thất bại: {message}',
    'search.retry': 'Thử lại',
    'settings.title': 'Tệp và thư mục bị loại trừ',
    'settings.description': 'Chỉ ảnh hưởng đến kết quả tìm kiếm, không ảnh hưởng đến cây tệp.',
    'settings.respectGitignore': 'Tuân theo tệp ignore (.gitignore, v.v.)',
    'settings.add': 'Thêm tệp hoặc thư mục',
    'settings.close': 'Đóng',
    'settings.restore': 'Khôi phục danh sách mặc định',
    'settings.remove': 'Xóa {path}',
    'settings.toggle': 'Loại trừ {path}',
    'settings.invalid.empty': 'Nhập tên hoặc đường dẫn tương đối.',
    'settings.invalid.nul': 'Đường dẫn không được chứa ký tự NUL.',
    'settings.invalid.absolute': 'Dùng đường dẫn tương đối so với không gian làm việc.',
    'settings.invalid.parent': 'Đường dẫn không được chứa đoạn . hoặc ..',
    'settings.invalid.glob': 'Đường dẫn không được chứa ký tự đại diện * ? [ ] { } !.'
} satisfies Record<keyof typeof en, string>
