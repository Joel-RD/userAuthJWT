import bcrypt from "bcrypt";

const saltRounds = 15;

export const hashgenerator = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error(error);
  }
};

export const comparePassword = async (password, hash) => {
  try {
    const compare = await bcrypt.compare(password, hash);
    return compare;
  } catch (error) {
    console.error(error);
  }
};

