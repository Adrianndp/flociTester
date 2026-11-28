import { CircleAlert, RotateCw } from 'lucide-react'
import styles from './ErrorState.module.css'

type Props = {
  error: Error
  onRetry: () => void
  retrying?: boolean
}

export function ErrorState({ error, onRetry, retrying = false }: Props) {
  return (
    <div className={styles.error} role="alert">
      <CircleAlert size={16} className={styles.icon} />
      <div className={styles.body}>
        <p className={styles.title}>Couldn’t reach the backend</p>
        <p className={styles.message}>
          {error.message}. Check that the backend is running, then try again.
        </p>
      </div>
      <button type="button" className={styles.retry} onClick={onRetry} disabled={retrying}>
        <RotateCw size={14} />
        Try again
      </button>
    </div>
  )
}
