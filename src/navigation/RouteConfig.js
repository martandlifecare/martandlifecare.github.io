import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import routeConstants from '../navigation/RouteConstants.json';
import HomeScreen from "../screens/HomeScreen";
import ProductsScreen from "../screens/ProductsScreen";
import Navbar from "./Navbar";

/* Function to load components based on routing */
export default function RouteConfig() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Navbar />
      <Routes>
        <Route exact path={routeConstants.basePath} element={<Navigate to={routeConstants.homeScreenPath} />} />
        <Route path={routeConstants.homeScreenPath} element={<HomeScreen />} />
        <Route path={routeConstants.productsScreenPath} element={<ProductsScreen />} />
        <Route path="*" element={<Navigate to={routeConstants.homeScreenPath} />} />
      </Routes>
    </Router>
  );
}

