import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/Privaterouter';
import Wordle from './wordle';

export default function App(){

    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route
               path='/wordle'
               element={
               <PrivateRoute>
                 <Wordle />
               </PrivateRoute>
               }>
               </Route>

        </Routes>
        </BrowserRouter>

    )
}