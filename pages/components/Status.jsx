import React, { useState } from "react";
import { getComplaints } from "@/config/BlockchainServices";

const Status = () => {
  const [id, setId] = useState();
  const [Complaints, setComplaints] = useState();

  async function getcomplaintdata() {
    const data = await getComplaints({ id });
    setComplaints(data);
    console.log(data);
  }

  function downloadFile() {
    if (!Complaints || !Complaints.ipfsHash) {
      alert("No file to download!");
      return;
    }
    const ipfsGateway = "https://ipfs.io/ipfs/";
    const fileUrl = `${ipfsGateway}${Complaints.ipfsHash}`;
    window.open(fileUrl, "_blank");
  }

  return (
    <div className="status-container">
      <div className="status">
        <p className="status-title">Check Status of Your Complaint:</p>
        <div className="flex items-center justify-center">
          <p className="status-text">Complaint ID:</p>
          <input
            type="number"
            className="status-input md:w-[300px]"
            placeholder="Enter Complaint ID"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <button onClick={getcomplaintdata}>Get Data</button>
        </div>
      </div>
      {Complaints && Complaints.title && (
        <div className="status-render-container md:w-[600px]">
          <p className="status-render-title">Complaint Details:</p>
          <p className="status-render-text">
            Complaint Id: {Complaints.id.toString()}
          </p>
          <p className="status-render-text">
            Complaint by: {Complaints.complaintRegisteredBy.toString()}
          </p>
          <p className="status-render-text">
            Complaint File Hash: {Complaints.ipfsHash.toString()}
          </p>
          <p className="status-render-text">
            Complaint Title: {Complaints.title}
          </p>
          <p className="status-render-text">
            Approval Status:{" "}
            {Complaints.isApproved
              ? "Approved"
              : !Complaints.exists
              ? "Declined"
              : "Approval Pending"}
          </p>
          <p className="status-render-text">
            Approval Remark: {Complaints.approvalRemark}
          </p>
          <p className="status-render-text">
            Resolution Status:{" "}
            {Complaints.isResolved ? "Resolved" : "Resolution pending"}
          </p>
          <p className="status-render-text ">
            Resolution Remark: {Complaints.resolutionRemark}
          </p>
          <div className="flex space-x-2 mb-5">
            <p className="status-render-text">Click here to View the file:</p>
            <button onClick={downloadFile}>View</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
