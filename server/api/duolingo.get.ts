import chromium from 'chrome-aws-lambda'

let cache = {
  time: Date.now(),
  streak: 0,
}

export default defineEventHandler(async (event) => {
  const currentTime = Date.now()
  const oneDay = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

  if (!process.env.DUOLINGO_USER) {
    return { error: 'DUOLINGO_USER environment variable not set' }
  }

  // If more than 24 hours have passed since the last fetch, update the cache
  if (cache.streak === 0 || currentTime - cache.time > oneDay) {
    return getDuolingoStreak(process.env.DUOLINGO_USER)
      .then((streak) => {
        cache = { time: currentTime, streak } // Update the cache
        return { streak, cache: false }
      })
      .catch((error) => {
        return { error }
      })
  } else {
    // If less than 24 hours have passed, return the cached result
    return { streak: cache.streak, cache: true }
  }
})

async function getDuolingoStreak(username: string) {
  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  })

  const page = await browser.newPage()
  await page.goto(`https://www.duolingo.com/profile/${username}`)

  // Wait for the page to load fully
  await page.waitForSelector('h4')

  // Find the element that has both a H4 as well as the text "Day streak". Return the text content of the H4.
  const streak = await page.evaluate(() => {
    // Find all div elements
    const divs = Array.from(document.querySelectorAll('div'))

    // Find the div that contains both an h4 and the text "Day streak"
    for (const div of divs) {
      const h4 = div.querySelector('h4')
      if (h4 && div.textContent.includes('Day streak')) {
        return h4.textContent
      }
    }
    return null
  })

  await browser.close()
  return parseInt(`${streak}`)
}
