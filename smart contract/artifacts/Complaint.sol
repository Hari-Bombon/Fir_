// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Complaint {
    address public officer;
    address public owner;
    uint256 public nextId;
    uint256[] public pendingApprovals;
    uint256[] public pendingResolutions;
    uint256[] public resolvedCases;

    struct ComplaintData {
        string title;
        string description;
        string[] evidence;
        string approvalRemark;
        string resolutionRemark;
        bool isApproved;
        bool isResolved;
        bool exists;
    }

    mapping(uint256 => ComplaintData) public Complaints;

    event complaintFiled(uint256 id, address complaintRegisteredBy, string title);

    constructor(address _officer) {
        owner = msg.sender;
        officer = _officer;
        nextId = 1;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "You are not the owner of this smart contract"
        );
        _;
    }

    modifier onlyOfficer() {
        require(
            msg.sender == officer,
            "You are not registered officer of this smart contract"
        );
        _;
    }

    function fileComplaint(string memory _title, string memory _description)
        public
    {
        ComplaintData storage newComplaint = Complaints[nextId];
        newComplaint.id = nextId;
        newComplaint.complaintRegisteredBy = msg.sender;
        newComplaint.title = _title;
        newComplaint.description = _description;
        newComplaint.approvalRemark = "Pending Approval";
        newComplaint.resolutionRemark = "Pending Resolution";
        newComplaint.isApproved = false;
        newComplaint.isResolved = false;
        newComplaint.exists = true;
        emit complaintFiled(nextId, msg.sender, _title);
        nextId++;
    }

    function uploadEvidence(uint256 _id, string memory[] calldata _evidence)
        public
    {
        require(
            Complaints[_id].exists == true,
            "This complaint id does not exist"
        );
        Complaints[_id].evidence.push(_evidence);
    }

    function approveComplaint(uint256 _id, string memory _approvalRemark)
        public
        onlyOfficer
    {
        require(
            Complaints[_id].exists == true,
            "This complaint id does not exist"
        );
        require(
            Complaints[_id].isApproved == false,
            "Complaint is already approved"
        );
        Complaints[_id].isApproved = true;
        Complaints[_id].approvalRemark = _approvalRemark;
    }

    function discardComplaint(uint256 _id, string memory _approvalRemark)
        public
        onlyOfficer
    {
        require(
            Complaints[_id].exists == true,
            "This complaint id does not exist"
        );
        require(
            Complaints[_id].isApproved == false,
            "Complaint is already approved"
        );
        Complaints[_id].exists = false;
        Complaints[_id].approvalRemark = string.concat(
            "This complaint is rejected. Reason: ",
            _approvalRemark
        );
    }

    function resolveComplaint(uint256 _id, string memory _resolutionRemark)
        public
        onlyOfficer
    {
        require(
            Complaints[_id].exists == true,
            "This complaint id does not exist"
        );
        require(
            Complaints[_id].isApproved == true,
            "Complaint is not yet approved"
        );
        require(
            Complaints[_id].isResolved == false
        )
    }
}