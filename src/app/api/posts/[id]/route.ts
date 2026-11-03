import type { NextRequest } from "next/server";
import { posts } from "@/lib/db";

function notFound() {
  return Response.json({ error: "Post not found" }, { status: 404 });
}

// GET /api/posts/1
export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/posts/[id]">,
) {
  const { id } = await ctx.params;
  const post = posts.find((p) => p.id === Number(id));

  return post ? Response.json(post) : notFound();
}

// PATCH /api/posts/1  body: { title?, body? }
export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/posts/[id]">,
) {
  const { id } = await ctx.params;
  const post = posts.find((p) => p.id === Number(id));
  if (!post) return notFound();

  const body = await request.json().catch(() => ({}));
  if (body.title) post.title = body.title;
  if (body.body) post.body = body.body;

  return Response.json(post);
}

// DELETE /api/posts/1
export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/posts/[id]">,
) {
  const { id } = await ctx.params;
  const index = posts.findIndex((p) => p.id === Number(id));
  if (index === -1) return notFound();

  posts.splice(index, 1);
  return new Response(null, { status: 204 });
}
