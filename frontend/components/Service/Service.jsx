import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Service.module.css";
import images from "../../img";
const Service = () => {
  return (
    <div className={Style.service}>
      <div className={Style.service_box}>
      <div className={Style.service_box_item}>
          <Image
            src={images.service1}
            alt="Set Up Your Wallet"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 1</span>
          </p>
          <h3>Set Up Your Wallet</h3>
          <p>
          Set up your wallet of choice, by clicking the wallet icon in the top right corner.
          </p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service2}
            alt="Create Your NFT"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 2</span>
          </p>
          <h3>Create Your NFT</h3>
          <p>
          Once you’ve set up your wallet of choice, upload your digital art or generate it through a prompt
          </p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service3}
            alt="Store And Manage"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 3</span>
          </p>
          <h3>Store And Manage</h3>
          <p>
          Once you have created your NFT, you can store and manage its ownership
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;