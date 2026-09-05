import {z} from 'zod'

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, {message: 'Name must be at least 2 characters long.'}),
  email: z.string().trim().email({message: 'Please enter a valid email.'}),
  message: z.string().trim().min(10, {message: 'Message must be at least 10 characters long.'}),
})
