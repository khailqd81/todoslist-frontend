import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Task from './Components/Task';
function App() {
  return (
    <div className="App bg-blue-50 ">
      <Header />
      <Task />
      <Footer />
    </div>
  );
}

export default App;
