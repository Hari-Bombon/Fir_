import Web3 from "web3";
import ABI from "./abi.json";
import { ethers } from "ethers";

const isBrowser = () => typeof window !== "undefined";
const { ethereum } = isBrowser();
if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}
const CONTRACT_ADDRESSES = "0xd152e596282EFb9b3aE708Cb7e5389A9d4fe755f";

export const Filecomplaint = async ({ title, description, ipfsHash }) => {
  console.log("initializing contract");
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  console.log("network", network);
  const contractAddress = CONTRACT_ADDRESSES;

  const Role = new ethers.Contract(contractAddress, ABI, signer);
  const tokenId = await Role.fileComplaint(title, description, ipfsHash);
  return tokenId;
};

export const getOfficer = async () => {
  console.log("Initializing contract to access public variables");
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  console.log("Connected to network:", network.name);

  const contractAddress = CONTRACT_ADDRESSES;
  const Role = new ethers.Contract(contractAddress, ABI, signer);
  const officerAddress = await Role.officer();

  return officerAddress;
};

export const getComplaints = async ({ id }) => {
  console.log("Initializing contract to access public variables");
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  console.log("Connected to network:", network.name);

  const contractAddress = CONTRACT_ADDRESSES;
  const Role = new ethers.Contract(contractAddress, ABI, signer);
  const officerAddress = await Role.Complaints(id);

  return officerAddress;
};

export const ApproveComplaint = async ({ id, aRemark }) => {
  console.log("Initializing contract to access public variables");
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  console.log("Connected to network:", network.name);

  const contractAddress = CONTRACT_ADDRESSES;
  const Role = new ethers.Contract(contractAddress, ABI, signer);
  const officerAddress = await Role.approveComplaint(id, aRemark);

  return officerAddress;
};

export const DiscardComplaint = async ({ id, aRemark }) => {
  console.log("Initializing contract to access public variables");
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  console.log("Connected to network:", network.name);

  const contractAddress = CONTRACT_ADDRESSES;
  const Role = new ethers.Contract(contractAddress, ABI, signer);
  const officerAddress = await Role.discardComplaint(id, aRemark);

  return officerAddress;
};

export const ResolveComplaint = async ({ rId, rRemark }) => {
  console.log("Initializing contract to access public variables");
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  console.log("Connected to network:", network.name);

  const contractAddress = CONTRACT_ADDRESSES;
  const Role = new ethers.Contract(contractAddress, ABI, signer);
  const officerAddress = await Role.resolveComplaint(rId, rRemark);

  return officerAddress;
};

export const getNextID = async () => {
  console.log("Initializing contract to access public variables");
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  console.log("Connected to network:", network.name);

  const contractAddress = CONTRACT_ADDRESSES;
  const Role = new ethers.Contract(contractAddress, ABI, signer);
  const nextid = await Role.nextId();

  return nextid;
};

export const PendingApprovals = async ({ id }) => {
  console.log("Initializing contract to access public variables");
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  console.log("Connected to network:", network.name);

  const contractAddress = CONTRACT_ADDRESSES;
  const Role = new ethers.Contract(contractAddress, ABI, signer);
  const nextid = await Role.pendingApprovals(id);

  return nextid;
};

export const PendingResolutions = async ({ rId }) => {
  console.log("Initializing contract to access public variables");
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  console.log("Connected to network:", network.name);

  const contractAddress = CONTRACT_ADDRESSES;
  const Role = new ethers.Contract(contractAddress, ABI, signer);
  const nextid = await Role.pendingResolutions(rId);

  return nextid;
};

export const CalcPendingResolutionIds = async () => {
  console.log("Initializing contract to access public variables");
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  console.log("Connected to network:", network.name);

  const contractAddress = CONTRACT_ADDRESSES;
  const Role = new ethers.Contract(contractAddress, ABI, signer);
  const nextid = await Role.calcPendingResolutionIds();

  return nextid;
};

export const CalcPendingApprovalIds = async () => {
  console.log("Initializing contract to access public variables");
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  const signer = provider.getSigner();
  const network = await provider.getNetwork();
  console.log("Connected to network:", network.name);

  const contractAddress = CONTRACT_ADDRESSES;
  const Role = new ethers.Contract(contractAddress, ABI, signer);
  const nextid = await Role.calcPendingApprovalIds();

  return nextid;
};
