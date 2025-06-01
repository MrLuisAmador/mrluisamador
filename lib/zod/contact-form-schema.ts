import {z} from 'zod'

export const ContactFormSchema = z.object({
  email: z.string().email({message: 'Please enter a valid email.'}).trim(),
  message: z.string().min(10, {message: 'Message must be at least 10 characters long.'}).trim(),
})

export type ContactFormState =
  | {
      errors?: {
        email?: string[]
        message?: string[]
      }
      email?: string
      message?: string
    }
  | undefined
