import * as z from 'zod'

export const UserValidation = z.object({
  username: z.string()
    .min(1, { message: 'Username is required.' })
    .max(30, { message: 'Username must be 30 characters or fewer.' }),
  name: z.string().min(0).max(70, { message: 'Name must be 70 characters or fewer.' }),
  profile_photo: z.string().url().min(1),
})