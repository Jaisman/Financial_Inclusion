import Login from "./components/Login"
import Register from "./components/Register";
import Dashboard from './components/Dashboard';
import AICreditScoreInsights from "./components/Credit";
import ProfilePage from "./components/Profile";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/credit" element={<AICreditScoreInsights/>}/>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
