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
    <div className="self-center bg-white px-4 py-2 md:self-end md:px-16 md:py-5">
      <div>
        <Icon />
      </div>
      <p className="pt-5 pb-5 md:pt-12">
        <span className="block text-center">{title}</span>
        <span className="block text-center">{description}</span>
      </p>
    </div>
  )
}
