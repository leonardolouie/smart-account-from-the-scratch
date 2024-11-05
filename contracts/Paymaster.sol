// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

// Uncomment this line to use console.log
import "hardhat/console.sol";

import "@account-abstraction/contracts/interfaces/IPaymaster.sol";


contract Paymaster is IPaymaster {

    function validatePaymasterUserOp(UserOperation calldata, bytes32, uint256)
    external pure returns (bytes memory context, uint256 validationData) {
      //Paymaster server
      //20 bytes: pasymaster address;
      //timePeriod 
      //signature 
      context = new bytes(0);
      validationData = 0;
      
    }
   
    function postOp(PostOpMode mode, bytes calldata context, uint256 actualGasCost) external { 

    }

}
