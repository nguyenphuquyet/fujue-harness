/** Context-menu operation feedback, separate from plugin display metadata. */
export const dictionaries = {
  zh: { back: '返回', failed: '操作失败，请重试' },
  en: { back: 'Back', failed: 'Could not complete the action. Try again.' },
  vi: { back: 'Quay lại', failed: 'Không thể hoàn tất thao tác. Hãy thử lại.' },
} satisfies Record<string, { back: string; failed: string }>
