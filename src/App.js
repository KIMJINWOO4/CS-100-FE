import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import User from './User';
import Quiz from './Quiz';
import Login from './Login';
import Signup from './Signup';
import QuizResult from './QuizResult';
import ExamCreation from './ExamCreation';
import ProblemCreation from './ProblemCreation';

function App() {
    return (
        <BrowserRouter basename='https://cs-100.netlify.app'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/result' element={<QuizResult />} />
                <Route path='/user' element={<User />} />
                <Route path='/quiz' element={<Quiz />} />
                <Route path='/create-exam' element={<ExamCreation />} />
                <Route path='/create-problem' element={<ProblemCreation />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
