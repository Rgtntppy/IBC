import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { DaysCellsData } from './daysDataInterface';

const DAYCELLS_DOC_ID = 'latest'

export const saveDayCells = async (dayCells: DaysCellsData[]) => {
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