import type { LucideIcon } from 'lucide-react'
import styles from './EmptyState.module.css'

type Props = {
  icon: LucideIcon
  title: string
  description: string
}

export function EmptyState({ icon: Icon, title, description }: Props) {
  return (
    <div className={styles.empty}>
      <span className={styles.icon}>
        <Icon size={16} />
      </span>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
  )
}
