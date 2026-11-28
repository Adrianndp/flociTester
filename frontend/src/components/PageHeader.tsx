import styles from './PageHeader.module.css'

type Props = {
  title: string
  description: string
}

export function PageHeader({ title, description }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
    </header>
  )
}
