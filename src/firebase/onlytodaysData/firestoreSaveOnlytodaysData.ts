import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'
import { OnlytodaysData } from './onlytodaysDataInterface';

const ONLYTODAY_DOC_ID = 'onlytoday_latest'

export const saveOnlytodayData = async (onlytodaysData: OnlytodaysData[]) => {
    try {
        await setDoc(doc(db, 'dayCells', ONLYTODAY_DOC_ID), {
            data: onlytodaysData,
            createdAt: new Date(),
        });
        console.log('Document saved with fixed ID: ');
    } catch (e) {
        console.error('Error saving document: ', e);
    }
};