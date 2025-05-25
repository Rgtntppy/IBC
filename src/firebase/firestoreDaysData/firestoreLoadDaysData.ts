import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'
import { DaysCellsData } from './daysDataInterface';

const DAYCELLS_DOC_ID = 'latest'

export const loadDayCells = async () => {
    try {
        const docSnap = await getDoc(doc(db, 'dayCells', DAYCELLS_DOC_ID));
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