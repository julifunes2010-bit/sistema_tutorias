import { createClient } from "@supabase/supabase-js"

const configuredSupabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabaseUrl = (() => {
  if (!configuredSupabaseUrl) return ""

  try {
    const url = new URL(configuredSupabaseUrl)
    if (url.pathname.replace(/\/$/, "") === "/rest/v1") url.pathname = ""
    return url.toString().replace(/\/$/, "")
  } catch {
    return configuredSupabaseUrl
  }
})()

export const supabaseConfigured = Boolean(
  supabaseUrl &&
  supabasePublishableKey &&
  !supabaseUrl.includes("URL_DEL_PROYECTO") &&
  !supabasePublishableKey.includes("CLAVE_PUBLICABLE")
)

export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null