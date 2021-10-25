import "./App.css";

//semantic UI modules
import "semantic-ui-css/semantic.min.css";

//import router modules
import { BrowserRouter as Router } from "react-router-dom";

// pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import House from "./pages/House";
import Blog from "./pages/Blog";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";

// routes
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import LoginRoute from "./routes/LoginRoute";

function App() {
  return (
    <Router>
      {/* Landing Pages */}
      <PublicRoute exact path="/" component={Home} />
      {/* Private Routes */}
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/house" component={House} />
      <PrivateRoute path="/blog" component={Blog} />
      <PrivateRoute path="/search" component={Search} />
      {/* Login Routes */}
      <LoginRoute path="/login" component={Login} />
      <LoginRoute path="/register" component={Register} />
    </Router>
  );
}

export default App;
