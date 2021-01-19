import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import { useHistory, useParams } from "react-router-dom";
import * as FirestoreService from '../services/firebase/firestore';
import Form from 'react-bootstrap/Form'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import SignIn from "./SignIn";

function LobbyStart() {
    const [user] = useAuthState(FirestoreService.auth);
    let {code} = useParams();
    console.log(code);

    const query = FirestoreService.db.collection('lobby').where("code", "==", code);
    const [game, loading] = useCollectionData(query);
    console.log(loading);
    return (<div>
        
            {!loading && <Game game={game} user={user}/> }    
        </div>
        );
}
// function LobbyInvalid() {
//     let history = useHistory();
//     const reRoute = () =>{
//         history.push("/");
//     }
    
//     return (<div>
//                 <h1>This Lobby is invalid</h1>
//                 {reRoute()}  
//              </div>
//         );
// }

// function PlayerList(props){
//     let history = useHistory();
//     const list = props.game[0].playerList;
//     // console.log(list);
//     const playerlist = list.map((player) => <h1>{player.name}</h1>);

//     useEffect(() => { 
//         let playerValid = false;
//         for(let player = 0; player < list.length; player++){
//             if (list[player].name === props.user.displayName){
//                 playerValid = true;
//             }
//         }
//         if (playerValid === false){
//             history.push("/");
//         } else {
//             console.log("Great you belong here!");
//         }
        
//     });
//     return (<div>{playerlist}</div>);
// }
function Game(props){
    let history = useHistory();
    console.log("This is Game loading...")
    const list = props.game[0].playerList;
    // console.log(list);
    const playerlist = list.map((player) => <h1>{player.name}</h1>);
    let isHost = false;
    if (props.game[0].host === props.user.uid){
        isHost = true;
    }
    useEffect(() => { 
        let playerValid = false;
        for(let player = 0; player < list.length; player++){
            if (list[player].name === props.user.displayName){
                playerValid = true;
            }
        }
        if (playerValid === false){
            history.push("/");
        } else {
            console.log("Great you belong here!");
        }
    }, []);

    useEffect(() => { 
        if(props.game[0].inSession){
            let url = "/lobby/"+props.game[0].code+"/start";
            history.push(url);
        }
        
    }, []);
    return (<div>
        <div>
            <h1>Code</h1>
        </div>
        <div>
            <h2>Players</h2>
            <div>
                <div>{playerlist}</div>
            </div>
        </div>
        {isHost && <StartButton gameCode={props.game[0].code}/>}
        </div>);
}
function StartButton(props){
    //let setUpSuccessful = true;
    const [startButtonClicked, setStartButtonClicked] = useState(false);
    const handleStartGame = () => {
        setStartButtonClicked(true);
        let setUpSuccessful = FirestoreService.setUpGame(props.gameCode);
        if(setUpSuccessful){
            FirestoreService.startGame(props.gameCode);
        } else {
            console.log("Something went wrong, try again later!");
            setStartButtonClicked(false);
        }
    }
 return(<Button variant="outline-primary" size="lg" disabled={startButtonClicked} onClick={handleStartGame}>Start Game</Button>);
//  <Button variant="outline-primary" size="lg" onClick={handleSignIn}>Sign In</Button>
}


export default function Lobby() {
    const [user] = useAuthState(FirestoreService.auth);
    let {code} = useParams();
    const [lobbyExist, setLobbyExist] = useState(false);

    // const checkGameCode = async() => {
    //     console.log(code);
    //    let verified = await FirestoreService.verifyGameCode(code);
    //    console.log(verified);
    //    setLobbyExist(verified);
    // }
    
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
