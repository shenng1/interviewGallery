import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Home from  './pages/Home.js';

const customHistory = createBrowserHistory();

function App() {
  return (
    <Router history={customHistory}>
      <Route path="/">
        <Home />
      </Route>
    </Router>
  );
}

export default App;
