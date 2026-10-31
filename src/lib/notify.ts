/**
 * Server-only notification helper.
 *
 * Sends a short message to the couple's Telegram chat whenever a guest submits
 * an RSVP or a blessing. Telegram is free and instant. Configure with two env
 * vars (server-only — never NEXT_PUBLIC):
 *   TELEGRAM_BOT_TOKEN  — from @BotFather
 *   TELEGRAM_CHAT_ID    — your chat id (numeric)
 *
 * If the env vars are missing the function quietly does nothing, so the app
 * still works without notifications configured.
 */
export async function notifyTelegram(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
      // Don't let a slow notification block the user's response.
      signal: AbortSignal.timeout(8000),
    })
  } catch {
    // Notification is best-effort; never fail the request because of it.
  }
}

/** Small HTML escape for safe Telegram HTML messages. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
