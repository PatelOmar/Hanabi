import React, { useState } from "react";
import Button from 'react-bootstrap/Button'
import { useHistory } from "react-router-dom";
import * as FirestoreService from '../services/firebase/firestore';
import Form from 'react-bootstrap/Form'
import SignIn from "./SignIn";
import SignedIn from "./SignedIn";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Home() {
    const [user] = useAuthState(FirestoreService.auth);
    return (
    <div className="App">
    <header className="App-header">
        <h3>Hanabi</h3>
    </header>
    <body  className="App-body">
        {user ? <SignedIn /> : <SignIn /> } 
    </body>
    </div>);
}

//   <Form.Group controlId="formBasicEmail">
//     <Form.Label>Email address</Form.Label>
//     <Form.Control type="email" placeholder="Enter email" />
//     <Form.Text className="text-muted">
//       We'll never share your email with anyone else.
//     </Form.Text>
//   </Form.Group>
