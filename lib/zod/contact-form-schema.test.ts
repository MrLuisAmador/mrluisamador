import {describe, it, expect} from 'vitest'
import {ContactFormSchema} from './contact-form-schema'

describe('ContactFormSchema', () => {
  it('should accept valid contact form data', () => {
    const validData = {
      name: 'Luis Amador',
      email: 'luis@example.com',
      message: 'Hello, I would like to discuss a project with you.',
    }

    const result = ContactFormSchema.safeParse(validData)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Luis Amador')
      expect(result.data.email).toBe('luis@example.com')
    }
  })

  it('should trim surrounding whitespace from fields', () => {
    const dataWithWhitespace = {
      name: '  Luis Amador  ',
      email: '  luis@example.com  ',
      message: '  This is a trimmed message exceeding ten chars.  ',
    }

    const result = ContactFormSchema.safeParse(dataWithWhitespace)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Luis Amador')
      expect(result.data.email).toBe('luis@example.com')
      expect(result.data.message).toBe('This is a trimmed message exceeding ten chars.')
    }
  })

  it('should fail if name is less than 2 characters', () => {
    const result = ContactFormSchema.safeParse({
      name: 'A',
      email: 'luis@example.com',
      message: 'Valid message exceeding ten characters.',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toContain(
        'Name must be at least 2 characters long.'
      )
    }
  })

  it('should fail if email is invalid', () => {
    const result = ContactFormSchema.safeParse({
      name: 'Luis',
      email: 'not-an-email',
      message: 'Valid message exceeding ten characters.',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toContain('Please enter a valid email.')
    }
  })

  it('should fail if message is less than 10 characters', () => {
    const result = ContactFormSchema.safeParse({
      name: 'Luis',
      email: 'luis@example.com',
      message: 'Short',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toContain(
        'Message must be at least 10 characters long.'
      )
    }
  })

  it('should fail if required fields are missing', () => {
    const result = ContactFormSchema.safeParse({})
    expect(result.success).toBe(false)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      expect(fieldErrors.name).toBeDefined()
      expect(fieldErrors.email).toBeDefined()
      expect(fieldErrors.message).toBeDefined()
    }
  })
})
