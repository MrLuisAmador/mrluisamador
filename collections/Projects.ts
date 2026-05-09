import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'filter', 'orderId'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'filter',
      type: 'text', // Keeping as text for flexibility, but could be a select
      required: true,
      admin: {
        description: "The category tag (e.g., 'React', 'Magento', 'Next.js')",
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        description: 'External link to the project',
      },
    },
    {
      name: 'orderId',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Used for manual sorting (lower numbers first)',
      },
    },
  ],
}
