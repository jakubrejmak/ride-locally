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
