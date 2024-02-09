import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const applications = pgTable("applciations", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    applicationId: uuid("application_id").references(() => applications.id),
    password: varchar("password", { length: 255 }).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (users) => {
    return {
      cpk: primaryKey({ columns: [users.email, users.applicationId] }),
      idIndex: uniqueIndex("users_id_index").on(users.id),
    };
  }
);

export const roles = pgTable(
  "roles",
  {
    id: uuid("id").defaultRandom().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    applicationId: uuid("application_id").references(() => applications.id),
    permissions: text("permissions").array().$type<Array<string>>(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
  },
  (roles) => {
    return {
      cpk: primaryKey({ columns: [roles.name, roles.applicationId] }),
      idIndex: uniqueIndex("roles_id_index").on(roles.id),
    };
  }
);

export const usersToRoles = pgTable(
  "users_to_roles",
  {
    applicationId: uuid("applications_id")
      .references(() => applications.id)
      .notNull(),
    rolesId: uuid("roles_id")
      .references(() => roles.id)
      .notNull(),
    usersId: uuid("users_id")
      .references(() => users.id)
      .notNull(),
  },
  (usersToRoles) => {
    return {
      cpk: primaryKey({
        columns: [
          usersToRoles.applicationId,
          usersToRoles.rolesId,
          usersToRoles.usersId,
        ],
      }),
    };
  }
);
