import './styles.css';
import { Routes,Route, BrowserRouter} from 'react-router-dom';
import Home from'./component/Home';
import Nave from './component/Nave';
import Aichating from './component/Aichating';
import Faq from './component/Faq';
import Board from './component/Board';
import Login from './component/Login';
import SignUp from './component/Sign_up';
import BoardCreate from './component/BoardCreate';
import BoardDetails from './component/BoardDetails';
import Gathertown from './component/Gathertown';
import GatherWebSocket from './component/GatherWebSocket';
import axios from 'axios';
import { useEffect, useState } from 'react';

const {SPACE_ID,API_KEY} =require("./confing");
const apiKey = process.env.NEXT_PUBLIC_GATHER_API_KEY;

console.log("Gather API Key:", apiKey);
const URL = "http://localhost:8080"


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token&&username) {
      setIsAuthenticated(true);  // 토큰이 있으면 로그인 상태로 설정
    }
  }, [isAuthenticated]);
  
//----------로그인/로그아웃/회원가입----------------------//
  const login= async ({email,password})=>{
    try {
      const response = await axios.post(URL+'/user/login', {
        email:email,
        password: password,
      });
      // 로그인 성공 시 JWT를 로컬 스토리지에 저장
      if (response.status === 200) {
        const {token,username} = await response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setIsAuthenticated(true);
        return true
      } else {
        console.error('Login failed');
        return false
      }
    } catch (error) {
      console.error('Error logging in:', error);
      return false
    }
  };

  const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setIsAuthenticated(false)
  }
  
  const signup =async({nickname,email,password,name,major})=>{
    try{
      const response = await axios.post(URL+'/user/sign_up', {
        nickname:nickname,
        email:email,
        name:name,
        password: password,
        major:major
      });
      if (response.status === 200) {
          return true
      } else {
          console.error('sign up failed');
          return false
      }
    }
    catch(e){
      console.error(e)
    }
  }

//---------Ai챗봇--------------//
  const Aichat= async(text)=>{
    const token = localStorage.getItem('token');
    try{
      const res = await axios.post(URL+'/ai/generate',{
        message:text,
        headers:{
          Authorization: `Bearer ${token}`
        },
      })
      return res.data
    }catch(e){
      console.error(e);
    }
  }

//--------------게시판CRUD---------------//
 
//--------------gathertown--------------// 
const getMap =async()=>{
  try{
    const newMap = await axios.get(URL+'/Gathertown')
    return newMap.data
  }catch(e){
    console.error(e)
  }
}

const getUsers =async()=>{
  try{
    const newUsers = await axios.get(URL+'/Gathertown/users') 
    return newUsers.data
  }catch(e){
    console.error(e)
  }
}

const getUser = async(id)=>{
  try{
    const newUser =await axios.get(URL+`/Gathertown/user/${id}`)
    return newUser.data
  }catch(e){
    console.error(e)
  }
}

//--------------gathertown--------------//


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Nave isAuthenticated={isAuthenticated} logout={logout}/>}>
          <Route index element={<Home/>}></Route>
          <Route path='/Board' element={<Board/>}></Route>
          <Route path='/Board/Create' element={<BoardCreate/>}></Route>
          <Route path='/Board/:id' element={<BoardDetails />}></Route>
          <Route path='/Aichating' element={<Aichating Aichat={Aichat}/>}></Route>
          <Route path='/Login' element={<Login login={login}/>}></Route>
          <Route path='/SignUp' element={<SignUp signup={signup}/>}></Route>
          <Route path='/Faq' element={<Faq/>}></Route>
          <Route path='/Gathertown' element={<Gathertown getMap={getMap} getUsers={getUsers} getUser={getUser}/>}></Route>
          <Route path='/GatherWeb' element={<GatherWebSocket/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
