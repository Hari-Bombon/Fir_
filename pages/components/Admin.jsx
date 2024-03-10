"use client";
import React, { useState } from "react";
import {
  ApproveComplaint,
  CalcPendingApprovalIds,
  CalcPendingResolutionIds,
  DiscardComplaint,
  PendingApprovals,
  PendingResolutions,
  ResolveComplaint,
} from "@/config/BlockchainServices";

const Getter = () => {
  const [id, setId] = useState(0);
  const [rId, setRId] = useState(0);
  const [aRemark, setARemark] = useState("");
  const [rRemark, setRRemark] = useState("");
  const [pendingApprovals, setpendingApprovals] = useState("");
  const [pendingResolutions, setpendingResolutions] = useState("");

  const getPendingApprovals = async () => {
    try {
      const data = await CalcPendingApprovalIds();
      const data2 = await PendingApprovals({ id });
      setpendingApprovals(data2);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const getPendingResolutions = async () => {
    try {
      const data = await CalcPendingResolutionIds();
      const data2 = await PendingResolutions({ rId });
      setpendingResolutions(data2);
      console.info("contract CalcPendingResolutionIds successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const handleApproveComplaint = async () => {
    try {
      const data = await ApproveComplaint({ id, aRemark });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const handleDeclineComplaint = async () => {
    try {
      const data = await DiscardComplaint({ id, aRemark });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const handleResolveComplaint = async () => {
    try {
      const data = await ResolveComplaint({ rId, rRemark });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <div className="getter-container md:p-[30px]  md:m-5 xl:flex xl:flex-row">
      <div className="getter-card md:m-5">
        <p className="getter-card-title">Pending Approvals</p>
        <div className="flex items-center mt-3">
          <button
            className="button-common hover:bg-blue-900"
            onClick={getPendingApprovals}
          >
            Next Pending Approval ID
          </button>
          {pendingApprovals && (
            <p className="getter-card-number">
              : {pendingApprovals.toString()}
            </p>
          )}
        </div>

        <div className="md:flex items-center">
          <p className="text-2xl font-semibold">Complaint Id: </p>
          <input
            type="number"
            className="p-1 m-1 md:w-[500px] w-[200px] rounded-sm bg-[#D2DAFF]"
            placeholder="Enter Id Here"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </div>
        <div className="md:flex items-center">
          <p className="text-2xl font-semibold">Your Remark: </p>
          <input
            type="text"
            className="p-1 m-1 md:w-[500px] w-[200px] rounded-sm bg-[#D2DAFF]"
            placeholder="Enter Remark Here"
            onChange={(e) => {
              setARemark(e.target.value);
            }}
          />
        </div>
        <div className="flex">
          <button
            className="button-common hover:bg-blue-900"
            onClick={handleApproveComplaint}
          >
            Approve Complaint
          </button>
          <button
            className="button-common hover:bg-blue-900"
            onClick={handleDeclineComplaint}
          >
            Decline Complaint
          </button>
        </div>
      </div>
      <div className="getter-card md:m-5">
        <p className="getter-card-title">Pending Resolutions</p>
        <div className="flex items-center mt-3">
          <button
            className="button-common hover:bg-blue-900"
            onClick={getPendingResolutions}
          >
            Next Pending Resolution ID
          </button>
          {pendingResolutions && (
            <p className="getter-card-number">
              : {pendingResolutions.toString()}
            </p>
          )}
        </div>

        <div className="md:flex items-center">
          <p className="text-2xl font-semibold">Complaint Id: </p>
          <input
            type="number"
            className="getter-input md:w-[500px]"
            placeholder="Enter Id Here"
            onChange={(e) => {
              setRId(e.target.value);
            }}
          />
        </div>
        <div className="md:flex items-center">
          <p className="text-2xl font-semibold">Your Remark: </p>
          <input
            type="text"
            className="getter-input md:w-[500px]"
            placeholder="Enter Remark Here"
            onChange={(e) => {
              setRRemark(e.target.value);
            }}
          />
        </div>
        <button
          className="button-common hover:bg-blue-900"
          onClick={handleResolveComplaint}
        >
          Resolve Complaint
        </button>
      </div>
    </div>
  );
};

export default Getter;
