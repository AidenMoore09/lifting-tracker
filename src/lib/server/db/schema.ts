import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

const usersTable = pgTable('users', {
	id: integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	age: integer(),
	email: varchar({ length: 255 }).notNull().unique(),
	height: integer(),
	weight: integer()
});

export { usersTable as users };
