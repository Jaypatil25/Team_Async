import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//path to Python RAG script
const RAG_SCRIPT_PATH = path.resolve(
  __dirname,
  "../../../rag-engine/rag.py"
);

/**
 * 
 * @param {string} text
 */
export const addToRAG = (text) => {
  try {
    if (!text || text.trim().length === 0) {
      console.warn("No text provided to addToRAG");
      return;
    }
// #prevents shell breaking 
    const safeText = text.replace(/"/g, '\\"');

    const command = `python3 "${RAG_SCRIPT_PATH}" add "${safeText}"`;

    const output = execSync(command, {
      encoding: "utf-8",
      maxBuffer: 1024 * 1024 * 10, 
    });

    const result = JSON.parse(output);

    console.log(`RAG Indexed: ${result.chunks} chunks`);
  } catch (err) {
    console.error("RAG Indexing Error:", err.message);
  }
};

/**
 * Retrieve relevant context from FAISS
 * @param {string} query
 * @returns {string}
 */
export const retrieveContext = (query) => {
  try {
    if (!query || query.trim().length === 0) {
      console.warn("Empty query passed to retrieveContext");
      return "";
    }

    const safeQuery = query.replace(/"/g, '\\"');

    const command = `python3 "${RAG_SCRIPT_PATH}" search "${safeQuery}"`;

    const output = execSync(command, {
      encoding: "utf-8",
      maxBuffer: 1024 * 1024 * 10,
    });

    const results = JSON.parse(output);

    return results.join("\n");
  } catch (err) {
    console.error("RAG Retrieval Error:", err.message);
    return "";
  }
};
export const retrieveContextAsync = async (query) => {
  return new Promise((resolve) => {
    try {
      const safeQuery = query.replace(/"/g, '\\"');

      const command = `python3 "${RAG_SCRIPT_PATH}" search "${safeQuery}"`;

      const output = execSync(command, {
        encoding: "utf-8",
      });

      const results = JSON.parse(output);
      resolve(results.join("\n"));
    } catch (err) {
      console.error("Async RAG Error:", err.message);
      resolve("");
    }
  });
};