// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FuturesContract {
    struct Contract {
        uint256 id;
        address payable buyer;
        address payable seller;
        uint256 amount;
        uint256 price;
        uint256 expiry;
        bool settled;
    }

    uint256 public contractCounter;
    mapping(uint256 => Contract) public contracts;

    event ContractCreated(
        uint256 id,
        address buyer,
        address seller,
        uint256 amount,
        uint256 price,
        uint256 expiry
    );

    event ContractSettled(uint256 id, uint256 settlementPrice);

    function createContract(
        address payable _seller,
        uint256 _amount,
        uint256 _price
    ) public payable {
        require(msg.value == _amount * _price, "Incorrect Ether sent");

        contractCounter++;
        contracts[contractCounter] = Contract({
            id: contractCounter,
            buyer: payable(msg.sender),
            seller: _seller,
            amount: _amount,
            price: _price,
            expiry: block.timestamp + 24 hours,
            settled: false
        });

        emit ContractCreated(
            contractCounter,
            msg.sender,
            _seller,
            _amount,
            _price,
            block.timestamp + 24 hours
        );
    }

    function settleContract(uint256 _id, uint256 _settlementPrice) public {
        Contract storage ctr = contracts[_id];
        require(block.timestamp >= ctr.expiry, "Contract not yet expired");
        require(!ctr.settled, "Contract already settled");

        int256 profitOrLoss = int256(ctr.price) - int256(_settlementPrice);
        profitOrLoss = profitOrLoss * int256(ctr.amount);

        if (profitOrLoss > 0) {
            // Buyer profits
            uint256 amountToTransfer = uint256(profitOrLoss);
            ctr.buyer.transfer(amountToTransfer);
        } else if (profitOrLoss < 0) {
            // Seller profits
            uint256 amountToTransfer = uint256(-profitOrLoss);
            ctr.seller.transfer(amountToTransfer);
        }
        // If profitOrLoss == 0, no transfer is needed

        ctr.settled = true;
        emit ContractSettled(_id, _settlementPrice);
    }
}
