import type { UseQueryResult } from '@tanstack/react-query'
import { File, FolderOpen } from 'lucide-react'
import type { S3File } from '../api'
import { formatBytes, formatDate } from '../format'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import styles from './FileList.module.css'
import { Loading } from './Loading'
import { RefreshButton } from './RefreshButton'

type Props = {
  query: UseQueryResult<S3File[], Error>
}

/** Card with the bucket's files: loading, error, empty or a name/size/date table. */
export function FileList({ query }: Props) {
  const { data, error, isPending, isError, isFetching, refetch } = query
  const retry = () => void refetch()

  return (
    <section className={styles.card} aria-busy={isFetching} aria-labelledby="files-heading">
      <header className={styles.header}>
        <h2 id="files-heading" className={styles.title}>Files</h2>
        {data && <span className={styles.count}>{data.length}</span>}
        <RefreshButton label="files" fetching={isFetching} onClick={retry} />
      </header>

      {isPending ? (
        <div className={styles.padded}>
          <Loading label="Loading files…" />
        </div>
      ) : isError ? (
        <div className={styles.padded}>
          <ErrorState error={error} title="Couldn’t load files" onRetry={retry} retrying={isFetching} />
        </div>
      ) : data.length === 0 ? (
        <EmptyState icon={FolderOpen} title="No files yet" description="Use “Add file” to upload one to the bucket." />
      ) : (
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col" className={styles.numeric}>Size</th>
                <th scope="col">Last modified</th>
              </tr>
            </thead>
            <tbody>
              {data.map((file) => (
                <tr key={file.key}>
                  <td>
                    <span className={styles.name} title={file.key}>
                      <File size={14} className={styles.fileIcon} />
                      <span className={styles.nameText}>{file.key}</span>
                    </span>
                  </td>
                  <td className={styles.numeric}>{formatBytes(file.size)}</td>
                  <td className={styles.meta}>
                    <time dateTime={file.last_modified}>{formatDate(file.last_modified)}</time>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
