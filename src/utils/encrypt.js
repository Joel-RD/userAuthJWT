import bcrypt from "bcrypt";

const saltRounds = 15;
const myPassword = "@Eudyjoel23";
const otherPassword = "@Eudyjoel23";

export const hashgenerator = async (password) => {
  try {
    const hash = await bcrypt.hash(myPassword, saltRounds);
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

// ✅ Verificar si la contraseña es la misma
// (async () => {
//   const hash = await hashgenerator();
//   if (hash) {
//     console.log(await comparePassword(otherPassword, hash));
//   }
// })();
