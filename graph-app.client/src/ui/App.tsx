import "./scss/base.scss";
import "./scss/toplevel.scss";
import Providers from "../domain/providers/index"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthorizeRoute from "./components/utility/AuthorizeRoute";
import Signup from "./pages/Signup";
import SavedGraphs from "./pages/savedgraphs/SavedGraphs";

function App() {

  return (
      <Providers>
        <BrowserRouter>
          <Routes>
            <Route path={'/login'} element={<Login />} />
            <Route path={'/signup'} element={<Signup />} />
            <Route path={'/saved'} element={
              <AuthorizeRoute redirectPath="/login" >
                <SavedGraphs />
              </AuthorizeRoute>
            } />
            <Route path={'/'} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Providers>
  );
}

export default App;
