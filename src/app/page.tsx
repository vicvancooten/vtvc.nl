import { getNowPlaying } from '@/lib/spotify'
import { getLastFMData } from '../lib/lastfm'
import { getHassData } from '@/lib/hass'

import styles from './page.module.scss'

import LastFM from '@/app/components/stats/LastFM'
import Spotify from '@/app/components/stats/Spotify'
import Hass from '@/app/components/stats/Hass'
import Me from '@/app/components/Me'

import Image from 'next/image'
import U from './u.svg'

import Icon from '@mdi/react'
import {
  mdiLinkedin,
  mdiEmailNewsletter,
  mdiMastodon,
  mdiGithub,
} from '@mdi/js'

export const revalidate = 15

export default async function Home() {
  const spotifyData = await getNowPlaying()
  const lastfmData = await getLastFMData()
  const hassData = await getHassData()

  return (
    <main className={styles.main}>
      <header>
        <Me />
        <h1>Vic van Cooten</h1>
        <style>{`
          :global(body) {
            --accent-color: ${hassData.color};
          }
        `}</style>
        <meta name="theme-color" content={hassData.color} />
      </header>
      <p>
        Hi. I&apos;m <strong>Vic</strong>, a senior full-stack software engineer
        from{' '}
        <strong>
          {' '}
          <Image
            src={U}
            width={18}
            height={18}
            alt="Utrecht"
            className={styles.inlineIcon}
          />
          Utrecht
        </strong>
        . I use a broad set of skills to build awesome products and to make
        technology and processes work simpler and better.
      </p>
      <p>
        I currently work at{' '}
        <a
          href="https://a-insights.eu"
          title="We provide SaaS benchmarking, strategy and monitoring solutions."
          target="_blank"
          rel="noopener"
          className={styles.ai}
        >
          {' '}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 527.44 303.83">
            <path
              d="M84.5 142.18a10.62 10.62 0 01-7.5-18.13L197.75 3.3a11.27 11.27 0 0115.92 0l47.43 47.42a10.62 10.62 0 01-15.02 15.02l-40.37-40.37L92 139.07a10.58 10.58 0 01-7.5 3.12"
              fill="#f47258"
            ></path>
            <path
              d="M446.35 1.04a10.62 10.62 0 017.5 18.12L334.7 138.33a11.27 11.27 0 01-15.92 0l-46.6-46.6a10.62 10.62 0 1115.01-15.02l39.55 39.55L438.84 4.15c2.08-2.08 4.8-3.11 7.51-3.11"
              fill="#00128a"
            ></path>
          </svg>{' '}
          A-Insights
        </a>{' '}
        in Amsterdam, where I am responsible for the software engineering team
        and the architecture of our products.
      </p>
      <p>
        Curious about what&apos;s going on behind the scenes on this totally
        overengineered page?
        <a
          href="https://github.com/Duveaux/vtvc.nl"
          rel="noopener"
          className={styles.source}
          target="_blank"
        >
          <Icon path={mdiGithub} size={1} />
          Check out the source.
        </a>
      </p>
      <p>Want to get in contact?</p>
      <div className={styles.contact}>
        <a
          href="https://linkedin.com/in/vtvc"
          target="_blank"
          title="Send me a message on LinkedIn"
        >
          <Icon path={mdiLinkedin} size={1} />
        </a>
        <a href="mailto:hi@vtvc.nl" target="_blank" title="Shoot me an email!">
          <Icon path={mdiEmailNewsletter} size={1} />
        </a>
        <a
          href="https://github.com/Duveaux"
          target="_blank"
          title="See personal projects on LinkedIn"
        >
          <Icon path={mdiGithub} size={1} />
        </a>
        <a
          href="https://fosstodon.org/@duveaux"
          target="_blank"
          title="Connect with me on Mastodon"
        >
          <Icon path={mdiMastodon} size={1} />
        </a>
      </div>
      <hr />
      <div className={styles['fun-facts']}>
        <Spotify fallbackData={spotifyData} />
        <LastFM
          fallbackData={lastfmData}
          color={hassData?.color ?? '#79ffe1'}
        />
        <Hass fallbackData={hassData} />
      </div>
    </main>
  )
}
