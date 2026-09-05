import {describe, it, expect, vi, beforeEach} from 'vitest'
import {hubspotAction} from './hubspotAction'
import * as recaptchaModule from '@/lib/google/verifyRecaptcha'

vi.mock('@/lib/google/verifyRecaptcha', () => ({
  verifyRecaptcha: vi.fn(),
}))

describe('hubspotAction', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return validation errors for invalid form inputs', async () => {
    const formData = new FormData()
    formData.append('name', 'A') // Too short
    formData.append('email', 'not-valid')
    formData.append('message', 'Short')

    const result = await hubspotAction({success: false}, formData)

    expect(result.success).toBe(false)
    expect(result.errors?.name).toBeDefined()
    expect(result.errors?.email).toBeDefined()
    expect(result.errors?.message).toBeDefined()
  })

  it('should return error if reCAPTCHA token is missing', async () => {
    const formData = new FormData()
    formData.append('name', 'Luis Amador')
    formData.append('email', 'luis@example.com')
    formData.append('message', 'Valid message content for the contact form.')

    const result = await hubspotAction({success: false}, formData)

    expect(result.success).toBe(false)
    expect(result.errors?.recaptcha).toContain('reCAPTCHA token is missing. Please try again.')
  })

  it('should return error if reCAPTCHA verification fails', async () => {
    vi.spyOn(recaptchaModule, 'verifyRecaptcha').mockResolvedValue(false)

    const formData = new FormData()
    formData.append('name', 'Luis Amador')
    formData.append('email', 'luis@example.com')
    formData.append('message', 'Valid message content for the contact form.')
    formData.append('recaptchaToken', 'invalid-token')

    const result = await hubspotAction({success: false}, formData)

    expect(result.success).toBe(false)
    expect(result.errors?.recaptcha).toContain('reCAPTCHA verification failed. Please try again.')
  })

  it('should successfully submit form and split name into first and last name', async () => {
    vi.spyOn(recaptchaModule, 'verifyRecaptcha').mockResolvedValue(true)

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    })
    global.fetch = fetchMock

    const formData = new FormData()
    formData.append('name', 'Luis Amador')
    formData.append('email', 'luis@example.com')
    formData.append('message', 'Valid message content for the contact form.')
    formData.append('recaptchaToken', 'valid-token')

    const result = await hubspotAction({success: false}, formData)

    expect(result.success).toBe(true)
    expect(result.errors).toBeUndefined()

    expect(fetchMock).toHaveBeenCalledTimes(1)
    const callBody = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(callBody.fields).toEqual([
      {name: 'email', value: 'luis@example.com'},
      {name: 'firstname', value: 'Luis'},
      {name: 'lastname', value: 'Amador'},
      {name: 'message', value: 'Valid message content for the contact form.'},
    ])
  })

  it('should handle single-word names gracefully', async () => {
    vi.spyOn(recaptchaModule, 'verifyRecaptcha').mockResolvedValue(true)

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({}),
    })
    global.fetch = fetchMock

    const formData = new FormData()
    formData.append('name', 'Cher')
    formData.append('email', 'cher@example.com')
    formData.append('message', 'Valid message content for the contact form.')
    formData.append('recaptchaToken', 'valid-token')

    const result = await hubspotAction({success: false}, formData)

    expect(result.success).toBe(true)
    const callBody = JSON.parse(fetchMock.mock.calls[0][1].body)
    expect(callBody.fields).toEqual([
      {name: 'email', value: 'cher@example.com'},
      {name: 'firstname', value: 'Cher'},
      {name: 'lastname', value: ''},
      {name: 'message', value: 'Valid message content for the contact form.'},
    ])
  })

  it('should return server error if HubSpot API call fails', async () => {
    vi.spyOn(recaptchaModule, 'verifyRecaptcha').mockResolvedValue(true)

    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Internal Server Error',
      json: vi.fn().mockResolvedValue({message: 'Failed to submit'}),
    })
    global.fetch = fetchMock

    const formData = new FormData()
    formData.append('name', 'Luis Amador')
    formData.append('email', 'luis@example.com')
    formData.append('message', 'Valid message content for the contact form.')
    formData.append('recaptchaToken', 'valid-token')

    const result = await hubspotAction({success: false}, formData)

    expect(result.success).toBe(false)
    expect(result.errors?.server).toBeDefined()
  })
})
