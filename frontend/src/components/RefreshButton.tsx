import { RefreshCw } from 'lucide-react'
import styles from './RefreshButton.module.css'

type Props = {
  /** What gets refreshed, for the accessible label ("Refresh Files"). */
  label: string
  fetching: boolean
  onClick: () => void
}

export function RefreshButton({ label, fetching, onClick }: Props) {
  return (
    <button
      type="button"
      className={styles.refresh}
      onClick={onClick}
      disabled={fetching}
      aria-label={`Refresh ${label}`}
      title="Refresh"
    >
      <RefreshCw size={14} className={fetching ? styles.spinning : undefined} />
    </button>
  )
}
