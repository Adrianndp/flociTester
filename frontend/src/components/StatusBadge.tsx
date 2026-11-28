import styles from './StatusBadge.module.css'

type Tone = 'success' | 'danger' | 'neutral'

export function StatusBadge({ tone, label }: { tone: Tone; label: string }) {
  return (
    <span className={styles[tone]} role="status">
      <span className={styles.dot} aria-hidden="true" />
      {label}
    </span>
  )
}
