import { endpoints, useEc2 } from '../api'
import { ServicePage } from '../components/ServicePage'

export function Ec2Page() {
  const query = useEc2()

  return (
    <ServicePage
      title="EC2"
      description="Virtual machine instances on the local emulator."
      endpoint={endpoints.ec2}
      query={query}
    />
  )
}
