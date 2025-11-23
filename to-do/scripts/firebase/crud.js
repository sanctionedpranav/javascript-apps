import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { db } from "./db.js";

export const storeToDB = async (taskObject) => {
  const obj = {};

  for (let key in taskObject) {
    obj[key] = taskObject[key];
  }

  try {
    const docRef = await addDoc(collection(db, "tasks"), obj);

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}