import { NextResponse } from 'next/server'
import { getScrobbleCount } from '@/lib/lastfm'

export const revalidate = 60

export async function GET() {
  return NextResponse.json(await getScrobbleCount(), {
    status: 200,
  })
}
