import React from 'react'
import Image from 'next/image'

type LexicalNode = {
  type: string
  version: number
  children?: LexicalNode[]
  text?: string
  format?: number
  style?: string
  tag?: string
  url?: string
  value?: any // For upload nodes
  [key: string]: any
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

const renderLexicalNode = (node: LexicalNode, index: number): React.ReactNode => {
  let element: React.ReactNode = null

  if (node.type === 'text') {
    element = applyTextFormatting(node.text || '', node.format || 0)
  } else {
    const children = node.children?.map((child, i) => renderLexicalNode(child, i))

    switch (node.type) {
      case 'root':
        element = <div key="node-root">{children}</div>
        break
      case 'paragraph':
        element = <p className="mb-4">{children}</p>
        break
      case 'heading':
        const Tag = node.tag as keyof JSX.IntrinsicElements
        const headingClasses = {
          h1: 'text-4xl font-bold mb-6 font-title-font',
          h2: 'text-3xl font-bold mb-5 font-title-font',
          h3: 'text-2xl font-bold mb-4 font-title-font',
          h4: 'text-xl font-bold mb-3 font-title-font',
          h5: 'text-lg font-bold mb-2 font-title-font',
          h6: 'text-base font-bold mb-2 font-title-font',
        }
        element = <Tag className={headingClasses[node.tag as keyof typeof headingClasses] || ''}>{children}</Tag>
        break
      case 'list':
        const ListTag = node.tag === 'ol' ? 'ol' : 'ul'
        const listClass = node.tag === 'ol' ? 'list-decimal ml-6 mb-4 space-y-1' : 'list-disc ml-6 mb-4 space-y-1'
        element = <ListTag className={listClass}>{children}</ListTag>
        break
      case 'listitem':
        element = <li>{children}</li>
        break
      case 'link':
        element = (
          <a href={node.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {children}
          </a>
        )
        break
      case 'quote':
        element = <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4 text-gray-700">{children}</blockquote>
        break
      case 'horizontalrule':
        element = <hr className="my-8 border-t border-gray-200" />
        break
      case 'linebreak':
        element = <br />
        break
      case 'upload':
        const media = node.value
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
              {media.alt && (
                <span className="mt-2 text-sm text-gray-500 italic">{media.alt}</span>
              )}
            </div>
          )
        }
        break
      default:
        if (children && children.length > 0) {
          element = <div>{children}</div>
        } else {
          element = null
        }
    }
  }

  return <React.Fragment key={`${node.type}-${index}`}>{element}</React.Fragment>
}

export default function PayloadRichText({ content, className }: Props) {
  if (!content || !content.root) return null

  // Forced version check for user
  console.log('PayloadRichText Rendering v3 (explicit-node-keys)')

  return (
    <div className={`payload-richtext ${className || ''}`}>
      {content.root.children?.map((node, i) => renderLexicalNode(node, i))}
    </div>
  )
}
