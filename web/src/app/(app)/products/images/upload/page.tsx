import { UploadProductImagesContent } from '../../components/upload-product-images-content'

export default function UploadProductImages() {
  return (
    <section className="relative min-h-screen space-y-8 p-6 max-w-6xl w-full mx-auto">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Product Images</h1>
        <span className="block text-muted-foreground">
          Upload images to your products.
        </span>
      </div>

      <UploadProductImagesContent />
    </section>
  )
}
