import React from "react";
import "../AdvanceTasadofi.css";
import Header from "../components/AdvanceTasadofi/Header";
import Footer from "../components/AdvanceTasadofi/Footer";
import AdventureSection from "../components/AdvanceTasadofi/AdventureSection";

const AdvanceTasadofi: React.FC = () => {
  return (
    <div className="tasadofi-wrapper">
      <Header />
      <AdventureSection />
      <Footer />
    </div>
  );
};

export default AdvanceTasadofi;
