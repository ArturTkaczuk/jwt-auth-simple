import bcrypt from "bcryptjs";

export async function hashPassword(plaintextPassword: string) {
  try {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    return hash;
  } catch (error) {
    console.error(error);
  }
}

export async function comparePassword(plaintextPassword: string, hash: string) {
  try {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
  } catch (error) {
    console.error(error);
  }
}
