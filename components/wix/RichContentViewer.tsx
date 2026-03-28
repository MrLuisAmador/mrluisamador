'use client'

import {
  pluginGalleryViewer,
  pluginImageViewer,
  quickStartViewerPlugins,
  RicosViewer,
  pluginDividerViewer,
  pluginCodeBlockViewer,
  pluginTableViewer,
  RichContent,
} from '@wix/ricos'

interface RichContentViewerProps {
  content: RichContent
}

const RichContentViewer = ({content}: RichContentViewerProps) => {
  const plugins = [
    ...quickStartViewerPlugins(),
    pluginGalleryViewer(),
    pluginImageViewer(),
    pluginDividerViewer(),
    pluginCodeBlockViewer(),
    pluginTableViewer(),
  ]

  return <RicosViewer content={content} plugins={plugins} />
}

export default RichContentViewer
