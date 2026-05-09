# Spec: PayloadCMS Projects Integration

## Objective
Migrate the "Projects" section from Wix to PayloadCMS. This will allow the user to manage their projects (titles, filters, images, and URLs) directly within PayloadCMS, consistent with the new Blog architecture.

## Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **CMS:** PayloadCMS 3.0+
- **Database:** PostgreSQL (Neon)
- **Styling:** Tailwind CSS (existing project style)

## Project Structure
- `collections/Projects.ts` → **New** Payload collection for Projects.
- `app/(frontend)/projects/page.tsx` → Update to fetch from Payload instead of Wix.
- `components/projects/ProjectList.tsx` → **New** component to replace Wix-specific filtering/rendering logic.
- `components/projects/ProjectCard.tsx` → **New** atomic component for individual projects.

## Collection Schema (Projects)
- `title`: Text (required)
- `filter`: Select or Text (required) - e.g., 'Web', 'Mobile', etc.
- `image`: Upload (relation to `media`, required)
- `url`: Text (required, external link)
- `orderId`: Number (for manual sorting)

## Code Style
- Use Server Components for data fetching.
- Use Payload's Local API.
- Replicate existing shuffle/filter UI logic in a clean, modern way using standard React state.

## Success Criteria
- [ ] Payload Admin has a `Projects` collection.
- [ ] `/projects` page displays projects from PayloadCMS.
- [ ] Filtering functionality (All, Web, etc.) works as before.
- [ ] Images are served via Payload's `media` collection.
- [ ] Links open correctly in a new tab.

## Implementation Plan
1. **Define Collection:** Create `collections/Projects.ts`.
2. **Register Collection:** Add to `payload.config.ts`.
3. **Frontend Components:** Create `ProjectCard` and `ProjectList` (clean versions of the Wix ones).
4. **Update Page:** Modify `app/(frontend)/projects/page.tsx` to fetch from Payload.
5. **Cleanup:** Remove Wix-specific Project components once verified.
