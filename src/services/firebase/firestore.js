import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import GameCodeGenerator from '../../tools/generator/GameCodeGenerator';
import CardShuffler from '../../tools/generator/CardShuffler';

const firebaseConfig = {
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore();
export const auth = firebase.auth();

// const [user] = useAuthState(auth);

export const authSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

export const createLobby = async () => {
    // db.collection('lobby').add
    let gameCodeExists = false;
    let result;
    let gameCode = null;
    while (!gameCodeExists){
        try {
            gameCode = GameCodeGenerator();
            result = await verifyGameCode(gameCode);
            if (!result){
                try{
                    await db.collection('lobby').doc(gameCode).set({
                        host: auth.currentUser.uid,
                        playerCount: 1,
                        inSession: false,
                        playerList: [{name: auth.currentUser.displayName, id: auth.currentUser.uid}],
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        code: gameCode
                    })    
                    gameCodeExists = true;
                } catch (err){
                    console.log(err);
                }
            } 
        } catch(err) {
            console.log(err);
        }
    }

    if (gameCode != null && gameCodeExists){
        return {code: gameCode, status: 200};
    } else if (gameCode === null){
        return {code: null, status: 500};
    } else {
        return {code: null, status: 500};
    }

}
export const startGame = async(gameCode) => {
    db.collection('lobby').doc(gameCode).update({
        inSession: true,
    })    
}
export const setUpGame = async(gameCode) => {
    // return
    let setUpSuccessful = false;
    try{
        let shuffledDeck = CardShuffler();
        console.log(shuffledDeck);
        await db.collection('lobby').doc(gameCode).update({
            shuffledCards: shuffledDeck,
            hints: 8,
            fuse: 4
        });
        setUpSuccessful = true;
    } catch(err){
        console.log(err);
    }
    return setUpSuccessful;
     
}
export const joinLobby = async (gameCode) => {
    console.log(gameCode)
    let result = await verifyGameCode(gameCode);
    if (result){
        try{
            db.collection('lobby').doc(gameCode).update({
                playerCount: firebase.firestore.FieldValue.increment(1),
                playerList: firebase.firestore.FieldValue.arrayUnion({name: auth.currentUser.displayName, id: auth.currentUser.uid})
            });
            return {code: gameCode, status: 200};
        } catch (err){
            console.log(err);
        }
    } else {
        console.log("Join DID NOT WORK")
        return {code: null, status: 500};
    }


}

export const verifyGameCode = async(code) => {
    return await db.collection('lobby').doc(code).get().then(querySnapshot => {return querySnapshot.exists;});
}
// const verifyPlayer = async(code) => {
//     return await db.collection('lobby').doc(code).get().then(function(doc) {
//         if (doc.exists) {
//             for (let player = 0; player < doc.data().playerList )
//             return doc.data().playerList;
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//     })
// }
// const getPlayerCount = async(code) => {
//     return await db.collection('lobby').doc(code).get().then(function(doc) {
//         if (doc.exists) {
//             return doc.data().playerCount;
//         } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//         }
//     })
// }