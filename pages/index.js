"use client";
import Head from "next/head";
import Complaint from "./components/Complaint";
import Admin from "./components/Admin";
import Header from "./components/Header";
import Status from "./components/Status";
import { useAddress } from "@thirdweb-dev/react";
import { getOfficer } from "@/config/BlockchainServices";
import { useEffect, useState } from "react";

export default function Home() {
  const address = useAddress();
  const [officeradd, SetOfficerAdd] = useState("");
  async function getofficer() {
    const data = await getOfficer();
    SetOfficerAdd(data);
  }
  useEffect(() => {
    getofficer();
  }, [address]);
  return (
    <div className="">
      <Head>
        <title>Complaint App</title>
        <meta name="description" content="This is a police complaint app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Complaint />
      <Status />
      {officeradd === address && <Admin />}
    </div>
  );
}
