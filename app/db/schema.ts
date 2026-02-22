import {
    integer,
    pgEnum,
    pgTable,
    varchar,
    customType,
} from "drizzle-orm/pg-core";
import { time } from "drizzle-orm/pg-core";

export const holidayBehaviorEnum = pgEnum("holiday_behavior", [
    "rides_normally",
    "does_not_ride",
]);

export const geographyPoint = customType<{ data: unknown }>({
    dataType() {
        return "geography(Point,4326)";
    },
});

export const carriersTable = pgTable("carriers", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    homepage: varchar(),
    contact_phone: varchar({ length: 20 }),
    contact_email: varchar({ length: 255 }),
});

export const routesTable = pgTable("routes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    carrier_id: integer()
        .references(() => carriersTable.id)
        .notNull(),
    origin_stop: integer()
        .references(() => stopsTable.id)
        .notNull(),
    destination_stop: integer()
        .references(() => stopsTable.id)
        .notNull(),
});

export const tripsTable = pgTable("trips", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    route_id: integer().references(() => routesTable.id),
    price: integer(),
    currency: varchar({ length: 3 }),
    duration: integer(),
    distance: integer(),
    holiday_behavior: holidayBehaviorEnum("holiday_behavior")
        .notNull()
        .default("rides_normally"),
});

export const stopsTable = pgTable("stops", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar().notNull(),
    location: geographyPoint("location").notNull(),
});

export const tripStopsTable = pgTable("trip_stops", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    trip_id: integer().references(() => tripsTable.id),
    stop_id: integer().references(() => stopsTable.id),
    stop_order: integer().notNull(),
    arrival_time: time().notNull(),
    departure_time: time().notNull(),
});
