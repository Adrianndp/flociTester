import { endpoints, useS3 } from '../api'
import { ServicePage } from '../components/ServicePage'

export function S3Page() {
  const query = useS3()

  return (
    <ServicePage
      title="S3"
      description="Object storage buckets on the local emulator."
      endpoint={endpoints.s3}
      query={query}
    />
  )
}
