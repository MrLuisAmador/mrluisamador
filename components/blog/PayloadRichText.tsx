import React from 'react'
import Image from 'next/image'

type LexicalNode = {
  type: string
  version: number
  children?: LexicalNode[]
  text?: string
  format?: number | string
  style?: string
  tag?: string
  url?: string
  fields?: {
    url?: string
    newTab?: boolean
    [key: string]: unknown
  }
  value?:
    | {
        url?: string
        alt?: string
        width?: number
        height?: number
      }
    | unknown
  [key: string]: unknown
}

type Props = {
  content: {
    root: LexicalNode
  }
  className?: string
}

const applyTextFormatting = (text: string, format: number) => {
  let element: React.ReactNode = text
  if (format & 1) element = <strong>{element}</strong>
  if (format & 2) element = <em>{element}</em>
  if (format & 4) element = <u>{element}</u>
  if (format & 8) element = <code>{element}</code>
  if (format & 16) element = <span className="align-sub text-xs">{element}</span>
  if (format & 32) element = <span className="align-super text-xs">{element}</span>
  return element
}

const INLINE_TYPES = new Set(['text', 'linebreak', 'link', 'autolink', 'tab'])

const renderLexicalNode = (node: LexicalNode, index: number): React.ReactNode => {
  let element: React.ReactNode = null

  if (node.type === 'text') {
    element = applyTextFormatting(node.text || '', (node.format as number) || 0)
  } else {
    const children = node.children?.map((child, i) => renderLexicalNode(child, i))

    switch (node.type) {
      case 'root':
        element = <div key="node-root">{children}</div>
        break
      case 'paragraph': {
        const hasBlockChildren = node.children?.some((child) => !INLINE_TYPES.has(child.type))
        const isEmpty =
          !node.children ||
          node.children.length === 0 ||
          (node.children.length === 1 && node.children[0].type === 'text' && !node.children[0].text)

        const content = isEmpty ? <br /> : children

        // Use <div> instead of <p> if paragraph contains block elements (e.g. upload images)
        // to prevent invalid HTML nesting (<p> cannot contain <div>) and hydration mismatches.
        if (hasBlockChildren) {
          element = <div className="mb-4">{content}</div>
        } else {
          element = <p className="mb-4">{content}</p>
        }
        break
      }
      case 'heading': {
        const Tag = (node.tag || 'h1') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        const headingClasses = {
          h1: 'text-4xl font-bold mb-6 font-title-font',
          h2: 'text-3xl font-bold mb-5 font-title-font',
          h3: 'text-2xl font-bold mb-4 font-title-font',
          h4: 'text-xl font-bold mb-3 font-title-font',
          h5: 'text-lg font-bold mb-2 font-title-font',
          h6: 'text-base font-bold mb-2 font-title-font',
        }
        element = (
          <Tag className={headingClasses[node.tag as keyof typeof headingClasses] || ''}>
            {children}
          </Tag>
        )
        break
      }
      case 'list': {
        const ListTag = node.tag === 'ol' ? 'ol' : 'ul'
        const listClass =
          node.tag === 'ol' ? 'list-decimal ml-6 mb-4 space-y-1' : 'list-disc ml-6 mb-4 space-y-1'
        element = <ListTag className={listClass}>{children}</ListTag>
        break
      }
      case 'listitem':
        element = <li>{children}</li>
        break
      case 'link':
      case 'autolink': {
        const fields = node.fields as {url?: string; newTab?: boolean} | undefined
        const href = fields?.url || node.url || '#'
        const isNewTab = fields?.newTab ?? true
        element = (
          <a
            href={href}
            target={isNewTab ? '_blank' : undefined}
            rel={isNewTab ? 'noopener noreferrer' : undefined}
            className="text-blue-600 hover:underline"
          >
            {children}
          </a>
        )
        break
      }
      case 'quote':
        element = (
          <blockquote className="mb-4 border-l-4 border-gray-300 pl-4 text-gray-700 italic">
            {children}
          </blockquote>
        )
        break
      case 'horizontalrule':
        element = <hr className="my-8 border-t border-gray-200" />
        break
      case 'linebreak':
        element = <br />
        break
      case 'tab':
        element = <span className="inline-block w-8">&nbsp;</span>
        break
      case 'upload': {
        const media = node.value as
          {url?: string; alt?: string; width?: number; height?: number} | undefined
        if (!media || typeof media === 'string' || !media.url) {
          element = null
        } else {
          element = (
            <div className="my-8 flex flex-col items-center">
              <Image
                src={media.url}
                alt={media.alt || ''}
                width={media.width || 800}
                height={media.height || 600}
                className="rounded-lg shadow-sm"
              />
              {media.alt && <span className="mt-2 text-sm text-gray-500 italic">{media.alt}</span>}
            </div>
          )
        }
        break
      }
      default:
        if (children && children.length > 0) {
          element = <span className="lexical-fallback">{children}</span>
        } else {
          element = null
        }
    }
  }

  if (element === null) return null
  return <React.Fragment key={`${node.type}-${index}`}>{element}</React.Fragment>
}

export default function PayloadRichText({content, className}: Props) {
  if (!content || !content.root) return null

  return (
    <div className={`payload-richtext ${className || ''}`}>
      {content.root.children?.map((node, i) => renderLexicalNode(node, i))}
    </div>
  )
}
