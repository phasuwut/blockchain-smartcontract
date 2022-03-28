import {} from"@alch/alchemy-web3"

import { Block, BlockHeader } from 'web3-eth' // ex. package types

import MasterLayout from "../../../Layout/MasterLayout/MasterLayout";
import React from 'react'
import Web3 from 'web3';

const Test1 = () => {
  const web3 = new Web3('ws://localhost:8546');
  console.log(web3)

  return (
      <MasterLayout>
          <div div>SmaerContractTest1</div>
      </MasterLayout>
    
  )
}

export default Test1