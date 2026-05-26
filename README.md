# kui

A minimal, dark-first React component library built with Tailwind CSS and CVA.

## Install

```bash
npm install kui
```

### Peer dependencies

Make sure these are installed in your project:

```bash
npm install react react-dom tailwindcss class-variance-authority clsx tailwind-merge lucide-react
```

### Tailwind config

Add kui to your `tailwind.config.js` content paths so Tailwind picks up class names from the package:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/kui/dist/**/*.js", // ← add this
  ],
};
```

---

## Usage

### Button

```tsx
import { Button } from "kui";

<Button variant="solid" size="md">Click me</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>
```

### Modal

```tsx
import { Modal, ModalHeader, ModalTitle, ModalContent, ModalFooter } from "kui";
import { useState } from "react";

const [open, setOpen] = useState(false);

<Modal open={open} onClose={() => setOpen(false)} size="md">
  <ModalHeader onClose={() => setOpen(false)}>
    <ModalTitle>Hello</ModalTitle>
  </ModalHeader>
  <ModalContent>Your content here.</ModalContent>
  <ModalFooter>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </ModalFooter>
</Modal>
```

### Toast

Wrap your app with `ToastProvider`, then use `useToast()` anywhere:

```tsx
// main.tsx or layout.tsx
import { ToastProvider } from "kui";

<ToastProvider>
  <App />
</ToastProvider>

// Inside any component
import { useToast } from "kui";

const { toast } = useToast();

toast.success("Saved!");
toast.error("Something went wrong.");
toast.info("FYI...");
```

### Dropdown

```tsx
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "kui";

<Dropdown>
  <DropdownTrigger>
    <Button>Open</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem onClick={() => {}}>Profile</DropdownItem>
    <DropdownItem variant="danger" onClick={() => {}}>Logout</DropdownItem>
  </DropdownMenu>
</Dropdown>
```

### Avatar

```tsx
import { Avatar, AvatarGroup } from "kui";

<Avatar src="/photo.jpg" alt="John" size="md" status="online" />

// Fallback to initials
<Avatar fallback="JD" size="lg" />

// Group with overflow
<AvatarGroup max={3}>
  <Avatar fallback="A" />
  <Avatar fallback="B" />
  <Avatar fallback="C" />
  <Avatar fallback="D" />
</AvatarGroup>
```

### Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "kui";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">One</TabsTrigger>
    <TabsTrigger value="tab2">Two</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content one</TabsContent>
  <TabsContent value="tab2">Content two</TabsContent>
</Tabs>
```

---

## Publishing

```bash
npm run build      # compiles to dist/
npm publish        # publishes to npm
```

---

## License

MIT
