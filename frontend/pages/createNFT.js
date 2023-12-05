import { useState, useEffect } from "react";
import { NFTStorage, File } from "nft.storage";
import { Buffer } from "buffer";
import axios from "axios";

// Components
import Spinner from "react-bootstrap/Spinner";

function createNFT() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  // State variables to manage form input
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setURL] = useState(null);

  const [isWaiting, setIsWaiting] = useState(false);


  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Call AI API to generate a image based on description
    const imageData = createImage();

    //Upload image to IPFS (NFT.Storage)
    const url = await uploadImage(imageData);

    console.log("url", url);
  };

  const createImage = async () => {
    console.log("Generating image...");

    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0`;

    const response = await axios({
      url: URL,
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        inputs: description,
        options: { wait_for_model: true },
      }),
      responseType: "arraybuffer",
    });

    const type = response.headers["content-type"];
    const data = response.data;

    const base64data = Buffer.from(data).toString("base64");
    const img = `data:${type};base64,` + base64data; // <-- This is so we can render it on the page
    setImage(img);

    return data;
  };

  const uploadImage = async (imageData) => {
    console.log("Uploading Image...");

    // Create instance to NFT.Storage
    const nftstorage = new NFTStorage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEVFYzJiMDFhYjExZDcyOEVCODM5NjJhOEY0QzlkRkNBM2QyMEY0ZjUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY5ODEyNTU3NzM5MiwibmFtZSI6ImZvciBBSSBwcm8ifQ.c5c-3daVx1tyQ9eLnaTmMod7bhkSbokhOtFFHlVf-Iw",
    });

    // Send request to store image

    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: name,
      description: description,
    });

    //save the URL
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setURL(url);

    return url;
  };

  // Perform the NFT creation logic here, including sending data to your backend, blockchain interaction, and IPFS upload.


  return (
    <div>
      <h1>Create NFT</h1>
      <div className="form">
        <form onSubmit={submitHandler}>
          <label>Title:</label> {<br></br>}
          <input
            type="text"
            placeholder="Create a name..."
            onChangeCapture={(e) => {
              setName(e.target.value);
            }}
          />{" "}
          {<br></br>}
          <label>Description:</label> {<br></br>}
          <input
            type="text"
            placeholder="Create a description..."
            onChangeCapture={(e) => {
              setDescription(e.target.value);
            }}
          ></input>{" "}
          {<br></br>} {<br></br>}
          <input type="submit" value="Create & Mint" />
        </form>{" "}
        {<br></br>}
        
        {/*  <div className="image">
          <img src={image} alt="AI generated image" />
        </div>  */}

         <div className="image">
          {!isWaiting && image ? (
            <img src={image} alt="AI generated image" />
          ) : isWaiting ? (
            <div className="image__placeholder">
              <Spinner animation="border" />
              <p>{message}</p>
            </div>
          ) : (
            <></>
          )}
             </div>

        
      </div>
      <p>
        View&nbsp;{" "}
        <a href={url} target="_blank" rel="noreferrer">
          Metadata
        </a>
      </p>
    </div>
  );
}

export default createNFT;
