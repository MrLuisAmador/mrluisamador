'use client'

import {
  pluginGallery,
  pluginImage,
  quickStartViewerPlugins,
  RicosViewer,
  pluginDivider,
  pluginCodeBlock,
  pluginTable,
} from '@wix/ricos'

const RichContentViewer = ({content}: {content: any}) => {
  const plugins = [
    ...quickStartViewerPlugins(),
    pluginGallery(),
    pluginImage(),
    pluginDivider(),
    pluginCodeBlock(),
    pluginTable(),
  ]

  return <RicosViewer content={content} plugins={plugins} />
}

export default RichContentViewer
