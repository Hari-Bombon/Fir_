import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import axios from "axios";
import { Filecomplaint, getNextID } from "@/config/BlockchainServices";

const Complaint = () => {
  const [title, setTitle] = useState("");
  const [nextId, setNextId] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function getnextIdfunction() {
      const data = await getNextID();
      setNextId(data);
    }

    getnextIdfunction();
  }, []);

  const pinFileToIPFS = async (fileToPin) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
    let data = new FormData();
    data.append("file", fileToPin);

    const res = await axios.post(url, data, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: "ce71e94313750493ab7d",
        pinata_secret_api_key:
          "9c91a7ae7c1e945e345ac3de1a3b6b7a984534c92abfb504160b411429f5afcb",
      },
    });
    console.log("hash", res.data.ipfsHash);
    return res.data.IpfsHash;
  };

  const handleComplaint = async () => {
    if (!file) {
      toast.error("Please upload a file.");
      return;
    }

    const notification = toast.loading("Filing Complaint");
    try {
      // First, upload the file to IPFS via Pinata
      const ipfsHash = await pinFileToIPFS(file);
      console.log("ipfshash", title, description, ipfsHash);
      // Then, call your smart contract function with the IPFS hash
      const data = await Filecomplaint({ title, description, ipfsHash });

      toast.success(`Complaint Filed! Note Your ComplaintId:${nextId}`, {
        id: notification,
      });

      console.info("Contract call success", data);
      setTitle("");
      setDescription("");
      setFile(null);
    } catch (err) {
      toast.error("Whoops, something went wrong!", {
        id: notification,
      });
      console.error("Contract call failure", err);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="complaint-container md: mr-[50px] md:ml-[50px]">
      <p className="complaint-title-red">File Your Complaint Here:</p>
      <div className="md:flex items-center">
        <p className="complaint-text-margin">Title: </p>
        <input
          type="text"
          className="container-input md:w-[500px] w-[300px]"
          placeholder="Enter Title Here"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="md:flex items-center">
        <p className="complaint-text-normal">Description: </p>
        <input
          type="text"
          className="container-input md:w-[500px] w-[300px]"
          placeholder="Enter Description Here"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className="md:flex items-center">
        <p className="complaint-text-normal">Upload File: </p>
        <input
          type="file"
          className="container-input md:w-[500px] w-[300px]"
          onChange={handleFileChange}
        />
      </div>
      <button
        className="button-common hover:bg-blue-900"
        onClick={handleComplaint}
      >
        File Complaint
      </button>
    </div>
  );
};

export default Complaint;
