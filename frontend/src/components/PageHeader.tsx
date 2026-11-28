import type { ReactNode } from 'react'
import styles from './PageHeader.module.css'

type Props = {
  title: string
  description: string
  /** Page-level actions, right-aligned (at most one primary button). */
  actions?: ReactNode
}

export function PageHeader({ title, description, actions }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  )
}
