# Adding a person

Each person is one Markdown file in `src/content/people/`. The filename — without the extension — becomes the URL slug for the detail page.

```
src/content/people/aydin.md   →   /about/aydin
```

People appear on `/about`, grouped: the first `faculty` entry is the lead block, `postdoc`/`phd`/other faculty fill the staff grid, `alumni` get their own grid, and `partner` entries are grouped by `org`. The `authors[]` strings in publications are matched to people by **display name** — if a person's `name` exactly matches an author string, their name links to `/about/<slug>` across the site.

## 1. Create the file

```md
---
name: "Aysu Aydın"
initials: "AA"
role: "Ph.D. Student"
topic: "online learning, bandits, optimization"
group: "phd"
order: 5

# Optional
office: "Room 412"
email: "aysu@example.org"
links:
  website: "https://aysuaydin.dev"
  scholar: "https://scholar.google.com/citations?user=..."
  github: "https://github.com/aysu"
  other:
    - { label: "Bluesky", url: "https://bsky.app/profile/aysu" }
---

The body is the bio, rendered on `/about/<slug>` (and, for the lead faculty
member, as the lead block on `/about`). Plain Markdown. If you leave it empty,
the detail page shows "Bio coming soon."
```

## 2. Field reference

| Field      | Required | Type                                                        | Notes                                                                                                  |
| ---------- | :------: | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `name`     |    ✓     | string                                                      | Display name. Must match the `authors[]` strings in publications for author cross-links to resolve.    |
| `initials` |    ✓     | string (1–3 chars)                                          | Shown in the avatar gradient placeholder when no photo exists.                                          |
| `role`     |    ✓     | string                                                      | E.g. `Ph.D. Student`, `Senior Researcher · Ph.D.`.                                                      |
| `topic`    |    ✓     | string                                                      | Free-form research interests, shown under the name.                                                    |
| `group`    |    ✓     | `faculty` \| `postdoc` \| `phd` \| `alumni` \| `partner`    | Drives placement on `/about`. The first `faculty` entry (by `order`) becomes the lead block.            |
| `org`      |          | string                                                      | Affiliation for `partner` entries — drives the per-organization grouping of the Partners section.       |
| `order`    |          | int (default `100`)                                         | Sort order within the group (and, for partners, the org sequence). Lower comes first.                  |
| `office`   |          | string                                                      | Shown on the detail page.                                                                              |
| `email`    |          | email                                                       | Shown on the detail page.                                                                              |
| `links`    |          | object                                                      | `website`, `scholar`, `dblp`, `github`, `cv`, `orcid`, `researchgate` (each an optional URL), plus `other` — an array of `{label, url}` for anything else (Mastodon, Bluesky, Semantic Scholar, …). |

## 3. Photo (optional)

Drop a photo at `src/assets/people/<slug>.{jpg,jpeg,png,webp,avif}` (alongside the other people images, processed by Astro at build time). The avatar (`src/components/people/Avatar.astro`) resolves it by slug; with no photo, the gradient-initials placeholder is used instead.

## 4. Preview locally

```bash
bun dev
```

Open `http://localhost:4321/about` to confirm the card renders in the right group, then click into it to confirm the detail page at `/about/<slug>`.
