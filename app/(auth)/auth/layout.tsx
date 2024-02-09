import { Tab, TabList, TabPanel, Tabs } from '@/ui/tabs'
import React from 'react'

export const metadata = {
  description: 'Brainleap: An e-learning platform for the modern age.',
}

export default function AuthTabsLayout({ tabs }: { tabs: React.ReactNode }) {
  return (
    <div className="h-dvh grid place-items-center">
      <div className="flex flex-col gap-2">
        <Tabs>
          <TabList className='grid grid-cols-2'>
            <Tab href="/auth/signin">Sign In</Tab>
            <Tab href="/auth/signup">Sign Up</Tab>
          </TabList>
          <TabPanel className="max-w-96">{tabs}</TabPanel>
        </Tabs>
      </div>
    </div>
  )
}
