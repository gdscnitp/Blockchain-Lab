import "../styles/globals.css";

//internal import
import { NavBar, Footer } from "../components/componentindex";


const MyApp = ({ Component, pageProps }) => (
  <div>
    <NavBar />
    <Component {...pageProps} />
    <Footer />
  </div>
);

export default MyApp;