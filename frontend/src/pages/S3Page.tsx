import { useS3Files, useUploadS3File } from '../api'
import { ErrorState } from '../components/ErrorState'
import { FileList } from '../components/FileList'
import { FileUploadButton } from '../components/FileUploadButton'
import { PageHeader } from '../components/PageHeader'

export function S3Page() {
  const files = useS3Files()
  const upload = useUploadS3File()
  const lastFile = upload.variables

  return (
    <>
      <PageHeader
        title="S3"
        description="Files in the backend’s S3 bucket on the local emulator."
        actions={<FileUploadButton label="Add file" uploading={upload.isPending} onSelect={(file) => upload.mutate(file)} />}
      />

      {upload.isError && (
        <ErrorState
          error={upload.error}
          title={lastFile ? `Couldn’t upload ${lastFile.name}` : 'Upload failed'}
          hint="Check that the backend and emulator are running, then try again."
          onRetry={lastFile ? () => upload.mutate(lastFile) : undefined}
        />
      )}

      <FileList query={files} />
    </>
  )
}
