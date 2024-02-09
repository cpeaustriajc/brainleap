import { Card } from '@/ui/card'
import { Tab, TabList, TabPanel, Tabs } from '@/ui/tabs'
import React from 'react'

export default function AuthTabsLayout({ tabs }: { tabs: React.ReactNode }) {
  return (
    <div className="h-dvh grid place-items-center">
      <div className='flex flex-col gap-2'>
        <Tabs>
          <TabList>
            <Tab href="/auth/signin">Sign In</Tab>
            <Tab href="/auth/signup">Sign Up</Tab>
          </TabList>
          <TabPanel>{tabs}</TabPanel>
        </Tabs>
      </div>
    </div>
  )
}
