/**
 * This endpoint fetches the current Duolingo streak for a user
 * It uses a proxy, because this website is based on the edge and functions are not the right place to run puppeteer
 * The proxy can be set in the environment variable DUOLINGO_STREAK_PROXY
 */
export default defineEventHandler(async (event) => {
  if (!process.env.DUOLINGO_USERNAME) {
    return {
      success: false,
      error: 'DUOLINGO_USERNAME environment variable not set',
      streak: -1,
    }
  }

  const res = await fetch(
    `https://www.duolingo.com/2017-06-30/users?username=${process.env.DUOLINGO_USERNAME}&fields=streak,streakData%7BcurrentStreak,previousStreak%7D%7D`,
  )
  const data = await res.json()
  const userData = data.users[0]
  // I didn't know which of these fields matter, so I just get the max of them.
  const streak = Math.max(
    userData?.streak ?? 0,
    userData?.streakData?.currentStreak?.length ?? 0,
    userData?.streakData?.previousStreak?.length ?? 0,
  )
  return { success: true, streak }
})
