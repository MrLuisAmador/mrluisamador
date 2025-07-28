'use client'

import {
  pluginGallery,
  pluginImage,
  quickStartViewerPlugins,
  RicosViewer,
  pluginDivider,
  pluginCodeBlock,
  pluginTable,
  RichContent,
} from '@wix/ricos'

interface RichContentViewerProps {
  content: RichContent
}

const RichContentViewer = ({content}: RichContentViewerProps) => {
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
