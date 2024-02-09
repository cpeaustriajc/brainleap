import { createClient } from '@/lib/supabase/action'

export async function POST(req: Request) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) await supabase.auth.signOut()

  return Response.redirect(new URL('/', req.url), 302)
}
