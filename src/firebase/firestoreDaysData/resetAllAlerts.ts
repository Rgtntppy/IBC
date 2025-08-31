import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"

export const resetAllAlerts = async () => {
    const docRef = doc(db, 'dayCells', 'latest');
    const snap = await getDoc(docRef);

    if (!snap.exists()) {
        console.error('Document does not exist');
        return;
    }

    const data = snap.data();
    if (!Array.isArray(data.data)) {
        console.error('Invalid data structure');
        return;
    }

    const updatedData = data.data.map((item: any) => ({
        ...item,
        binAlert: 'white',
    }));

    await updateDoc(docRef, { data: updatedData });
}