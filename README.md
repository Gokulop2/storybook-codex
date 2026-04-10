# Codex UI Platform

A comprehensive, enterprise-grade React component library that solves UI consistency, developer friction, and enables AI-assisted code generation through a unified component architecture.

**Consistency by Construction:** Components don't expose styling props. Only logic-level choices. Result: Automatic UI consistency across all applications.

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development

```bash
# Full development: icons watch + UI build + Storybook
npm run dev
```

This starts:
- Icons package in watch mode
- UI package TypeScript and CSS watch build
- Storybook docs at **http://localhost:6006**

### 3. Common Commands

```bash
# Build
npm run build

# Build specific workspace
npm run build --workspace=@opus2-platform/codex

# Watch/development mode
npm run dev --workspace=@opus2-platform/codex

# View Storybook (component playground)
npm run dev --workspace=docs
```

---

## 📁 Repository Structure

```
packages/
├── ui/                    # @opus2-platform/codex (component library)
│   └── src/
│       ├── components/    # 40+ components
│       ├── hooks/         # Custom hooks
│       ├── styles/        # Design tokens & theme
│       └── utils/         # Utilities
├── icons/                 # @opus2-platform/icons (icons)
│
apps/
└── docs/                  # Storybook documentation
```

---

## 🎯 Key Features

✅ **40+ Production-Ready Components**
✅ **WCAG 2.1 Accessible**
✅ **Full TypeScript Support**
✅ **Semantic Design Tokens**
✅ **2-3x Faster Development**

---

## 📦 Workspaces

| Workspace | Package | Purpose |
|-----------|---------|---------|
| `packages/ui` | `@opus2-platform/codex` | React component library |
| `packages/icons` | `@opus2-platform/icons` | Icon components |
| `apps/docs` | Storybook | Live component documentation |

---

## 🔑 Quick Example

```tsx
import { Button, Modal, Input } from "@opus2-platform/codex";
import "@opus2-platform/codex/dist/styles.css";

export function MyFeature() {
  return (
    <Modal isOpen={true}>
      <Modal.Header>Create User</Modal.Header>
      <Modal.Body>
        <Input label="Name" isRequired />
      </Modal.Body>
      <Modal.Footer>
        <Button color="primary">Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
```

---

## 💡 For More Information

- **Development Guidelines** → [CLAUDE.md](CLAUDE.md)
- **Live Examples** → Run `npm run dev` and visit Storybook

---

**Status:** Development
