import {describe, it, expect} from 'vitest'
import {render, screen} from '@testing-library/react'
import PayloadRichText from './PayloadRichText'

describe('PayloadRichText Component', () => {
  it('renders standard text paragraphs inside a <p> tag', () => {
    const content = {
      root: {
        type: 'root',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'This is a normal paragraph.',
                format: 0,
              },
            ],
          },
        ],
      },
    }

    const {container} = render(<PayloadRichText content={content} />)
    const p = container.querySelector('p')
    expect(p).toBeInTheDocument()
    expect(p).toHaveTextContent('This is a normal paragraph.')
  })

  it('renders paragraphs containing block nodes (like upload) as <div> to prevent invalid HTML nesting and hydration errors', () => {
    const content = {
      root: {
        type: 'root',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'upload',
                version: 1,
                value: {
                  url: '/media/test.jpg',
                  alt: 'Test Alt',
                  width: 800,
                  height: 600,
                },
              },
            ],
          },
        ],
      },
    }

    const {container} = render(<PayloadRichText content={content} />)
    // Should NOT contain a <p> tag wrapping the <div> (which triggers hydration mismatch)
    expect(container.querySelector('p')).toBeNull()
    const img = screen.getByRole('img', {name: 'Test Alt'})
    expect(img).toBeInTheDocument()
  })

  it('handles empty paragraphs safely by rendering a line break', () => {
    const content = {
      root: {
        type: 'root',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [],
          },
        ],
      },
    }

    const {container} = render(<PayloadRichText content={content} />)
    const p = container.querySelector('p')
    expect(p).toBeInTheDocument()
    expect(p?.querySelector('br')).toBeInTheDocument()
  })

  it('renders autolink and link nodes as <a> tags', () => {
    const content = {
      root: {
        type: 'root',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'autolink',
                version: 1,
                fields: {
                  url: 'https://example.com',
                  newTab: true,
                },
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Visit Example',
                  },
                ],
              },
            ],
          },
        ],
      },
    }

    render(<PayloadRichText content={content} />)
    const link = screen.getByRole('link', {name: 'Visit Example'})
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('applies formatting flags correctly (bold, italic, code)', () => {
    const content = {
      root: {
        type: 'root',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Bold Text',
                format: 1, // bold
              },
              {
                type: 'text',
                version: 1,
                text: 'Italic Text',
                format: 2, // italic
              },
              {
                type: 'text',
                version: 1,
                text: 'Code Text',
                format: 8, // code
              },
            ],
          },
        ],
      },
    }

    const {container} = render(<PayloadRichText content={content} />)
    expect(container.querySelector('strong')).toHaveTextContent('Bold Text')
    expect(container.querySelector('em')).toHaveTextContent('Italic Text')
    expect(container.querySelector('code')).toHaveTextContent('Code Text')
  })
})
