'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { api } from '@/lib/axios'
import { useAuth } from '@clerk/nextjs'
import { useEffect } from 'react'
import { MonthCanceledSalesAmountCard } from './month-canceled-sales-card'
import { MonthRevenueCard } from './month-revenue-card'
import { NewCustomersAmountCard } from './new-customers-amount-card'
import { TodaySalesAmountCard } from './today-sales-amount-card'

export function MetricsCarousel() {
  const { getToken } = useAuth()

  useEffect(() => {
    const loadData = async function () {
      const res = await api.get('/employees', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      })

      console.log(res.data)
    }

    loadData()
  }, [getToken])

  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="basis-[75%]">
          <MonthRevenueCard />
        </CarouselItem>

        <CarouselItem className="basis-[75%]">
          <TodaySalesAmountCard />
        </CarouselItem>

        <CarouselItem className="basis-[75%]">
          <MonthCanceledSalesAmountCard />
        </CarouselItem>

        <CarouselItem className="basis-[75%]">
          <NewCustomersAmountCard />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
