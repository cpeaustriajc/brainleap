import { createClient } from '@/lib/supabase/static'
import { Tab, TabItem, TabList, TabPanel, Tabs } from '@/ui/tabs'
import React from 'react'

export async function generateStaticParams() {
  const supabase = createClient()

  const { data, error } = await supabase.from('courses').select('course_id')

  if (error) throw new Error(`${error.message}`)

  return data.map(id => ({
    params: {
      id,
    },
  }))
}

export default function CourseLayout({
  tabs,
  params,
}: { tabs: React.ReactNode; params: { id: string } }) {
  return (
    <React.Fragment>
      <Tabs>
        <TabList>
          <Tab href={`/course/${params.id}`}>Announcements</Tab>
          <Tab href={`/course/${params.id}/assignments`}>Assignments</Tab>
          <Tab href={`/course/${params.id}/grades`}>Grades</Tab>
          <Tab href={`/course/${params.id}/people`}>People</Tab>
        </TabList>
        <TabPanel>{tabs}</TabPanel>
      </Tabs>
    </React.Fragment>
  )
}
