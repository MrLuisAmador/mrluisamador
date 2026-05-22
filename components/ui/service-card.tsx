import * as React from 'react'

export function ServiceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-start bg-white p-8 rounded-2xl border border-border-subtle shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 ease-out">
      <div className="h-12 w-12 flex items-center justify-center p-2.5 bg-surface-container rounded-lg text-primary-red mb-6">
        <Icon />
      </div>
      <h3 className="font-title-font text-xl font-semibold text-surface-charcoal mb-3">
        {title}
      </h3>
      <p className="font-text-font text-text-muted text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}
