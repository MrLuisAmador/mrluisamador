# Implementation Plan: PayloadCMS Blog

## Plan
1. **Rich Text Component:** Create `components/blog/PayloadRichText.tsx` to render Payload's Lexical data.
2. **Blog List Page:** Update `app/(frontend)/blogs/page.tsx` to fetch posts from Payload and render them using the existing card style.
3. **Blog Post Page:** Update `app/(frontend)/blogs/[slug]/page.tsx` to fetch a single post from Payload and render its full content using the new `RichText` component.
4. **Metadata:** Ensure `generateMetadata` correctly pulls from Payload's fields (title, excerpt, cover image).

## Tasks
- [x] Task: Create `components/blog/PayloadRichText.tsx`
  - Acceptance: Correctly renders basic Lexical nodes (paragraphs, headings, lists).
  - Verify: Component exists and compiles.
  - Files: `components/blog/PayloadRichText.tsx`
- [x] Task: Update `app/(frontend)/blogs/page.tsx`
  - Acceptance: Lists posts from PayloadCMS instead of Wix.
  - Verify: Navigate to `/blogs` and see Payload posts.
  - Files: `app/(frontend)/blogs/page.tsx`
- [x] Task: Update `app/(frontend)/blogs/[slug]/page.tsx`
  - Acceptance: Displays full post content from PayloadCMS.
  - Verify: Navigate to a specific post slug and see full content + rich text.
  - Files: `app/(frontend)/blogs/[slug]/page.tsx`
- [x] Task: Update `generateMetadata` in `[slug]/page.tsx`
  - Acceptance: Browser tab title and OG meta match the Payload post.
  - Verify: Check tab title and inspect head meta tags.
  - Files: `app/(frontend)/blogs/[slug]/page.tsx`
