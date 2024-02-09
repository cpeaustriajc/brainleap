import { z } from 'zod'

export const outputSchema = z.object({
  file: z.custom<File>(),
})

export const gradeSchema = z.object({
  grade: z
    .number()
    .or(
      z.string().transform((grade, ctx) => {
        const parsed = parseInt(grade)
        if (Number.isNaN(parsed)) {
          ctx.addIssue({
            code: z.ZodIssueCode.invalid_type,
            expected: 'number',
            received: typeof grade,
            path: [],
            message: 'Grade must be a number',
          })
          return z.NEVER
        }

        return parsed
      }),
    )
    .pipe(z.number().min(0).max(100)),
})
