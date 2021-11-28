import "./App.css";

//semantic UI modules
import "semantic-ui-css/semantic.min.css";

//import router modules
import { BrowserRouter as Router, Switch } from "react-router-dom";

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

// routes
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import LoginRoute from "./routes/LoginRoute";

// Auth Context
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* Landing Pages */}
          <PublicRoute exact path="/" component={Home} />
          <PublicRoute path="/people" component={People} />
          {/* Private Routes */}
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/house" component={House} />
          <PrivateRoute path="/blog" component={Blog} />
          <PrivateRoute path="/search" component={Search} />
          <PrivateRoute path="/userhouse/:dbId" component={UserHouse} />
          <PrivateRoute path="/userblog/:dbId" component={UserBlog} />
          {/* Login Routes */}
          <LoginRoute path="/login" component={Login} />
          <LoginRoute path="/register" component={Register} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
