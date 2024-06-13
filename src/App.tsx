// src/App.tsx

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Admin from './components/Admin';
import Quiz from './components/Quiz';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import PlayQuiz from './components/PlayQuiz';

const App: React.FC = () => {



 

  return (
    <Router>
      <div className="container  ">
        
        <Routes>
          <Route path="/admin" element={<Admin /> }  />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/playQuiz" element={<PlayQuiz />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
