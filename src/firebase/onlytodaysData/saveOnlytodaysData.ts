import { db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore';
import { OnlytodaysData } from './onlytodaysDataInterface';

const ONLYTODAY_DOC_ID = 'onlytoday_latest'

export const saveOnlytodayData = async (onlytodaysData: OnlytodaysData[]) => {
    try {
        await setDoc(doc(db, 'dayCells', ONLYTODAY_DOC_ID), {
            data: onlytodaysData,
            createdAt: new Date(),
        });
    } catch (e) {
        console.error('Error saving document: ', e);
    }
};