import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export function loadKnowledgeBase() {
    const files = fs.readdirSync(DATA_DIR);

    console.log("Files found:", files);

    return files
        .filter(file => file.endsWith(".md"))
        .map(file => {
            const content = fs.readFileSync(
                path.join(DATA_DIR, file),
                "utf8"
            );

            return `# ${file}\n\n${content}`;
        })
        .join("\n\n-----------------------------\n\n");
}