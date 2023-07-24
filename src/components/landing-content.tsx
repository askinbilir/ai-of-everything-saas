import React from 'react'

import { TESTIMONIALS } from '@/constants/testimonials'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'

export default function LandingContent() {
  return (
    <div className="px-10 pb-20">
      <p className="mb-10 text-center text-4xl font-extrabold text-primary">
        Testimonials
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {TESTIMONIALS.map((item, index) => (
          <Card
            key={index}
            className="border-none bg-slate-50 text-primary dark:bg-slate-800"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-slate-200 dark:bg-slate-600">
                    {item.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="px-0 pt-4">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
