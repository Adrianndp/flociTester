import { Cloud } from 'lucide-react'
import { NavLink } from 'react-router'
import { HOME, SERVICES } from './services'
import styles from './Sidebar.module.css'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.logo}>
          <Cloud size={16} />
        </span>
        <span className={styles.brandName}>Floci Tester</span>
      </div>

      <nav className={styles.nav} aria-label="Main">
        <NavLink to={HOME.to} end className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>
          <HOME.icon size={16} />
          {HOME.label}
        </NavLink>

        <p className={styles.section}>Services</p>
        {SERVICES.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
