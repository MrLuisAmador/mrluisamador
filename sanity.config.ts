import {deskTool} from 'sanity/desk'
import {schemaTypes} from './sanity/schemas'
import {visionTool} from '@sanity/vision'

export const config = {
  projectId: 'kuor2i8g',
  dataset: 'production',
  title: 'Admin',
  basePath: '/admin',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
}
