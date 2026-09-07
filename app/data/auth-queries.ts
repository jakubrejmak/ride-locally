"use server";

import { sql, InferSelectModel } from "drizzle-orm";
import argon2 from "argon2";
import { db } from "@/app/db/index";
import { usersTable } from "@/app/db/schema";

type User = InferSelectModel<typeof usersTable>;

export async function logInUser(
  username?: string,
  email?: string,
  password?: string,
): Promise<User | null> {
  if ((!username && !email) || !password) return null;

  const q = username
    ? sql`SELECT * FROM web_users WHERE username = ${username} LIMIT 1`
    : sql`SELECT * FROM web_users WHERE email = ${email} LIMIT 1`;

  const result = await db.execute<User>(q);
  const user = result.rows[0];
  if (!user) return null;

  const ok = await argon2.verify(user.password_hash, password);
  if (!ok) return null;

  return user;
}
