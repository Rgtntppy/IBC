import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase"

export const saveDayCells = async (dayCells: any) => {
    try {
        const docRef = await addDoc(collection(db, "dayCells"), {
            data: dayCells,
            createdAt: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};