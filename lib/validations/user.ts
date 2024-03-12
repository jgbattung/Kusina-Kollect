import * as z from 'zod'

export const UserValidation = z.object({
  username: z.string().min(1).max(30),
  name: z.string().min(0).max(70),
  profile_photo: z.string().url().min(1),
})