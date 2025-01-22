'use client'

import {pluginGallery, pluginImage, quickStartViewerPlugins, RicosViewer} from '@wix/ricos'

const RichContentViewer = ({content}: {content: any}) => {
  const plugins = [...quickStartViewerPlugins(), pluginGallery(), pluginImage()]

  return <RicosViewer content={content} plugins={plugins} />
}

export default RichContentViewer
