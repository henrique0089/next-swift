'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { NavLink } from './nav-link'

export function ProductsNavigationMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <NavLink href="/products">Products</NavLink>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <NavLink
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/products/categories"
                  >
                    <div className="text-sm font-medium leading-none">
                      Add Categories
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Add categories to a product present in your catalog.
                    </p>
                  </NavLink>
                </NavigationMenuLink>
              </li>

              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <NavLink
                    className="flex h-full w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/products/images/remove"
                  >
                    <div className="text-sm font-medium leading-none">
                      Remove Images
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Remove images from a product present in your catalog.
                    </p>
                  </NavLink>
                </NavigationMenuLink>
              </li>

              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <NavLink
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/products/images/upload"
                  >
                    <div className="text-sm font-medium leading-none">
                      Upload Images
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Upload new images to a product present in your catalog.
                    </p>
                  </NavLink>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
