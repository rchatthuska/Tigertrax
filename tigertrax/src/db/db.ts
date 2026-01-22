import { sha256 } from "js-sha256";

/* =========================================================
added by noah 12-4 2PM. we are now doing a hasher to make this cleaner
added by noah 9-23 1PM. js-sha256 for rn
WE WILL NOT BE DOING THIS CLIENT SIDE IN THE END 
(it's insecure)!!! this is just for prototyping 
========================================================== */
export function hash(password: string): string {
	const hashed = sha256(password);
	return hashed;
}

/* ==========================================================
trial local "database". just one user for testing. 
signups will add more to this 
========================================================== */
export const Database: Record<string, string> = {
    "test@example.com": hash("password123"),
};