import Login from "./components/Login"
import Register from "./components/Register";
import Dashboard from './components/Dashboard';
import AICreditScoreInsights from "./components/Credit";
import ProfilePage from "./components/Profile";
import NGOPage from "./components/Ngo";
import FinancialQuizPage from "./components/FinancialQuizPage";
import EduChat from "./components/EduChat";
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
function App() {

  return (
    <>
     <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/credit" element={<AICreditScoreInsights/>}/>
        <Route path="/ngo" element={<NGOPage/>}/>
        <Route path="/educhat" element={<EduChat/>}/>
        <Route path="/quiz" element={<FinancialQuizPage/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
