import * as tripledes from "crypto-js/tripledes";
import * as CryptoJS from "crypto-js";

const HASH_SECRET = process.env.HASH_SECRET || "12sdfb";

export function createHash(time: number, key: string) {
	return Buffer.from(`${time}-${key}-${HASH_SECRET}`).toString("base64");
}

export function encryptCard(data: string, hash: string) {
	return tripledes.encrypt(data, hash).toString();
}

export function decryptCard(data: string, hash: string) {
	return tripledes.decrypt(data, hash).toString(CryptoJS.enc.Utf8);
}
