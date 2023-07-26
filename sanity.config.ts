import { defineConfig } from "sanity"
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './sanity/schemas'
import {visionTool} from '@sanity/vision'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

const config = defineConfig({
  name: "Luis_Amador_Sanity_Studio",
  title: 'Luis Amador Sanity Studio',
  basePath: '/studio',

  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

export default config
