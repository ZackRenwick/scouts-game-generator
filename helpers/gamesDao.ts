import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts";
import { GET_ALL_GAMES } from "./queries.ts";

// Get the connection string from the environment variable "DATABASE_URL"
const databaseUrl = Deno.env.get("DATABASE_URL")!;

export async function getAllGames() {
    
    const pool = new postgres.Pool(databaseUrl, 3, true);


    const connection = await pool.connect();
    try {
        const result = await connection.queryObject(GET_ALL_GAMES);
        const jsonResult = JSON.stringify(result.rows);
        return jsonResult;
    } finally {
        connection.release();
    }
    
}
