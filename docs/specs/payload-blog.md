# Spec: PayloadCMS Blog Integration

## Objective
Replace the existing Wix-based blog with a PayloadCMS-powered blog. The goal is to provide a seamless transition where users can manage their blog content in PayloadCMS and view it on the frontend using the same URL structure.

## Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **CMS:** PayloadCMS 3.0+
- **Database:** PostgreSQL (Neon)
- **Rich Text:** Lexical (Payload default)
- **Styling:** Tailwind CSS (existing project style)

## Commands
- **Dev:** `pnpm dev`
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Payload Admin:** Access via `/admin`

## Project Structure
- `app/(frontend)/blogs/page.tsx` → Blog list page (Update to use Payload)
- `app/(frontend)/blogs/[slug]/page.tsx` → Single blog post page (Update to use Payload)
- `collections/Blogs.ts` → Existing Payload collection
- `collections/Media.ts` → Existing Payload collection for images
- `components/blog/PayloadRichText.tsx` → **New** component to render Lexical content

## Code Style
- Use Server Components for data fetching.
- Use Payload's Local API via `getPayload({ config })`.
- Maintain existing UI patterns and classes for consistency.

## Testing Strategy
- Manual verification of blog list rendering.
- Manual verification of single post rendering with full content (Rich Text, Images).
- Ensure 404 is returned for non-existent slugs.

## Boundaries
- **Always do:** Use Payload Local API for server-side fetching.
- **Ask first:** If we need to change the `Blogs` collection schema.
- **Never do:** Use client-side fetching for initial page load if not necessary.

## Success Criteria
- [ ] `/blogs` displays a list of posts from PayloadCMS.
- [ ] `/blogs/[slug]` displays the full content of a post from PayloadCMS.
- [ ] Images (cover images) are correctly rendered.
- [ ] Lexical rich text content is correctly rendered.
- [ ] Metadata (title, description, OG images) is correctly generated from Payload data.

## Open Questions
- Do we want to keep the Wix integration as a fallback or completely remove it? (Assumption: Replace it)
- Are there specific UI changes requested or should it look identical to the current Wix blog? (Assumption: Keep identical look)
- How should we handle the "Comments" section? (Assumption: Keep existing Wix/Local comments if applicable, or integrate with Payload)
