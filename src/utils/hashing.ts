import bcrypt from "bcrypt";

const hash = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const compare = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt
    .compare(password, hash)
    .then((result) => result)
    .catch(() => false);
};

export { hash, compare };
