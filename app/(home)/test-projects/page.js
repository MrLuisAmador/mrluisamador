'use client'

import Link from 'next/link'
import Cookies from 'js-cookie'
import {useEffect, useState} from 'react'
import {WixMediaImage} from '../../../wix/WixMediaImage'

import {createClient, OAuthStrategy} from '@wix/sdk'
import {items} from '@wix/data'

const myWixClient = createClient({
  modules: {items},
  auth: OAuthStrategy({
    clientId: `312abd61-1633-44b4-8892-0c2b2ad8ef9b`,
    tokens: JSON.parse(Cookies.get('session') || null),
  }),
})

export default function Examples() {
  const [projects, setProjects] = useState([])

  async function fetchExamples() {
    const projects = await myWixClient.items
      .queryDataItems({dataCollectionId: 'projectGallery'})
      .ascending('orderId')
      .find()
    setProjects(projects.items)
    console.log(projects.items)
  }

  useEffect(() => {
    fetchExamples()
  }, [])

  return (
    <div>
      {projects.map((project) => (
        <div key={project._id} className="h-[320px] relative">
          {/* <img
            src="https://wix:image://v1/7ae78d_d6a0edf48777407d9aa78fa5718b9a70~mv2.webp/gme-healthquest-800x389.webp#originWidth=800&originHeight=389"
            alt={project.data.platform}
          /> */}
          <h2>Platorm: {project.data.title}</h2>
          <WixMediaImage
            media={project.data.image}
            alt={project.data.title}
            objectFit="contain"
            // disableZoom={true}
          />
          {/* <a href={project.data.projectUrl}>Click Me</a> */}
        </div>
      ))}
    </div>
  )
}
