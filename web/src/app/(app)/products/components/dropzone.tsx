import { UploadCloud } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

interface DropzoneProps {
  onChange: (files: File[]) => void
  id?: string
}

export function Dropzone({ onChange, id }: DropzoneProps) {
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        acceptedFileTypes: ['image/png', 'images/jpg', 'image/jpeg'],
      },
      onDrop(acceptedFiles) {
        onChange(acceptedFiles)
      },
    })

  return (
    <div
      {...getRootProps()}
      data-accepted={isDragAccept}
      data-rejected={isDragReject}
      className="h-32 rounded-md data-[accepted=true]:border-emerald-500 data-[rejected=true]:border-red-500 w-full cursor-pointer border shadow-sm flex flex-col items-center justify-center gap-2 text-muted-foreground"
    >
      <input id={id} {...getInputProps()} />

      <UploadCloud />

      <div className="text-center">
        {isDragAccept && (
          <>
            <span>Drop your images.</span>
            <p className="text-sm">Images accepted</p>
          </>
        )}

        {isDragReject && (
          <>
            <span>Invalid files.</span>
            <p className="text-sm">Allowed extensions: .png, .jpg, .jpeg</p>
          </>
        )}

        {!isDragAccept && !isDragReject && (
          <>
            <span>Drag and drop your images here.</span>
            <p className="text-sm">Maximum size allowed: 5mb</p>
          </>
        )}
      </div>
    </div>
  )
}
