import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { JoinRoom } from './components/JoinRoom/JoinRoom.jsx';
import { Chat } from './components/Chat/Chat.jsx';

function App() {
  return (
    <Router>
     <Routes>
     <Route path="/" element={<JoinRoom/>} />
     <Route path="/chat" element={<Chat/>} />
     </Routes>
    </Router>
  );
}

export default App;
