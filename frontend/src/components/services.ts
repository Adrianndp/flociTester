import { Boxes, Database, House, Server, SquareFunction, type LucideIcon } from 'lucide-react'

export type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  description: string
}

export const HOME: NavItem = {
  to: '/',
  label: 'Home',
  icon: House,
  description: 'Overview and backend health',
}

/** The AWS services the backend exposes, in sidebar order. */
export const SERVICES: NavItem[] = [
  { to: '/s3', label: 'S3', icon: Database, description: 'Object storage buckets' },
  { to: '/lambda', label: 'Lambda', icon: SquareFunction, description: 'Serverless functions' },
  { to: '/ec2', label: 'EC2', icon: Server, description: 'Virtual machine instances' },
  { to: '/eks', label: 'EKS', icon: Boxes, description: 'Managed Kubernetes clusters' },
]
