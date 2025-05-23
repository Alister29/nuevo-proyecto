import { db } from "../database";
import { collection, query, where, getDocs } from "firebase/firestore";

import { COLLECTIONS } from "../database";

const findByParameter = async (parameter, value) => {
  const doc = collection(db, COLLECTIONS.USERS);
  const q = query(doc, where(parameter, "==", value));
  const res = await getDocs(q);
  return res;
};

export const find = async (username) => {
  return await findByParameter("username", username);
};

export const findByEmail = async (email) => {
  return await findByParameter("email", email);
};
