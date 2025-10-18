import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { COLLECTION_NAME, DOC_ID } from './firestorePaths';

export const updateAreaAlertColor = async (area: string, color: string) => {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    await updateDoc(docRef, { [`${area}Alert`]: color }); 
}