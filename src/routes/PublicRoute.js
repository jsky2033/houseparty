//import router modules
import { Route } from "react-router-dom";

//components
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <div className="page-container">
          <Header />
          <Component {...props} />
          <Footer />
        </div>
      )}
    />
  );
};

export default PublicRoute;
