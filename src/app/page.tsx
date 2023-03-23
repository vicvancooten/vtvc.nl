import { getNowPlaying } from '@/lib/spotify'
import { getLastFMData } from '../lib/lastfm'

import styles from './page.module.scss'

import LastFM from './components/media/LastFM'
import Spotify from './components/media/Spotify'
import Me from './components/Me'

import Icon from '@mdi/react'
import {
  mdiLinkedin,
  mdiEmailNewsletter,
  mdiMastodon,
  mdiGithub,
} from '@mdi/js'

export const revalidate = 30

export default async function Home() {
  const nowPlaying = await getNowPlaying()
  const scrobbleCount = await getLastFMData()

  return (
    <main className={styles.main}>
      <header>
        <Me />
        <h1>Vic van Cooten</h1>
      </header>
      <p>
        Hi. I&apos;m Vic, a full-stack software engineer from Utrecht. I use a
        broad set of skills to make technology and processes work simpler and
        better.
      </p>
      <p>
        I currently work at{' '}
        <a
          href="https://a-insights.eu"
          title="We provide SaaS benchmarking, strategy and monitoring solutions."
          target="_blank"
          rel="noopener"
        >
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 527.44 303.83"
            className={styles.icon}
          >
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
        in Amsterdam, where I&apos;m responsible for technically designing and
        building the customer products.
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
        <Spotify fallbackData={nowPlaying} />
        <LastFM fallbackData={scrobbleCount} />
      </div>
    </main>
  )
}
