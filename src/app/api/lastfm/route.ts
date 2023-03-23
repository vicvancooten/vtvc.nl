import { NextResponse } from 'next/server'
import { getLastFMData } from '@/lib/lastfm'

export const revalidate = 60

export async function GET() {
  return NextResponse.json(await getLastFMData(), {
    status: 200,
  })
}
