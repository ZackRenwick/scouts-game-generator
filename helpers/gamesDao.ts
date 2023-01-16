import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts";
import { GET_ALL_GAMES } from "./queries.ts";
import { config } from 'https://deno.land/x/dotenv@v1.0.1/mod.ts';
config({ export: true })

const databaseUrl = await Deno.env.get("DATABASE_URL")!; 

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
