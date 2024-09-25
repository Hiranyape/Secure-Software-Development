import './App.css';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Login } from './pages';
import { Home } from './pages';
import { Header } from './components';
import { ProductDetails } from './pages/ProductDetail';
import { GoogleCallback } from './pages/GoogleCallback';
import { Signup } from './pages/Signup';
import { Profile } from './pages/Profile';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/details/:id">
            <ProductDetails />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/auth/google/callback">
            <GoogleCallback />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
