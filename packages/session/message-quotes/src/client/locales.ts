/** Copy owned by the Quote interaction plugin. */

/** Quote plugin dictionary namespace. */
export const NS = 'messageQuotes'

/** Simplified Chinese dictionary and key source. */
export const zh = {
  'quote.add': '引用文本',
}

/** Supported Quote interaction copy keys. */
export type MessageQuotesKey = keyof typeof zh

/** English dictionary. */
export const en: Record<MessageQuotesKey, string> = {
  'quote.add': 'Quote text',
}

/** Vietnamese dictionary, checked against the English keys. */
export const vi = {
  'quote.add': 'Trích dẫn văn bản',
} satisfies Record<keyof typeof en, string>
