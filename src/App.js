import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Task from './Components/Task';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from "./store"
import { actions } from './store';
import isLogin from './utils/isLogin';
import {useNavigate} from "react-router-dom"
function App() {
  const [state, dispatch] = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    async function checkIsLogin() {
      const checkLogin = await isLogin();
      if (!checkLogin.login_state) {
        dispatch(actions.setLogin(false));
      } else {
        dispatch(actions.setLogin(true));
        navigate("/tasks")
      }
    }
    checkIsLogin();
  }, [dispatch, navigate])
  console.log("login state: ", state.isLogin);
  return (
    <div className="App bg-blue-50 ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
