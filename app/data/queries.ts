"use server";

import { sql, InferSelectModel } from "drizzle-orm";
import { db } from "@/app/db/index"
import { stopsTable } from "@/app/db/schema";
import type { NavigatorLoc } from "@/app/lib/geo";
type Stop = InferSelectModel<typeof stopsTable>;

export async function getStopsCloseby(
    location: NavigatorLoc,
    withinMeters: number = 50000,
    limit: number = 10,
): Promise<Stop[]> {
    const point = sql`ST_SetSRID(ST_MakePoint(${location.longitude}, ${location.latitude}), 4326)::geography`;

    const query = sql`
        SELECT * FROM stops
        WHERE ST_DWithin(location, ${point}, ${withinMeters})
        ORDER BY location <-> ${point}
        LIMIT ${limit}`;

    const result = await db.execute<Stop>(query);

    return result.rows;
}

export async function getStopsPopular(
    location: NavigatorLoc,
    withinMeters: number = 50000,
    limit: number = 10,
): Promise<Stop[]> {
    const point = sql`ST_SetSRID(ST_MakePoint(${location.longitude}, ${location.latitude}), 4326)::geography`;

    const query = sql`
        SELECT s.id, s.name, s.location
        FROM stops s
        LEFT JOIN stops_metrics sm ON sm.stop_id = s.id
        WHERE ST_DWithin(s.location, ${point}, ${withinMeters})
        GROUP BY s.id
        ORDER BY COUNT(sm.id) DESC, s.location <-> ${point}
        LIMIT ${limit}`;

    const result = await db.execute<Stop>(query);

    return result.rows;
}