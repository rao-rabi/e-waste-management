import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://e-waste-db_owner:mkWPxgNw0Ey7@ep-white-sun-a5rtf2b6.us-east-2.aws.neon.tech/e-waste-db?sslmode=require"
);
export const db = drizzle(sql, { schema });
