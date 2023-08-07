import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { app } from '../firebaseConfig';

const db = getFirestore(app);

export const getUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    return querySnapshot;
  } catch (error) {
    console.error(error);
  }
};

export const fsGetData = async (collectionName: string) => {
  console.log('fsGetData');

  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot;
  } catch (error) {
    console.error(error);
  }
};

export const postData = async () => {
  console.log('postData');

  dummyData.forEach(async (post) => {
    await addDoc(collection(db, 'posts'), post).then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    });
  });
};

const dummyData = [
  {
    user: 'Connor',
    title: 'Table',
    body: 'Quia voluptatem vel omnis et quibusdam dolorum.',
    rating: 1,
    game: 'dolor',
  },
  {
    user: 'Walter',
    title: 'excepturi',
    body: 'Et optio possimus non eum.',
    rating: 2,
    game: 'quo',
  },
  {
    user: 'Darion',
    title: 'magnam',
    body: 'Omnis labore impedit.',
    rating: 3,
    game: 'laboriosam',
  },
  {
    user: 'Haylee',
    title: 'eum',
    body: 'Officia consequatur pariatur alias totam aspernatur.',
    rating: 4,
    game: 'eum',
  },
  {
    user: 'Danika',
    title: 'aut',
    body: 'Ut error itaque fuga nostrum qui non cum.',
    rating: 5,
    game: 'minima',
  },
  {
    user: 'Vickie',
    title: 'maiores',
    body: 'Et saepe distinctio necessitatibus nulla nisi et aut alias optio.',
    rating: 1,
    game: 'dolor',
  },
  {
    user: 'Tamara',
    title: 'odio',
    body: 'Fuga beatae eos.',
    rating: 2,
    game: 'et',
  },
];
