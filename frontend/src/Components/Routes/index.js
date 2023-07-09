import { Routes, Route } from "react-router-dom";
import Products from "../Products";
import PrivacyPolicy from "../Footer/privacyPolicy";
import ReturnPolicy from "../Footer/returnPolicy";
import TnC from "../Footer/tnc";
import ContactUs from "../Footer/contactUs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />}></Route>
      <Route path="/:categoryId" element={<Products />}></Route>
      <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
      <Route path="/return-policy" element={<ReturnPolicy />}></Route>
      <Route path="/tnc" element={<TnC />}></Route>
      <Route path="/contact-us" element={<ContactUs />}></Route>
    </Routes>
  );
};
export default AppRoutes;
