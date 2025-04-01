import bcrypt from "bcrypt";
import { config } from "../../config.js";

const saltRounds = 15;
const {console_log} = config();

export const hashgenerator = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console_log(error);
  }
};

export const comparePassword = async (password, hash) => {
  try {
    const compare = await bcrypt.compare(password, hash);
    return compare;
  } catch (error) {
    console_log(error);
  }
};

