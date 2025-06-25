const argon2 = require('argon2');
const crypto = require('crypto');
const { encrypt, decrypt } = require('./crypto');

const DEFAULT_PEPPER = process.env.PEPPER || '🔒super-secret-pepper🔒';
const ENCRYPTION_KEY = process.env.HASH_ENC_KEY || crypto.randomBytes(32).toString('hex');

async function hashPassword(password) {
  const salt = crypto.randomBytes(16);
  const pepperedPassword = password + DEFAULT_PEPPER;

  const hash = await argon2.hash(pepperedPassword, {
    type: argon2.argon2id,
    memoryCost: 2 ** 18, // 256 MB
    timeCost: 6,
    parallelism: 2,
    salt
  });

  const encryptedHash = encrypt(hash, ENCRYPTION_KEY);
  return JSON.stringify({
    salt: salt.toString('hex'),
    enc: encryptedHash
  });
}

async function verifyPassword(password, storedData) {
  const parsed = JSON.parse(storedData);
  const salt = Buffer.from(parsed.salt, 'hex');
  const encryptedHash = parsed.enc;

  const originalHash = decrypt(encryptedHash, ENCRYPTION_KEY);
  const pepperedPassword = password + DEFAULT_PEPPER;

  return await argon2.verify(originalHash, pepperedPassword);
}

module.exports = {
  hashPassword,
  verifyPassword
};
