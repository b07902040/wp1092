import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import ChatRoom from './containers/ChatRoom';
import SignIn from './containers/SignIn';


const LOCALSTORAGE_KEY = "save-me"
const App = () =>{


  const [signedIn, setSignedIn] = useState(false);
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)
  const [me, setMe] = useState(savedMe ?? "")
  useEffect(()=>{
    if(signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me)
    }
  }, [signedIn])
  return (
    <div className="App">
      {signedIn? <ChatRoom me={me}/> : <SignIn me={me} setMe={setMe} setSignedIn={setSignedIn}/>}
    </div>
  )
}

export default App;
