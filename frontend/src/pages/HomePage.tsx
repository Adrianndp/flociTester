import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { endpoints, useHealth } from '../api'
import { PageHeader } from '../components/PageHeader'
import { ResultCard } from '../components/ResultCard'
import { SERVICES } from '../components/services'
import { StatusBadge } from '../components/StatusBadge'
import styles from './HomePage.module.css'

export function HomePage() {
  const health = useHealth()

  const badge = health.isPending ? (
    <StatusBadge tone="neutral" label="Checking" />
  ) : health.isError || health.data.status !== 'ok' ? (
    <StatusBadge tone="danger" label="Unreachable" />
  ) : (
    <StatusBadge tone="success" label="Healthy" />
  )

  return (
    <>
      <PageHeader
        title="Welcome to Floci Tester"
        description="Call the backend for each emulated AWS service and see what comes back."
      />

      <ResultCard title="Backend health" endpoint={endpoints.health} query={health} aside={badge} />

      <section className={styles.services} aria-labelledby="services-heading">
        <h2 id="services-heading" className={styles.sectionTitle}>Services</h2>
        <ul className={styles.grid}>
          {SERVICES.map(({ to, label, icon: Icon, description }) => (
            <li key={to}>
              <Link to={to} className={styles.tile}>
                <span className={styles.tileIcon}>
                  <Icon size={16} />
                </span>
                <span className={styles.tileText}>
                  <span className={styles.tileLabel}>{label}</span>
                  <span className={styles.tileDescription}>{description}</span>
                </span>
                <ArrowRight size={14} className={styles.tileArrow} />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
