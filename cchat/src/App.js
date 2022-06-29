import './App.css';
import {Join} from './Component/Join/Join';
import Chat from './Component/Chat/Chat';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
       <Router>
         <Routes>
           <Route exact path='/' element={<Join/>}/>
           <Route path='/chat' element={<Chat/>}/>
         </Routes>
       </Router>
    </div>
  );
}

export default App;
