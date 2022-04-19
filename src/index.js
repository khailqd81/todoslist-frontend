import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MyProvider from "./store/Provider"
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Task from './Components/Task';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<App/>}>
            <Route path="signup" element={<SignUp/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="tasks" element={<Task/>}/>
            <Route index element={<Login/>}/>
            <Route path="*" element={<Login/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </MyProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
