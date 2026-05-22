import {z} from 'zod'

export const ContactFormSchema = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters long.'}).trim(),
  email: z.string().email({message: 'Please enter a valid email.'}).trim(),
  subject: z.string().min(1, {message: 'Please select a subject.'}).trim(),
  message: z.string().min(10, {message: 'Message must be at least 10 characters long.'}).trim(),
})

export type ContactFormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        subject?: string[]
        message?: string[]
      }
      name?: string
      email?: string
      subject?: string
      message?: string
    }
  | undefined
