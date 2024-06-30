import { readFileSync } from "fs";
import path from "path";

const input = readFileSync(`src/${path.basename(__dirname)}/text.txt`, "utf8");
