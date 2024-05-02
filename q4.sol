// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TicketSale {
    address public admin;
    uint public ticketPrice;
    uint public ticketQuantity;
    bool public saleActive;
    mapping(address => uint) public checkticketBalances;

    event TicketPurchased(address indexed buyer, uint quantity);
    event SaleActivated(bool active);
    event SaleDeactivated(bool active);
    event EtherWithdrawn(address indexed admin, uint amount);

    constructor(uint _ticketPrice, uint _ticketQuantity) {
        admin = msg.sender;
        ticketPrice = _ticketPrice;
        ticketQuantity = _ticketQuantity;
        saleActive = true;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier saleIsActive() {
        require(saleActive, "Sale is not active");
        _;
    }

    modifier enoughTickets(uint quantity) {
        require(ticketQuantity >= quantity, "Not enough tickets available");
        _;
    }

    function buyTickets(uint quantity) external payable saleIsActive enoughTickets(quantity) {
      uint totalPrice = ticketPrice * quantity;
      require(msg.value >= totalPrice, "Insufficient Ether sent");
      checkticketBalances[msg.sender] += quantity;
      ticketQuantity -= quantity;
      emit TicketPurchased(msg.sender, quantity);
    }

    function activateSale() external onlyAdmin {
        require(!saleActive, "Sale is already active");
        saleActive = true;
        emit SaleActivated(true);
    }

    function deactivateSale() external onlyAdmin {
        require(saleActive, "Sale is already inactive");
        saleActive = false;
        emit SaleDeactivated(false);
    }

    function withdrawEther(uint amount) external onlyAdmin {
        require(amount <= address(this).balance, "Insufficient contract balance");
        payable(admin).transfer(amount);
        emit EtherWithdrawn(admin, amount);
    }

    receive() external payable {}
}