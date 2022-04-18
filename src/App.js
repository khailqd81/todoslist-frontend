import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Task from './Components/Task';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="App bg-blue-50 ">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
