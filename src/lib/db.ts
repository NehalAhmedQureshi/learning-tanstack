// A fake in-memory "database" for learning.
// Data resets whenever the dev server restarts.

export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
};

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
  createdAt: string;
};

export const users: User[] = [
  { id: 1, name: "Alice Khan", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bilal Ahmed", email: "bilal@example.com", role: "user" },
  { id: 3, name: "Sara Ali", email: "sara@example.com", role: "user" },
];

export const posts: Post[] = [
  {
    id: 1,
    title: "Getting started with Next.js",
    body: "The App Router uses folders to define routes.",
    userId: 1,
    createdAt: "2026-10-01T10:00:00.000Z",
  },
  {
    id: 2,
    title: "Route Handlers explained",
    body: "A route.ts file exports functions named after HTTP methods.",
    userId: 2,
    createdAt: "2026-10-15T12:30:00.000Z",
  },
  {
    id: 3,
    title: "Server vs Client Components",
    body: "Components are Server Components by default.",
    userId: 1,
    createdAt: "2026-11-01T09:15:00.000Z",
  },
];

export function nextId(items: { id: number }[]) {
  return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
}
