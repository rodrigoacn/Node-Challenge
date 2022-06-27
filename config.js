import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
})

export var env = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE: process.env.DATABASE
}