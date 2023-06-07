"use client"

import { NextStudio } from 'next-sanity/studio'
import { config } from '../../../sanity.config'

const StudiPage = () => {
    return (
      <>
        <NextStudio config={config} />
      </>
    )
}

export default StudiPage