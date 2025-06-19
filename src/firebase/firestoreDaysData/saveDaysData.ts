import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { DaysCellsData } from './daysDataInterface';
import { debounce } from 'lodash';

const DAYCELLS_DOC_ID = 'latest'

const _saveDayCells = async (dayCells: DaysCellsData[]) => {
    try {
        await setDoc(doc(db, 'dayCells', DAYCELLS_DOC_ID), {
            data: dayCells,
            createdAt: new Date(),
        });
        console.log('saveDayCells実行')
    } catch (e) {
        console.error('Error saving document: ', e);
    }
};

export const saveDayCells = debounce(_saveDayCells, 500);