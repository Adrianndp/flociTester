import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { Layout } from './components/Layout'
import { Ec2Page } from './pages/Ec2Page'
import { EksPage } from './pages/EksPage'
import { HomePage } from './pages/HomePage'
import { LambdaPage } from './pages/LambdaPage'
import { S3Page } from './pages/S3Page'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
})

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/s3', element: <S3Page /> },
      { path: '/lambda', element: <LambdaPage /> },
      { path: '/ec2', element: <Ec2Page /> },
      { path: '/eks', element: <EksPage /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
