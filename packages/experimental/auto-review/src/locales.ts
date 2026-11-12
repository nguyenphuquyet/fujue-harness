/** Locale-owned approval text; reviewer reasons remain verbatim in every language. */

/** English approval messages. */
export const en = {
  denied: 'Auto review denied this call.',
  deniedWithReason: (reason: string): string => `Auto review denied this call: ${reason}`,
}

/** Chinese approval messages. */
export const zh = {
  denied: 'Auto review 拒绝了此调用。',
  deniedWithReason: (reason: string): string => `Auto review 拒绝了此调用：${reason}`,
} satisfies typeof en

/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  denied: 'Auto review đã từ chối lệnh gọi này.',
  deniedWithReason: (reason: string): string => `Auto review đã từ chối lệnh gọi này: ${reason}`,
} satisfies typeof en

/**
 * Build all display translations without translating the reviewer's raw reason.
 * @param reason - optional reviewer explanation.
 * @returns text for the Client's localized-text resolver.
 */
export function deniedDisplayReason(reason?: string): Record<'en' | 'zh' | 'vi', string> {
  return reason === undefined
    ? { en: en.denied, zh: zh.denied, vi: vi.denied }
    : { en: en.deniedWithReason(reason), zh: zh.deniedWithReason(reason), vi: vi.deniedWithReason(reason) }
}
