import { LoaderCircle, Upload } from 'lucide-react'
import { useRef, type ChangeEvent } from 'react'
import styles from './FileUploadButton.module.css'

type Props = {
  label: string
  uploading: boolean
  onSelect: (file: File) => void
}

/** A primary button that opens the file picker and hands back the chosen file. */
export function FileUploadButton({ label, uploading, onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    // Reset so picking the same file again still fires a change event.
    event.target.value = ''
    if (file) onSelect(file)
  }

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        aria-busy={uploading}
      >
        {uploading ? <LoaderCircle size={16} className={styles.spinning} /> : <Upload size={16} />}
        {label}
      </button>
      <input ref={inputRef} type="file" className={styles.input} onChange={handleChange} tabIndex={-1} aria-hidden="true" />
    </>
  )
}
