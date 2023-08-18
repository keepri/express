import {
    sqliteTable,
    text,
    integer,
    index,
} from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";
import { type z } from "zod";
import { relations, sql } from "drizzle-orm";

export const users = sqliteTable("users", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    fullName: text("fullName"),
    email: text("email").unique().notNull(),
    emailVerified: integer("emailVerified", { mode: "timestamp" }),
    image: text("image"),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updatedAt", { mode: "timestamp" }),
});
const UserSchema = createSelectSchema(users);
export type UserModel = z.infer<typeof UserSchema>;

export const usersRelations = relations(users, (params) => ({
    roles: params.many(roles),
}));

export const roles = sqliteTable("roles", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    name: text("name", { enum: ["user", "admin"] }).notNull().unique(),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updatedAt", { mode: "timestamp" }),
});
const RoleSchema = createSelectSchema(roles);
export type RoleModel = z.infer<typeof RoleSchema>;

export const rolesRelations = relations(roles, (params) => ({
    userRoles: params.many(userRoles),
}));

export const userRoles = sqliteTable("userRoles", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: integer("userId").references(() => users.id, { onDelete: "cascade" }),
    roleId: integer("roleId").references(() => roles.id, { onDelete: "cascade" }),
    createdAt: integer("createdAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updatedAt", { mode: "timestamp" }),
}, (ur) => ({
    idx_userId: index("idx_userId").on(ur.userId),
    idx_roleId: index("idx_roleId").on(ur.roleId),
}));
const UserRolesSchema = createSelectSchema(roles);
export type UserRolesModel = z.infer<typeof UserRolesSchema>;

export const userRolesRelations = relations(userRoles, (params) => ({
    user: params.one(users, { fields: [userRoles.userId], references: [users.id] }),
    role: params.one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
}));
