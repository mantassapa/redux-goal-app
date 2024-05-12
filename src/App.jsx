import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/login/Login';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/main/Main';
import { useDispatch } from 'react-redux';
import { setingItems } from './features/goalsSlice';
import Users from './components/main/Users';

function App() {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("User")))
  const [showLogin, setShowLogin] = useState(userData===null?1:0)
  const [showMain, setShowMain] = useState(userData===null?0:1)
  // console.log(userData);
  const dispatch = useDispatch()
  if(userData){dispatch(setingItems(userData?.goals))}


  return (
    <div className="App">
      <Header userData={userData} setUserData={setUserData} setShowLogin={setShowLogin} showLogin={showLogin} setShowMain={setShowMain}/>
      <Login showLogin={showLogin} setShowLogin={setShowLogin} setUserData={setUserData} setShowMain={setShowMain}/>
      {showMain===1?
      <Main userData={userData}/>:null}
      {showMain===0?
      <Users userData={userData}/>:null}
      <Footer/>
    </div>
  );
}

export default App;
