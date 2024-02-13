import readFileAsArrayBuffer from "./readFileAsArrayBuffer";
import crypto from "crypto";

// Generates checksum for the first megabyte of the file
const generateChecksum = async (file: File) => {
	const chunkSize = 16 * 1024 * 1024; // 16 MB chunk size
	const fileSize = Math.min(chunkSize, file.size); // Limit to the first megabyte

	// Algorithm selection
	const hash = crypto.createHash("sha256");

	const chunk = file.slice(0, fileSize);
	const arrayBuffer = await readFileAsArrayBuffer(chunk);
	const data = new Uint8Array(arrayBuffer);
	hash.update(data);

	const checksum = hash.digest("hex");
	return checksum;
};

export default generateChecksum;
