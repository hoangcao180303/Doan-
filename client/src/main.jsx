import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "./components/ui/toaster.jsx";
import Footer from "./components/shopping-view/footer.jsx";
import ScrollToTopButton from "./components/shopping-view/scrolltotop.jsx";
import TawkTo from "./talkto.js";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster />
      <ScrollToTopButton/>
    </Provider>
  </BrowserRouter>
);