/** Settings shell host entry: keeps its own instance off the generated Settings pages. */

import type {} from '@quyet/settings'
import type { Context } from '@quyet/cordis'

/** The browser consumes the configuration form projection.
 * @param ctx Plugin context used for optional settings presentation.
 */
export function apply(ctx: Context): void {
  ctx.inject(['settings'], (child) => { child.effect(() => child.settings.configure({ auto: false }, ctx.fiber)) })
}
