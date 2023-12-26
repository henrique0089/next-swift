'use client'

import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const categories = ['all', 't-shirts', 'shoes', 'black-shoes', 'white-shoes', 'blue-pants', 'orange t-shirts', 't-shirts-2', 'shoes-2', 'black-shoes-2', 'white-shoes-2', 'blue-pants-2', 'orange t-shirts-2']

export function CategoriesCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        {categories.map((categorie) => (
          <CarouselItem key={categorie} className="basis-1/3 lg:basis-1/6">
            <Button className="min-w-20 w-full" variant={categories[0] === categorie ? 'default' : 'secondary'}>{categorie}</Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}