import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Home from './components/Home';

// ABIs
import RealEstate from './abis/RealEstate.json'
import Escrow from './abis/Escrow.json'

// Config
import config from './config.json';

function App() {

  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();

    const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider);
    const totalSupply = await realEstate.totalSupply();
    console.log(totalSupply);
    
    

    window.ethereum.on('accountsChanged', async () =>{
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    })
  }

  useEffect(() =>{
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account = {account} setAccount={setAccount}/>
      <Search/>

      <div className='cards__section'>

        <h3>Homes For You</h3>

        <hr />

        <div className='cards'>
          <div class ='card'>
          <div className='card__image'>
            <img src = '' alt="Home" />
          </div>
          <div className='card__info'>
            <h4>1 ETH</h4>
            <p>
              <strong>4</strong> bds |
              <strong>5</strong> ba |
              <strong>250</strong> sqft
            </p>
            <p>123 Neverland</p>
          </div>
        </div>
          
        </div>
      </div>
    </div>
  );
}

export default App;
