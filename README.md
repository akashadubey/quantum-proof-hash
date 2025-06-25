# 🔐 quantum-proof-hash

> Quantum-resilient password hashing with Argon2 + AES-256 encryption. Built for the future of secure authentication.

[![NPM Version](https://img.shields.io/npm/v/quantum-proof-hash.svg)](https://www.npmjs.com/package/quantum-proof-hash)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D14.0-blue.svg)](https://nodejs.org)

---

## 🚀 Features

* ✅ Uses **Argon2id** (memory-hard, quantum-resistant hash)
* 🔐 Adds **AES-256-GCM encryption** to hash for extra protection
* 🥂 Random salts + 🔥 secret pepper for hardened security
* 🧪 Lightweight and easy to integrate into any Node.js project
* 🧱 Zero external dependencies

---

## 📆 Installation

```bash
npm install quantum-proof-hash
```

---

## 🔧 Usage

```js
const { hashPassword, verifyPassword } = require('quantum-proof-hash');

(async () => {
  const hashed = await hashPassword('supersecret123');
  console.log(hashed);

  const isMatch = await verifyPassword('supersecret123', hashed);
  console.log('Match:', isMatch); // true

  const wrong = await verifyPassword('wrongpassword', hashed);
  console.log('Wrong Match:', wrong); // false
})();
```

---

## 🔐 How It Works

1. Combines password with a hidden **pepper** (from environment variable)
2. Hashes using **Argon2id** with a 16-byte random salt
3. Encrypts the resulting hash using **AES-256-GCM**
4. Final output includes salt, IV, auth tag, and ciphertext

---

## ⚙️ Environment Setup

Create a `.env` file in your project root and define:

```env
ENCRYPTION_KEY=your-64-char-hex-secret
PEPPER=your-super-secret-pepper
```

* `ENCRYPTION_KEY`: A 256-bit (64 hex character) encryption key
* `PEPPER`: A long, secret string only known to your server

> ⚠️ Never expose your `PEPPER` or `ENCRYPTION_KEY` in code or version control.

---

## 🧪 Testing

To test locally, use the `test.js` provided in the repo:

```bash
node test.js
```

Example output:

```
Hashed password: { salt: "...", enc: "iv:encrypted-data:auth-tag" }
Match: true
Wrong Match: false
```

---

## 📜 Example Output Format

```json
{
  "salt": "ce0e30c541778e180da33cfb4287f68c",
  "enc": "04f06c...:3afca8...:26a473..."
}
```

* `salt`: The salt used for Argon2 hashing
* `enc`: The AES-encrypted Argon2 hash in the format `iv:ciphertext:authTag`

---

## 📄 License

MIT © [Akash Dubey](https://github.com/akashadubey)
