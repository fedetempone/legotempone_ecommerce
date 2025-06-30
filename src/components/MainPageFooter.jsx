import { useState } from "react";
import Footer from "../components/Footer";
import PagesInfo from "./pages/PagesInfo";

const MainPageFooter = () => {
  const [activeSection, setActiveSection] = useState("grupo");

  return (
    <>
      <PagesInfo activeSection={activeSection} setActiveSection={setActiveSection} />
      <Footer setActiveSection={setActiveSection} />
    </>
  );
};

export default MainPageFooter;
