import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore';
import { OnlytodayProps } from '../../components/master/binBlocks/onlytoday/onlytodayInterface'; 

const ONLYTODAY_DOC_ID = 'onlytoday_latest'

export const loadOnlytodayData = async (): Promise<OnlytodayProps[] | null> => {
    try {
        const docSnap = await getDoc(doc(db, 'onlyDayCells', ONLYTODAY_DOC_ID));
        if (docSnap.exists()) {
            return docSnap.data().data;
        } else {
            console.log('No Onlytoday data found.');
            return null;
        }
    } catch (e) {
        console.error('Error Loading onlytoday data: ', e);
        return null;
    }
};