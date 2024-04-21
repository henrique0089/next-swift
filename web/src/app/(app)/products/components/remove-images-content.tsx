'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { api } from '@/lib/axios'
import { formatDate } from '@/utils/format-date'
import { useAuth } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { DeleteImageButton } from './delete-image-button'

const searchProductImagesFormSchema = z.object({
  search: z.string(),
})

type SearchProductImagesFormValues = z.infer<
  typeof searchProductImagesFormSchema
>

export type ImageData = {
  id: string
  url: string
  productId: string
  createdAt: Date
}

export function RemoveImagesContent() {
  const [images, setImages] = useState<ImageData[]>([])
  const { getToken } = useAuth()

  const { handleSubmit, register, reset } =
    useForm<SearchProductImagesFormValues>({
      resolver: zodResolver(searchProductImagesFormSchema),
    })

  async function handleSearchProductImages({
    search,
  }: SearchProductImagesFormValues) {
    const res = await api.get<{ images: ImageData[] }>('/products/images', {
      params: {
        productName: search,
      },
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })

    reset()

    setImages(res.data.images)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] lg:items-start space-y-8 lg:space-y-0 lg:space-x-4">
      <nav>
        <form
          onSubmit={handleSubmit(handleSearchProductImages)}
          className="space-y-2"
        >
          <Label htmlFor="search-products">Search by any product</Label>
          <Input
            id="search-products"
            placeholder="white t-shirt..."
            {...register('search')}
          />
        </form>
      </nav>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {images.map((img) => (
            <TableRow key={img.id}>
              <TableCell>{img.id}</TableCell>
              <TableCell>
                <Image src={img.url} alt={img.url} width={30} height={30} />
              </TableCell>
              <TableCell>{img.productId}</TableCell>
              <TableCell>{formatDate(img.createdAt)}</TableCell>
              <TableCell>
                <DeleteImageButton
                  images={images}
                  setImages={setImages}
                  productId={img.productId}
                  imageId={img.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
