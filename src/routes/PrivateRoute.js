//import router modules
import { Route, Redirect } from "react-router-dom";

//components
import Header from "../components/Header";
import Footer from "../components/Footer";

//firebase context
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  //check if current user exists
  const { currentUser } = useAuth();

  console.log(currentUser);

  return (
    <Route
      {...rest}
      render={(props) =>
        currentUser ? (
          <div className="page-container">
            <Header />
            <Component {...props} />
            <Footer />
          </div>
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
};

export default PrivateRoute;
