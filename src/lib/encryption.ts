import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // Standard 96-bit IV for AES-GCM
const PREFIX = "enc:v1:";

/**
 * Derives a deterministic 32-byte key from available environment secrets
 */
function getEncryptionKey(): Buffer {
  const masterSecret =
    process.env.APP_ENCRYPTION_KEY ||
    process.env.ADMIN_JWT_SECRET ||
    "vloxia-enterprise-database-encryption-master-secret-2026";

  return crypto.createHash("sha256").update(masterSecret).digest();
}

/**
 * Encrypts a sensitive plaintext string into AES-256-GCM authenticated ciphertext.
 * Returns: enc:v1:<iv_hex>:<authTag_hex>:<ciphertext_hex>
 */
export function encryptSecret(plainText: string | null | undefined): string {
  if (!plainText || typeof plainText !== "string" || plainText.trim() === "") {
    return "";
  }

  // If already encrypted, do not re-encrypt
  if (plainText.startsWith(PREFIX)) {
    return plainText;
  }

  try {
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(plainText, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag().toString("hex");

    return `${PREFIX}${iv.toString("hex")}:${authTag}:${encrypted}`;
  } catch (err: any) {
    console.error("AES-256-GCM encryption error:", err.message);
    return plainText; // Fail-safe fallback
  }
}

/**
 * Decrypts an AES-256-GCM encrypted ciphertext string.
 * Transparently returns plaintext if the string is unencrypted.
 */
export function decryptSecret(cipherString: string | null | undefined): string {
  if (!cipherString || typeof cipherString !== "string" || cipherString.trim() === "") {
    return "";
  }

  // Transparent backward compatibility: if not prefixed with enc:v1:, return as-is
  if (!cipherString.startsWith(PREFIX)) {
    return cipherString;
  }

  try {
    const parts = cipherString.slice(PREFIX.length).split(":");
    if (parts.length !== 3) {
      console.warn("Invalid encrypted format, returning empty");
      return "";
    }

    const [ivHex, authTagHex, encryptedHex] = parts;
    const key = getEncryptionKey();
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (err: any) {
    console.error("AES-256-GCM decryption failed:", err.message);
    return "";
  }
}
