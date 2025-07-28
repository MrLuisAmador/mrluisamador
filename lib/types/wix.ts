// Wix Data Item Base Type (matches the structure returned by Wix SDK)
export interface WixDataItem {
  _id: string
  _createdDate?: Date
  _updatedDate?: Date
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any // Allow additional properties
}

// Wix Project Types (extending the base WixDataItem)
export interface Project extends WixDataItem {
  title: string
  filter: string
  image: string
  url: string
  orderId?: number
}

// Wix Blog Post Types (extending the base WixDataItem)
export interface WixBlogPost extends WixDataItem {
  title: string
  slug: string
  description: string
  content: string
  image: string
  publishedAt: string
  categoryIds: string[]
  tagIds: string[]
  featured: boolean
  pinned: boolean
  commentingEnabled: boolean
  minutesToRead: number
  language: string
  memberId?: string
  contactId?: string
  contentText?: string
  excerpt?: string
  hashtags: string[]
  heroImage?: string
  hasUnpublishedChanges: boolean
  preview: boolean
  pricingPlanIds: string[]
  referenceId?: string
  relatedPostIds: string[]
  translationId?: string
  url?: string
  richContent?: RichContent
  seoData?: SeoSchema
  media?: Media
  moderationDetails?: ModerationDetails
  mostRecentContributorId?: string
  contentId?: string
}

// Rich Content Types (using Ricos library types)
export interface RichContent {
  documentStyle?: DocumentStyle
  metadata: Metadata
  nodes: Node[]
}

export interface Metadata {
  _id: string
  version: number
}

export interface Node {
  id: string
  nodes?: Node[]
  style?: NodeStyle
  type: NodeType
  // Add other node-specific data properties as needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appEmbedData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  audioData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blockquoteData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bulletedListData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  captionData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  codeBlockData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  collapsibleListData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dividerData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  embedData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  externalData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fileData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  galleryData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gifData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headingData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  htmlData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  layoutCellData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  linkPreviewData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mapData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  orderedListData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  paragraphData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pollData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableCellData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tableData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  textData?: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  videoData?: any
}

export type NodeType =
  | 'APP_EMBED'
  | 'AUDIO'
  | 'BLOCKQUOTE'
  | 'BULLETED_LIST'
  | 'BUTTON'
  | 'CAPTION'
  | 'CODE_BLOCK'
  | 'COLLAPSIBLE_ITEM'
  | 'COLLAPSIBLE_ITEM_BODY'
  | 'COLLAPSIBLE_ITEM_TITLE'
  | 'COLLAPSIBLE_LIST'
  | 'DIVIDER'
  | 'EMBED'
  | 'EXTERNAL'
  | 'FILE'
  | 'GALLERY'
  | 'GIF'
  | 'HEADING'
  | 'HTML'
  | 'IMAGE'
  | 'LAYOUT'
  | 'LAYOUT_CELL'
  | 'LINK_PREVIEW'
  | 'LIST_ITEM'
  | 'MAP'
  | 'ORDERED_LIST'
  | 'PARAGRAPH'
  | 'POLL'
  | 'TABLE'
  | 'TABLE_CELL'
  | 'TABLE_ROW'
  | 'TEXT'
  | 'VIDEO'

export interface NodeStyle {
  backgroundColor?: string
  paddingBottom?: string
  paddingTop?: string
}

export interface DocumentStyle {
  blockquote?: TextNodeStyle
  codeBlock?: TextNodeStyle
  headerFive?: TextNodeStyle
  headerFour?: TextNodeStyle
  headerOne?: TextNodeStyle
  headerSix?: TextNodeStyle
  headerThree?: TextNodeStyle
  headerTwo?: TextNodeStyle
  paragraph?: TextNodeStyle
}

export interface TextNodeStyle {
  decorations?: Decoration[]
  lineHeight?: string
  nodeStyle?: NodeStyle
}

export interface Decoration {
  type: DecorationType
  anchorData?: AnchorData
  colorData?: ColorData
  fontSizeData?: FontSizeData
  fontWeightValue?: number
  italicData?: boolean
  linkData?: LinkData
  mentionData?: MentionData
  spoilerData?: SpoilerData
  underlineData?: boolean
}

export type DecorationType =
  | 'ANCHOR'
  | 'BOLD'
  | 'COLOR'
  | 'EXTERNAL'
  | 'FONT_SIZE'
  | 'ITALIC'
  | 'LINK'
  | 'MENTION'
  | 'SPOILER'
  | 'UNDERLINE'

export interface AnchorData {
  anchor: string
}

export interface ColorData {
  background?: string
  foreground?: string
}

export interface FontSizeData {
  unit: FontType
  value: number
}

export type FontType = 'EM' | 'PX'

export interface LinkData {
  link: Link
}

export interface Link {
  customData?: string
  rel?: Rel
  target?: Target
  anchor?: string
  url?: string
}

export interface Rel {
  nofollow?: boolean
  noreferrer?: boolean
  sponsored?: boolean
  ugc?: boolean
}

export type Target = 'BLANK' | 'PARENT' | 'SELF' | 'TOP'

export interface MentionData {
  id: string
  name: string
  slug: string
}

export interface SpoilerData {
  id: string
}

// Media Types
export interface Media {
  altText?: string
  custom?: boolean
  displayed?: boolean
  embedMedia?: EmbedMedia
  wixMedia?: WixMedia
}

export interface EmbedMedia {
  thumbnail?: EmbedThumbnail
  video?: EmbedVideo
}

export interface EmbedThumbnail {
  height: number
  url: string
  width: number
}

export interface EmbedVideo {
  height: number
  url: string
  width: number
}

export interface WixMedia {
  image?: string
  videoV2?: string
}

// SEO Types
export interface SeoSchema {
  settings?: Settings
  tags?: Tag[]
}

export interface Settings {
  keywords?: Keyword[]
  preventAutoRedirect?: boolean
}

export interface Keyword {
  isMain: boolean
  origin: string
  term: string
}

export interface Tag {
  children?: string
  custom?: boolean
  disabled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: Record<string, any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props?: Record<string, any>
  type: string
}

// Moderation Types
export interface ModerationDetails {
  moderatedBy?: string
  moderationDate?: Date
  status: ModerationStatusStatus
  submittedBy?: string
  submittedDate?: Date
}

export type ModerationStatusStatus = 'APPROVED' | 'REJECTED' | 'UNKNOWN'

// Wix Query Result Types (using official types)
export type WixQueryResult<T> = {
  items: T[]
  cursors?: Cursors
  length: number
  pageSize: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  query: any
}

export interface Cursors {
  next?: string
  prev?: string
}

// Wix Blog Query Result
export type WixBlogQueryResult = WixQueryResult<WixBlogPost>

// Wix Project Query Result
export type WixProjectQueryResult = WixQueryResult<Project>

// Global AdSense types
declare global {
  interface Window {
    adsbygoogle: Array<Record<string, never>>
  }
}
