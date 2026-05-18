# Project Model Refactor

## Goal

Restructure the project detail page to support richer content:
- A short **properties** field (brief project overview)
- A **presentation** section broken into `context`, `problematic`, and `methodology` sub-sections
- Each sub-section supports **mixed blocks** (text + images interleaved)
- Keep `thumbnail_url` (comma-separated), `results_impact`, and all other existing fields

---

## Block format (jsonb)

Sub-sections that support mixed content use a list of typed blocks:

```json
[
  { "type": "text", "content": "Some paragraph..." },
  { "type": "image", "url": "https://res.cloudinary.com/..." },
  { "type": "text", "content": "Another paragraph after the image..." }
]
```

---

## Database changes

| Column | Action | Type | Notes |
|---|---|---|---|
| `properties` | ADD | `text` | Short project overview (1–3 lines) |
| `context` | ADD | `jsonb` | Blocks: text + image |
| `problematic` | ADD | `jsonb` | Blocks: text + image |
| `methodology` | CHANGE | `text` → `jsonb` | Blocks: text + image |
| `problem_statement` | REMOVE | `text` | Replaced by `problematic` |
| `thumbnail_url` | KEEP | `text` | Comma-separated image URLs |
| `results_impact` | KEEP | `text` | Plain text, whitespace-pre-wrap |

Migration file to create: `013_project_model_refactor.sql`

---

## Backend changes

**`app/models/project.py`**
- Remove `problem_statement: str | None`
- Add `properties: str | None`
- Add `context: list[dict] | None`
- Add `problematic: list[dict] | None`
- Change `methodology: str | None` → `methodology: list[dict] | None`

---

## Frontend changes

**`lib/types.ts`**
- Remove `problem_statement`
- Add `properties: string | null`
- Add `context: Block[] | null`
- Add `problematic: Block[] | null`
- Change `methodology: string | null` → `methodology: Block[] | null`
- Add `Block` type: `{ type: 'text'; content: string } | { type: 'image'; url: string }`

**`components/projects/ProjectDetailContent.tsx`**
- Remove `problem_statement` from `FIELDS` (no longer translated as plain text)
- Add `properties` rendering below the title (plain text, no section divider)
- Replace the three plain `<p>` sections with a `BlockRenderer` component
- `BlockRenderer` renders each block as `<p>` (text) or `<Image>` (image)
- Section order: Context → Problematic → Methodology → Results & Impact → Metrics → Stack → Images

**`components/projects/ProjectCard.tsx`**
- Replace `problem_statement` preview with `properties` (shorter, better for cards)

**`lib/use-translate.ts`** / translation
- `properties` → add to translated fields (plain text)
- `context` / `problematic` / `methodology` blocks → translate only `content` fields of `text` blocks

---

## Locale changes

**`locales/fr.json`** and **`locales/en.json`**
- Add `slug.context`
- Add `slug.problematic`
- `slug.methodology` already exists
- Remove `slug.problem` (replaced by `slug.problematic`)

---

## YAML format (projects.yaml)

```yaml
- slug: my-project
  title: Mon Projet
  properties: "Projet de classification d'images réalisé en groupe de 3."
  context:
    - type: text
      content: |
        Le contexte dans lequel s'inscrit ce projet...
    - type: image
      url: "https://res.cloudinary.com/..."
  problematic:
    - type: text
      content: "La problématique posée par ce projet..."
  methodology:
    - type: text
      content: |
        Première étape : collecte des données.

        Deuxième étape : entraînement du modèle.
    - type: image
      url: "https://res.cloudinary.com/..."
    - type: text
      content: "Résultats intermédiaires observés."
  results_impact: |
    Les résultats obtenus...
  thumbnail_url: "https://url1.png, https://url2.png"
```

---

## Order of implementation

1. DB migration (`013_project_model_refactor.sql`)
2. Backend model + service (no service change needed, generic insert/update)
3. Frontend types (`lib/types.ts`)
4. Locale files
5. `ProjectDetailContent.tsx` — BlockRenderer + new sections
6. `ProjectCard.tsx` — use `properties` instead of `problem_statement`
7. Translation hook — handle jsonb block translation
8. Update `projects.yaml` with new format
9. Re-seed
