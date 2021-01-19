import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import { useHistory, useParams } from "react-router-dom";
import * as FirestoreService from '../services/firebase/firestore';
import Form from 'react-bootstrap/Form'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SignIn from "./SignIn";

export default function Lobby() {
    const [user] = useAuthState(FirestoreService.auth);
    let {code} = useParams();
    const [lobbyExist, setLobbyExist] = useState(false);
    const query = FirestoreService.db.collection('lobby').where("code", "==", code);
    const [game, loading] = useCollectionData(query);

    
    
    return (
    
        <div className="App">
            <header className="App-header">
                <h3>Hanabi</h3>
            </header>
            <body  className="App-body">
                <div>
                    {user && <LobbyStart />  }
                    {!user &&  <SignIn />}
                </div>
            </body>
        </div>
    );
}