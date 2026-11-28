import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

/** Same-origin prefix: Vite (dev) and nginx (Docker) proxy it to the backend and strip it. */
export const API_BASE = '/api'

export type HealthResponse = { status: string }
export type ResultResponse = { result: string }
export type S3File = {
  key: string
  size: number
  /** ISO 8601 timestamp */
  last_modified: string
}

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/** FastAPI errors look like {"detail": "..."}; fall back to the status line. */
async function errorMessage(response: Response, label: string): Promise<string> {
  try {
    const body: unknown = await response.json()
    if (body && typeof body === 'object' && 'detail' in body && typeof body.detail === 'string') {
      return body.detail
    }
  } catch {
    // not JSON (e.g. an nginx error page)
  }
  return `${label} returned ${response.status} ${response.statusText}`.trim()
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const label = `${init?.method ?? 'GET'} ${API_BASE}${path}`
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { Accept: 'application/json', ...init?.headers },
  })
  if (!response.ok) {
    throw new ApiError(response.status, await errorMessage(response, label))
  }
  return (await response.json()) as T
}

/** Backend paths, exported so pages can show which endpoint they call. */
export const endpoints = {
  health: '/health',
  s3Files: '/s3/files',
  lambda: '/lambda',
  ec2: '/ec2',
  eks: '/eks',
} as const

export const useHealth = () =>
  useQuery({ queryKey: ['health'], queryFn: () => request<HealthResponse>(endpoints.health) })

const s3FilesKey = ['s3', 'files']

/** Link target that downloads one file (the backend streams it as an attachment). */
export const s3FileDownloadUrl = (key: string) =>
  `${API_BASE}${endpoints.s3Files}/${key.split('/').map(encodeURIComponent).join('/')}`

export const useS3Files = () =>
  useQuery({ queryKey: s3FilesKey, queryFn: () => request<S3File[]>(endpoints.s3Files) })

export const useUploadS3File = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => {
      const body = new FormData()
      body.append('file', file)
      // No Content-Type: the browser sets multipart/form-data with its boundary.
      return request<S3File>(endpoints.s3Files, { method: 'POST', body })
    },
    // Returning the promise keeps the mutation pending until the list has refreshed.
    onSuccess: () => queryClient.invalidateQueries({ queryKey: s3FilesKey }),
  })
}

export const useLambda = () =>
  useQuery({ queryKey: ['lambda'], queryFn: () => request<ResultResponse>(endpoints.lambda) })

export const useEc2 = () =>
  useQuery({ queryKey: ['ec2'], queryFn: () => request<ResultResponse>(endpoints.ec2) })

export const useEks = () =>
  useQuery({ queryKey: ['eks'], queryFn: () => request<ResultResponse>(endpoints.eks) })
