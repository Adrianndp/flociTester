import { useEffect, useState } from 'react'
import styles from './Loading.module.css'

/** Reserves its space immediately but only shows the spinner after ~300 ms. */
export function Loading({ label = 'Loading…' }: { label?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={styles.loading} role="status" aria-live="polite">
      {visible && (
        <>
          <span className={styles.spinner} aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </div>
  )
}
