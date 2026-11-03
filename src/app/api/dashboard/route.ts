import { connection } from "next/server";
import { posts, users } from "@/lib/db";

// GET /api/dashboard
export async function GET() {
  // With cacheComponents on, a GET handler that reads no request data is
  // prerendered at build time. connection() makes it run on every request
  // so the stats stay up to date.
  await connection();

  const latestPosts = [...posts]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return Response.json({
    totalUsers: users.length,
    totalPosts: posts.length,
    admins: users.filter((user) => user.role === "admin").length,
    latestPosts,
  });
}
