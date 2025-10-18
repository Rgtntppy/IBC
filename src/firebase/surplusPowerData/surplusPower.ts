import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COLLECTION_NAME, DOC_ID } from './firestorePaths';

export const subscrideToAlertColors = (
    setColors: React.Dispatch<
        React.SetStateAction<{
            BArea: string;
            SArea: string;
            PArea: string;
        }>
    >
) => {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    return onSnapshot(docRef, (snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.data();
            setColors({
                BArea: data.BAreaAlert ?? 'green',
                SArea: data.SAreaAlert ?? 'green',
                PArea: data.PAreaAlert ?? 'green',
            });
        }
    });
};