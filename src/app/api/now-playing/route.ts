import { NextResponse } from 'next/server'
import { getNowPlaying } from '@/lib/spotify'

export async function GET() {
  return NextResponse.json(await getNowPlaying(), {
    status: 200,
  })
}
