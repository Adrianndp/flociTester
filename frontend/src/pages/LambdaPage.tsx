import { endpoints, useLambda } from '../api'
import { ServicePage } from '../components/ServicePage'

export function LambdaPage() {
  const query = useLambda()

  return (
    <ServicePage
      title="Lambda"
      description="Serverless functions on the local emulator."
      endpoint={endpoints.lambda}
      query={query}
    />
  )
}
