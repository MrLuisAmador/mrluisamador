import {describe, it, expect} from 'vitest'
import {render, screen, fireEvent} from '@testing-library/react'
import ProjectList from './ProjectList'
import {Project as PayloadProject} from '@/payload-types'

const mockProjects: PayloadProject[] = [
  {
    id: 1,
    title: 'Next.js E-Commerce',
    filter: 'Next.js',
    url: 'https://example.com/ecommerce',
    image: 1,
    description: 'A modern e-commerce platform built with Next.js.',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'AI Workflow Engine',
    filter: 'AI Engineering',
    url: 'https://example.com/ai',
    image: 2,
    description: 'Agentic AI workflow system.',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 3,
    title: 'Wix Enterprise Portal',
    filter: 'Wix',
    url: 'https://example.com/wix',
    image: 3,
    description: 'Custom Wix enterprise implementation.',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
]

describe('ProjectList Component', () => {
  it('should render all filter buttons dynamically based on project data', () => {
    render(<ProjectList projects={mockProjects} />)

    expect(screen.getByRole('button', {name: /All Projects/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /Next\.js/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /AI Engineering/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /Wix/i})).toBeInTheDocument()
  })

  it('should display all projects by default', () => {
    render(<ProjectList projects={mockProjects} />)

    expect(screen.getByText('Next.js E-Commerce')).toBeInTheDocument()
    expect(screen.getByText('AI Workflow Engine')).toBeInTheDocument()
    expect(screen.getByText('Wix Enterprise Portal')).toBeInTheDocument()
  })

  it('should filter projects when a category button is clicked', () => {
    render(<ProjectList projects={mockProjects} />)

    const aiButton = screen.getByRole('button', {name: /AI Engineering/i})
    fireEvent.click(aiButton)

    expect(screen.getByText('AI Workflow Engine')).toBeInTheDocument()
    expect(screen.queryByText('Next.js E-Commerce')).not.toBeInTheDocument()
    expect(screen.queryByText('Wix Enterprise Portal')).not.toBeInTheDocument()
  })

  it('should return to showing all projects when "All Projects" is clicked', () => {
    render(<ProjectList projects={mockProjects} />)

    fireEvent.click(screen.getByRole('button', {name: /AI Engineering/i}))
    expect(screen.queryByText('Next.js E-Commerce')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', {name: /All Projects/i}))
    expect(screen.getByText('Next.js E-Commerce')).toBeInTheDocument()
    expect(screen.getByText('AI Workflow Engine')).toBeInTheDocument()
  })

  it('should display empty message when no projects match', () => {
    render(<ProjectList projects={[]} />)

    expect(screen.getByText(/No projects found for this category/i)).toBeInTheDocument()
  })
})
