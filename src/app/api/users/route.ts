import type { NextRequest } from "next/server";
import { nextId, users, type User } from "@/lib/db";

// GET /api/users?search=ali
export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search")?.toLowerCase();

  const result = search
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search),
      )
    : users;

  return Response.json(result);
}

// POST /api/users  body: { name, email, role? }
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.name || !body?.email) {
    return Response.json(
      { error: "name and email are required" },
      { status: 400 },
    );
  }

  const user: User = {
    id: nextId(users),
    name: body.name,
    email: body.email,
    role: body.role === "admin" ? "admin" : "user",
  };
  users.push(user);

  return Response.json(user, { status: 201 });
}
