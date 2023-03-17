import styles from './styles.module.scss'

import Icon from '@mdi/react'
import { mdiMusicNotePlus } from '@mdi/js'

const LastFM = () => {
  const lastFm = false

  return lastFm ? (
    <div className={`${styles.root} ${styles['track-count']}`}>
      <Icon path={mdiMusicNotePlus} size={1} />
      <p>Last.FM</p>
    </div>
  ) : (
    <></>
  )
}

export default LastFM
