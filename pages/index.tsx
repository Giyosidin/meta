import { ConnectWallet, Web3Button, useContract} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState } from "react";

const Home: NextPage = () => {
  const contractAddress = '0x4f458944b6db3BeBAF0a0614623e3B045096e9af'
  const { contract } = useContract(contractAddress)
  const [counter, setCounter] = useState<string | undefined> (undefined)

  async function getCounter() {
    if(!contract) return;

    const counter = await contract.call('getCounter')
    setCounter(counter.toString())
    
  }


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        
        <ConnectWallet />
        <h1>Counter Dapp (decentralized app)</h1>
        <h3> {counter} </h3>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button contractAddress={contractAddress}
            action={(contract) => contract.call ('incrementCounter')}> Increment Counter </Web3Button>
          </div>
          
          <div className={styles.grid}>
            <div className={styles.card}>
        <Web3Button 
        contractAddress={contractAddress} 
        action={() => getCounter()}
        >Refresh Counter</Web3Button> 

              
            </div>

          </div>
          <div className={styles.card}>
            <Web3Button contractAddress={contractAddress}
            action={(contract) => contract.call ('decrementCounter')}> Decrement Counter </Web3Button>
          </div>

        </div>

      </main>
    </div>
  );
};

export default Home;
