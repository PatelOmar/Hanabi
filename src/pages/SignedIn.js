import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import * as FirestoreService from '../services/firebase/firestore';
import Form from 'react-bootstrap/Form'

export default function SignedIn() {
    let history = useHistory();

    const [gameLobby, setGameLobby] = useState({lobby:null, submit: false});
    const toggleButtons = () => {
        let temp = {...gameLobby, submit: !gameLobby.submit}
        setGameLobby(temp);
    }
    const handleGameCode = (code) => {
        if (code.trim() === ""){
            let temp = {...gameLobby, lobby: null}
            setGameLobby(temp);
        } else {
            let temp = {...gameLobby, lobby: code}
            setGameLobby(temp);
        }
    }
    const handleCreateLobby = async() => {
        console.log("Create Lobby worked");
        // history.push("/about");
        toggleButtons();
        let gameCode = await FirestoreService.createLobby();
        console.log(gameCode);
        if(gameCode){
            let gameUrl =  "/lobby/" + gameCode.code;
            history.push(gameUrl);
        } else {
            console.log("Sorry try again later :(");
            toggleButtons();
        }
    }
    const handleJoinGame = async() => {
        console.log("Join Game Worked");
        toggleButtons();
        if(gameLobby.lobby != null){
            let gameCode = await FirestoreService.joinLobby(gameLobby.lobby);
            if (gameCode.status === 200){
                let gameUrl =  "/lobby/" + gameCode.code;
                history.push(gameUrl);
            }
            else {
                console.log("Sorry try again later(");
                toggleButtons();
            }
        } else {
            console.log("Sorry try again later :(");
            toggleButtons();
        }
    }
    return (
        <div>
            <Form>
                <Form.Group controlId="ControlInput2">
                    <Form.Label>Game Code</Form.Label>
                    <Form.Control type="name" placeholder="Type Here..." onChange={(e) => handleGameCode(e.target.value)} />
                </Form.Group>
            </Form>
            <div className="Page-home-buttons">
                <Button variant="outline-primary" size="lg" disabled={gameLobby.submit} onClick={handleCreateLobby}>Create Lobby</Button>
                <span className="Spacer"/>
                <Button variant="outline-info"  size="lg" disabled={gameLobby.submit} onClick={handleJoinGame}>Join Game</Button> 
            </div> 
        </div> 
    )
}