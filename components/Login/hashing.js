// lib/auth.js
import bcrypt from 'bcryptjs';

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10); // The salt rounds, 10 is a good default
  return bcrypt.hash(password, salt);
}
