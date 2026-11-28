import { CircleAlert, RotateCw } from 'lucide-react'
import styles from './ErrorState.module.css'

type Props = {
  error: Error
  title?: string
  /** What to do next, shown under the error message. */
  hint?: string
  onRetry?: () => void
  retrying?: boolean
}

export function ErrorState({
  error,
  title = 'Couldn’t reach the backend',
  hint = 'Check that the backend is running, then try again.',
  onRetry,
  retrying = false,
}: Props) {
  return (
    <div className={styles.error} role="alert">
      <CircleAlert size={16} className={styles.icon} />
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <p className={styles.message}>{error.message}</p>
        <p className={styles.message}>{hint}</p>
      </div>
      {onRetry && (
        <button type="button" className={styles.retry} onClick={onRetry} disabled={retrying}>
          <RotateCw size={14} />
          Try again
        </button>
      )}
    </div>
  )
}
