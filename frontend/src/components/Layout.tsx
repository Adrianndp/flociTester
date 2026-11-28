import { Outlet } from 'react-router'
import styles from './Layout.module.css'
import { Sidebar } from './Sidebar'

export function Layout() {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={styles.content}>
        <div className={styles.inner}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
