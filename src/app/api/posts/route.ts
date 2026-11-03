import type { NextRequest } from "next/server";
import { nextId, posts, users, type Post } from "@/lib/db";

// GET /api/posts?userId=1
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  const result = userId
    ? posts.filter((post) => post.userId === Number(userId))
    : posts;

  return Response.json(result);
}

// POST /api/posts  body: { title, body, userId }
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.title || !body?.body || !body?.userId) {
    return Response.json(
      { error: "title, body and userId are required" },
      { status: 400 },
    );
  }

  if (!users.some((user) => user.id === Number(body.userId))) {
    return Response.json({ error: "User does not exist" }, { status: 400 });
  }

  const post: Post = {
    id: nextId(posts),
    title: body.title,
    body: body.body,
    userId: Number(body.userId),
    createdAt: new Date().toISOString(),
  };
  posts.push(post);

  return Response.json(post, { status: 201 });
}
