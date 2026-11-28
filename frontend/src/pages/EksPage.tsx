import { endpoints, useEks } from '../api'
import { ServicePage } from '../components/ServicePage'

export function EksPage() {
  const query = useEks()

  return (
    <ServicePage
      title="EKS"
      description="Managed Kubernetes clusters on the local emulator."
      endpoint={endpoints.eks}
      query={query}
    />
  )
}
