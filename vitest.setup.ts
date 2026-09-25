import '@testing-library/jest-dom/vitest'
import {cleanup} from '@testing-library/react'
import {afterEach, vi} from 'vitest'
import React from 'react'

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react')>()
  return {
    ...actual,
    ViewTransition:
      actual.ViewTransition ||
      function ViewTransition({children}: {children?: React.ReactNode}) {
        return children ?? null
      },
  }
})

afterEach(() => {
  cleanup()
})
