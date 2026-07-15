// import { StrictMode } from "react";
import $ from "jquery";
import "jquery-ui/themes/base/all.css";
import "jquery-ui/ui/widgets/datepicker";
import "./layouts/admin/js/bootstrap.min.js";
import "slick-carousel";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";
import PaymentAlert from "./components/PaymentAlert.jsx";
import "./index.css";
import "./layouts/user/js/common.js";
import store from "./redux/store.js";

window.$ = $;
window.jQuery = $;

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <ToastContainer />
    {/* <PaymentAlert /> */}
    <App />
  </Provider>
  // </StrictMode>
);

