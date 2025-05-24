import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { UsersProps } from '../data/usersInterface';

type UserFirestoreData = Pick<UsersProps, 'userName' | 'role'>;

export const saveUserInfoToFirestore = async ({
    userName,
    role,
}: UserFirestoreData) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
        try {
            await setDoc(doc(db, 'users', currentUser.uid), {
                userName,
                role,
            });
        } catch (error) {
            console.error('Firestore保存エラー:', error);
        }
    } else {
        console.warn('Firebase Auth未ログイン状態です');
    }
};