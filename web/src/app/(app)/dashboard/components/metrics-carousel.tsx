'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { MonthCanceledSalesAmountCard } from './month-canceled-sales-card';
import { MonthRevenueCard } from './month-revenue-card';
import { NewCustomersAmountCard } from './new-customers-amount-card';
import { TodaySalesAmountCard } from './today-sales-amount-card';

export function MetricsCarousel() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <MonthRevenueCard />
        </CarouselItem>

        <CarouselItem>
          <TodaySalesAmountCard />
        </CarouselItem>

        <CarouselItem>
          <MonthCanceledSalesAmountCard />
        </CarouselItem>

        <CarouselItem>
          <NewCustomersAmountCard />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}