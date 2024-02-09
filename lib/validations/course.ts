import { z } from 'zod'

export const courseSchema = z.object({
  title: z.string(),
  description: z.string(),
  section: z.string(),
  subject: z.string(),
  room: z.string(),
})

export const joinCourseSchema = z.object({
  courseCode: z.string(),
})
