import { NextResponse } from 'next/server'
import { getHassData } from '@/lib/hass'

export const revalidate = 60

export async function GET() {
  return NextResponse.json(await getHassData(), {
    status: 200,
  })
}
