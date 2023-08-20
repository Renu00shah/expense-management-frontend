import './App.css';
import{Routes,Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Pagenotfound from './pages/Pagenotfound';
import User from './pages/User';
import Register from './pages/Register';
import Login from './pages/Login';
import Toaster from 'react-hot-toast'

function App() {
  return (
    <>
          <Toaster position='top-right'/>
      
      <Routes>
        <Route path='/' element={<ProtectedRoutes><HomePage/></ProtectedRoutes> } />
        <Route path='/user' element={ <User/>} />
        <Route path='/*' element={<Pagenotfound />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
              </Routes>

      
    </>
    );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children
  }
  else {
    return <Navigate to='/login'/>
  }
}

export default App;
