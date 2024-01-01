import { createClient } from "./lib/supabase/middleware"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
    const { supabase, response } = createClient(request)

    const { data: { user } } = await supabase.auth.getUser()

    if (user && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/profile', request.url))
    }

    if (!user && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }

    return response
}

export const config = {
    matcher: ['/', '/profile'],
}
