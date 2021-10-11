import "./App.css";

//semantic UI modules
import "semantic-ui-css/semantic.min.css";

//import router modules
import { Route, BrowserRouter as Router } from "react-router-dom";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import House from "./pages/House";
import Blog from "./pages/Blog";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <div className="page-container">
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/house">
          <House />
        </Route>
        <Route path="/house-blog">
          <Blog />
        </Route>
        <Route path="/house-search">
          <Search />
        </Route>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
