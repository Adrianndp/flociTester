import type { UseQueryResult } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { API_BASE } from '../api'
import { ErrorState } from './ErrorState'
import { Loading } from './Loading'
import { RefreshButton } from './RefreshButton'
import styles from './ResultCard.module.css'

type Props<T extends object> = {
  title: string
  /** Backend path, e.g. "/s3"; shown as the call the browser makes. */
  endpoint: string
  query: UseQueryResult<T, Error>
  /** Extra content in the header, e.g. a status badge. */
  aside?: ReactNode
}

/** One backend call: header with endpoint and refresh, then loading, error or the response fields. */
export function ResultCard<T extends object>({ title, endpoint, query, aside }: Props<T>) {
  const { data, error, isPending, isError, isFetching, refetch } = query
  const retry = () => void refetch()

  return (
    <section className={styles.card} aria-busy={isFetching}>
      <header className={styles.header}>
        <div className={styles.heading}>
          <h2 className={styles.title}>{title}</h2>
          <code className={styles.endpoint}>GET {API_BASE}{endpoint}</code>
        </div>
        {aside}
        <RefreshButton label={title} fetching={isFetching} onClick={retry} />
      </header>

      <div className={styles.body}>
        {isPending ? (
          <Loading label={`Calling ${endpoint}…`} />
        ) : isError ? (
          <ErrorState error={error} onRetry={retry} retrying={isFetching} />
        ) : (
          <dl className={styles.fields}>
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className={styles.field}>
                <dt className={styles.key}>{key}</dt>
                <dd className={styles.value}>{typeof value === 'string' ? value : JSON.stringify(value)}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
