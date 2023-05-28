import { useState } from "react";

import "./App.css";

//semantic UI modules
import "semantic-ui-css/semantic.min.css";

//import router modules
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import House from "./pages/House";
import Blog from "./pages/Blog";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import People from "./pages/People";
import UserHouse from "./pages/UserHouse";
import UserBlog from "./pages/UserBlog";
import Chat from "./pages/Chat";
import ForgotPassword from "./pages/ForgotPassword";

// todo
import Todo from "./pages/Todo";

// routes
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import LoginRoute from "./routes/LoginRoute";

// Auth Context
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [id, setId] = useState(0);

  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Landing Pages */}
          <PublicRoute exact path="/" component={Home} />
          <PublicRoute path="/people" component={People} />
          <Route path="/project">
            <Todo id={id} setId={setId} />
          </Route>
          {/* Private Routes */}
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/house" component={House} />
          <PrivateRoute path="/blog" component={Blog} />
          <PrivateRoute path="/search" component={Search} />
          <PrivateRoute path="/userhouse/:dbId" component={UserHouse} />
          <PrivateRoute path="/userblog/:dbId" component={UserBlog} />
          <PrivateRoute path="/chat/:dbId" component={Chat} />
          {/* Login Routes */}
          <LoginRoute path="/login" component={Login} />
          <LoginRoute path="/register" component={Register} />
          <LoginRoute path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
