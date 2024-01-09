import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import Home from './Screens/Home';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp.js';
import MyOrders from './Screens/MyOrders.js';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

import { CartProvider } from './Components/ContextReducer.js';

function App() {
  return (
    <CartProvider>
      <>
        <Router>
          <div>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/createUser' element={<SignUp />} />
              <Route exact path='/myOrder' element={<MyOrders />} />
            </Routes>
          </ div>
        </Router>
      </>
    </CartProvider>
  );
}

export default App;

