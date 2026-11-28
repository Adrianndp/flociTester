import type { UseQueryResult } from '@tanstack/react-query'
import type { ResultResponse } from '../api'
import { PageHeader } from './PageHeader'
import { ResultCard } from './ResultCard'

type Props = {
  title: string
  description: string
  endpoint: string
  query: UseQueryResult<ResultResponse, Error>
}

/** Shared shape of the per-service pages: header plus one result card. */
export function ServicePage({ title, description, endpoint, query }: Props) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <ResultCard title={`${title} response`} endpoint={endpoint} query={query} />
    </>
  )
}
