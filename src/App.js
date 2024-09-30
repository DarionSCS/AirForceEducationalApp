import React from "react";
import "./styles/main.css";
import Home from "./pages/Home";
import Instellingen from "./pages/instellingen/Instellingen";
import Profiel from "./pages/profiel/Profiel";
import AvatarSelectie from "./pages/avatarselectie/AvatarSelectie";
import Prestatie from "./pages/prestaties/Prestatie";
import Landing from "./pages/landing/landing";
import OntwijkSpel from "./pages/ontwijkspel/OntwijkSpel";
import Nieuws from "./pages/nieuws/Nieuws";

import NL from "./pages/missies/NL";
import BE from "./pages/missies/BE";
import DE from "./pages/missies/DE";
import FR from "./pages/missies/FR";
import ML from "./pages/missies/ML";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0, Auth0Provider } from "@auth0/auth0-react";
import { ROUTES } from "./routes/routes";
import Root from "./components/Root";
import PrivateRoute from "./components/authentication/PrivateRoute";

// Font Awesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faWrench, faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faWrench, faStar, faCheckSquare);

function App() {
  const { isLoading, error } = useAuth0();

  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirectUri: window.location.origin,
      }}
      cacheLocation="localstorage"
    >
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path={ROUTES.landing.path} element={<Landing />} />
            <Route path={ROUTES.home.path} element={<PrivateRoute element={Home} />} />
            <Route path={ROUTES.instellingen.path} element={<PrivateRoute element={Instellingen} />} />
            <Route path={ROUTES.profiel.path} element={<PrivateRoute element={Profiel} />} />
            <Route path={ROUTES.avatarSelectie.path} element={<PrivateRoute element={AvatarSelectie} />} />
            <Route path={ROUTES.prestaties.path} element={<PrivateRoute element={Prestatie} />} />
            <Route path={ROUTES.NL.path} element={<PrivateRoute element={NL} />} />
            <Route path={ROUTES.BE.path} element={<PrivateRoute element={BE} />} />
            <Route path={ROUTES.DE.path} element={<PrivateRoute element={DE} />} />
            <Route path={ROUTES.FR.path} element={<PrivateRoute element={FR} />} />
            <Route path={ROUTES.ML.path} element={<PrivateRoute element={ML} />} />
            <Route path={ROUTES.OntwijkSpel.path} element={<PrivateRoute element={OntwijkSpel} />} />
            <Route path={ROUTES.nieuws.path} element={<PrivateRoute element={Nieuws} /> } />
          </Route>
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
