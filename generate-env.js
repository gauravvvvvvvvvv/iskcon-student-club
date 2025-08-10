// Quick Environment Variables Generator
// Run this in your browser console or Node.js

console.log("🔐 Generating Environment Variables for ISKCON Student Club");
console.log("=" * 60);

// Generate JWT Secret
const jwtSecret = Array.from(crypto.getRandomValues(new Uint8Array(32)))
  .map(b => b.toString(16).padStart(2, '0'))
  .join('');

console.log("JWT_SECRET=" + jwtSecret);
console.log("");

// For password hash, you'll need to choose a password
console.log("To generate ADMIN_PASSWORD_HASH:");
console.log("1. Choose a secure admin password");
console.log("2. Visit: https://bcrypt-generator.com/");
console.log("3. Enter your password and generate with 12 rounds");
console.log("4. Copy the hash");
console.log("");

console.log("Your current environment variables should be:");
console.log("BLOB_READ_WRITE_TOKEN=vercel_blob_rw_wjIVgvFnInU3F7bX_mO5997OuGjnSCKP93iRFecjPh2RvgR");
console.log("KV_REST_API_URL=(auto-added by Vercel KV)");
console.log("KV_REST_API_TOKEN=(auto-added by Vercel KV)");
console.log("JWT_SECRET=" + jwtSecret);
console.log("ADMIN_PASSWORD_HASH=(generate at bcrypt-generator.com)");
