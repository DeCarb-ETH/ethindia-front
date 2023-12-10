
// src/Home.js
import { Button } from 'antd';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { useEffect ,useState} from 'react';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
const Intro = () => {
  const { address, isConnected ,connector} = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()
  
  const login =async () =>{
    connect(connector)
  }
  const logout=async ()=>{
disconnect()
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-sky-500 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold text-gray-300 hover:text-black">DeEx3</div>
        <div className="flex space-x-4 ">
          <Link to="/" className="text-gray-300 hover:text-black">Home</Link>
          <ConnectButton/>
          <Button>
          {
            isConnected ?
            <><Link onClick={logout} className="hover:text-gray-300">Sign Out</Link></>
            :
            <><Link onClick={login} className="hover:text-gray-300">Sign In</Link></>
          }
          </Button>
          {/* Add more navigation links as needed */}
        </div>
      </nav>
      
      {/* Main Content */}
      <div className="container mx-auto p-8 h-full">
        {/* Main Heading */}
        <div className="mb-8">
        <h1 className="text-9xl font-bold mb-4 font-sans">DeEx3</h1>

          <p className="text-gray-600">Discover a new era of collaboration and innovation in scientific research.</p>
        </div>
        
        
        <div className="flex space-x-8 mt-24">
          
          <div className="w-1/2 bg-blue-400 h-64 rounded-2xl p-7">
            <h2 className="text-4xl font-bold mb-4">Experiment</h2>
            <ul className="list-disc pl-4">
            <p className="font-sans   md:font-serif text-lg">
              Unleash boundless innovation with decentralized science experiments, transcending traditional research boundaries
              </p>
            </ul>
          </div>

          
          <div className="w-1/2 bg-blue-400 h-64 rounded-2xl p-7">
            <h2 className="text-4xl font-bold mb-4">Explore</h2>
            <ul className="list-disc pl-4">
            <p className="font-sans  md:font-serif text-lg">
            Explore the frontier of decentralized science, where boundless collaboration and innovation redefine the landscape of exploration.
              </p>
            </ul>
          </div>

           
          <div className="w-1/2 bg-blue-400 h-64 rounded-2xl p-7">
            <h2 className="text-4xl font-bold mb-4">Examine</h2>
            
            <p className="font-sans  md:font-serif text-lg">
            Examine the forefront of decentralized science, where collaboration knows no bounds, and innovation thrives in a transparent and secure research environment.
              </p>
           
          </div>

         


        </div>
        <div className="mt-24">
          <h2 className="text-3xl font-bold mb-4">Challenges & Solutions</h2>
          <p className="font-sans  md:font-serif text-xl">
            The current scientific systems face challenges such as limited global collaboration, centralized data vulnerabilities, and lack of transparency. DeEx3 provides a decentralized solution, fostering worldwide cooperation, ensuring secure data storage, and promoting transparency in scientific endeavors.
          </p>
        </div>
      </div>
      <footer className="bg-sky-500 text-white p-4 text-center pb-0 mb-0">
        <div className="flex justify-center space-x-4">
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
        </div>
        <div className="mt-4">
          <p>&copy; 2023 DeEx3. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Intro;