import "./scss/base.scss";
import "./scss/toplevel.scss";
import Providers from "./providers/index"

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthorizeRoute from "./components/AuthorizeRoute";
import Signup from "./pages/Signup";

function App() {

  return (
      <Providers>
        <BrowserRouter>
          <Switch>
            <Route path={'/login'} component={Login} />
            <Route path={'/signup'} component={Signup} />
            <AuthorizeRoute path={'/home'} component={Home} redirectPath="/login" exact/>
          </Switch>
        </BrowserRouter>
      </Providers>
  );
}

export default App;
