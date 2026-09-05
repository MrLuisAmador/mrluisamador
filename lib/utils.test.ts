import {describe, it, expect} from 'vitest'
import {cn} from './utils'

describe('cn utility', () => {
  it('should join multiple class names', () => {
    expect(cn('btn', 'btn-primary')).toBe('btn btn-primary')
  })

  it('should ignore falsy values', () => {
    expect(cn('btn', false && 'hidden', null, undefined, 'active')).toBe('btn active')
  })

  it('should merge conflicting tailwind classes properly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4')
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500')
  })

  it('should handle array and object inputs from clsx', () => {
    expect(cn(['foo', 'bar'], {'is-active': true, 'is-disabled': false})).toBe('foo bar is-active')
  })
})
