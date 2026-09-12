# English and Russian content

Keep the existing top-level fields and Markdown body as the original English
content. Add an optional `ru` frontmatter object for Russian display text.
Missing, empty, or whitespace-only translations fall back to the original;
visible fallback text is marked `lang="en"`.

Selecting Russian uses supplied translations in the carousel, cards, search,
detail pages, profiles, and browser page title. Search matches both languages,
regardless of the selected language. URLs and filter values always retain
their original identifiers.

## Publications

```yaml
ru:
  title: "Обучение выбору ставок"
  summary: "Краткое описание исследования."
  heroSummary: "Более подробное описание для главной страницы."
  venue: "Перевод названия издания, если предоставлен"
  authors:
    "Original Author Name": "Предпочтительное русское написание"
  tags:
    "online learning": "онлайн-обучение"
  links:
    "Dataset": "Данные"
  body: |
    ## Описание

    Переведённый текст с **Markdown** и формулой $x^2$.
```

Every field is optional. `summary` allows 320 characters; `heroSummary` allows
500. The carousel uses Russian `heroSummary`, then Russian `summary`, then
the original carousel description. The `tags`, `authors`, and `links` maps
are keyed by their original strings. Use consistent translations for a shared
tag or venue across entries.

Publication author names first use `ru.authors`, then the linked person's
`ru.name`, then the original author string. Keep top-level `authors` equal to
the person's top-level `name` so profile links and publication lists resolve.

BibTeX, APA-style citations, scholarly `citation_*` metadata, and RSS continue
to use original metadata. Venue names change only when `ru.venue` is supplied.
DOIs, arXiv IDs, URLs, filenames, email addresses, and other identifiers never
change. Scientific figures remain their existing assets.

## People

```yaml
ru:
  name: "Предпочтительное русское написание имени"
  initials: "ИИ"
  role: "Научный сотрудник"
  topic: "Онлайн-обучение и оптимизация"
  org: "Перевод названия организации"
  office: "Кабинет 412"
  links:
    "Personal website": "Личный сайт"
  body: |
    Биография на русском языке.

    - Первое направление исследований.
    - Второе направление исследований.
```

All fields are optional. Supply names and initials as the person prefers them;
the site does not invent transliterations. The same name appears on their
profile, people cards, publication author links, and author filter.
Organization grouping still uses the original `org`.

## News

News supports optional `ru.title`, `ru.summary`, `ru.imageAlt`, and
`ru.body`. Images and outbound URLs are shared by both languages.

## Markdown and implementation

`ru.body` is Markdown in a YAML block scalar. It is rendered at build time
using the unified processor configured in [astro.config.mjs](../astro.config.mjs),
including the math pipeline. Use site-root links such as `/publications/pub-25`
and public image URLs in translated Markdown; the news `image` field continues
to use Astro's image processing. Original Markdown remains untouched.

[LocalizedText](../src/components/LocalizedText.astro) handles static text,
[LocalizedBody](../src/components/LocalizedBody.astro) handles alternate
Markdown bodies, and [content-language.ts](../src/lib/content-language.ts)
provides the same fallback rules for Preact. Do not pass translated display
objects to citation generation.

The Russian group name is **Исследовательская Группа Онлайн Оптимизация И Приложения**; the wordmark uses **ООИПИГ**. English retains **OOAARG**.
These are browser-side language variants of the same static routes, not
separately indexed localized URLs. Without JavaScript the original English
content is shown.
