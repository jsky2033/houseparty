//import router modules
import { Route, Redirect } from "react-router-dom";

//components
import Header from "../components/Header";
import Footer from "../components/Footer";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // jwt token logic should happen here to determine if the user is logged in
  // we can also get singular user data here such as a user key for the pages to use
  // right now it does not really verify that it is the right jwt token, just that there is a jwt token
  let isLoggedIn = false;
  if (localStorage.getItem("jwt")) {
    isLoggedIn = true;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <div className="page-container">
            <Header isLoggedIn={isLoggedIn} />
            <Component {...props} />
            <Footer />
          </div>
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
