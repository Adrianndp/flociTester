import { useQuery } from '@tanstack/react-query'

/** Same-origin prefix: Vite (dev) and nginx (Docker) proxy it to the backend and strip it. */
export const API_BASE = '/api'

export type HealthResponse = { status: string }
export type ResultResponse = { result: string }

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { Accept: 'application/json' },
  })
  if (!response.ok) {
    throw new ApiError(response.status, `GET ${API_BASE}${path} returned ${response.status} ${response.statusText}`.trim())
  }
  return (await response.json()) as T
}

/** Backend paths, exported so pages can show which endpoint they call. */
export const endpoints = {
  health: '/health',
  s3: '/s3',
  lambda: '/lambda',
  ec2: '/ec2',
  eks: '/eks',
} as const

export const useHealth = () =>
  useQuery({ queryKey: ['health'], queryFn: () => apiGet<HealthResponse>(endpoints.health) })

export const useS3 = () =>
  useQuery({ queryKey: ['s3'], queryFn: () => apiGet<ResultResponse>(endpoints.s3) })

export const useLambda = () =>
  useQuery({ queryKey: ['lambda'], queryFn: () => apiGet<ResultResponse>(endpoints.lambda) })

export const useEc2 = () =>
  useQuery({ queryKey: ['ec2'], queryFn: () => apiGet<ResultResponse>(endpoints.ec2) })

export const useEks = () =>
  useQuery({ queryKey: ['eks'], queryFn: () => apiGet<ResultResponse>(endpoints.eks) })
