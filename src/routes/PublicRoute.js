//import router modules
import { Route } from "react-router-dom";

//components
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicRoute = ({ component: Component, ...rest }) => {
  //public route does not care if user already logged in but user 

  // jwt token logic should happen here to determine if the user is logged in
  // we can also get singular user data here such as a user key for the pages to use
  // right now it does not really verify that it is the right jwt token, just that there is a jwt token
  let isLoggedIn = false;
  if (localStorage.getItem("jwt-simulation")) {
    isLoggedIn = true;
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <div className="page-container">
          <Header isLoggedIn={isLoggedIn} />
          <Component {...props} />
          <Footer />
        </div>
      )}
    />
  );
};

export default PublicRoute;
