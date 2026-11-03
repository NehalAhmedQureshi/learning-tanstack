import type { NextRequest } from "next/server";
import { users } from "@/lib/db";

function notFound() {
  return Response.json({ error: "User not found" }, { status: 404 });
}

// GET /api/users/1
export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) {
  const { id } = await ctx.params;
  const user = users.find((u) => u.id === Number(id));

  return user ? Response.json(user) : notFound();
}

// PATCH /api/users/1  body: { name?, email?, role? }
export async function PATCH(
  request: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) {
  const { id } = await ctx.params;
  const user = users.find((u) => u.id === Number(id));
  if (!user) return notFound();

  const body = await request.json().catch(() => ({}));
  if (body.name) user.name = body.name;
  if (body.email) user.email = body.email;
  if (body.role === "admin" || body.role === "user") user.role = body.role;

  return Response.json(user);
}

// DELETE /api/users/1
export async function DELETE(
  _request: NextRequest,
  ctx: RouteContext<"/api/users/[id]">,
) {
  const { id } = await ctx.params;
  const index = users.findIndex((u) => u.id === Number(id));
  if (index === -1) return notFound();

  users.splice(index, 1);
  return new Response(null, { status: 204 });
}
