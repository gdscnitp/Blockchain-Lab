import React from "react";

//INTERNAL IMPORT
import Style from "../styles/index.module.css";
import {
  HeroSection,
  Service,
  Title,
  NFTCard,
} from "../components/componentindex";

const Home = () => {
  return (
    <div className={Style.container}>
      <HeroSection />
      <Service />
      <Title
        heading="Our NFT Gallery"
        paragraph="Browse more NFT Artworks Created by NFTify NFT Generator"
      />
      <NFTCard />
    </div>
  );
}

export default Home;