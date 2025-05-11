import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase'

const DAYCELLS_DOC_ID = 'latest'

export const saveDayCells = async (dayCells: any) => {
    try {
        await setDoc(doc(db, 'dayCells', DAYCELLS_DOC_ID), {
            data: dayCells,
            createdAt: new Date(),
        });
        console.log('Document saved with fixed ID: ');
    } catch (e) {
        console.error('Error saving document: ', e);
    }
};

export const loadDayCells = async () => {
    try {
        const docSnap = await getDoc(doc(db, 'ddayDells', DAYCELLS_DOC_ID));
        if (docSnap.exists()) {
            return docSnap.data().data;
        } else {
            console.log('No saved data found.');
            return null;
        }
    } catch (e) {
        console.error('Error loading document: ', e);
        return null;
    }
};