// SampleComponent.jsx
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { useAccount, useConnect, useDisconnect } from 'wagmi'

import React ,{useEffect,useState} from 'react';
import { ethers } from 'ethers'
import { ConnectButton } from '@rainbow-me/rainbowkit';


const Profile = () => {
  const { address, isConnected ,connector} = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
const [isAuthenticated,setIsAuthenticated]=useState(false)


  const [uname,setUname]=useState("");
  const [isScientist,setScientist]=useState(false)
  const [email,setEmail]=useState('');
  const [walletId,setWalletId]=useState('');
const [stakedAmount,setStakedAmount]=useState(0.0)
const [stakedCoin,setStakedCoin]=useState(null);


console.log(address)

  return (
isConnected ? <>    <div className="bg-gray-100 min-h-screen">
{/* Navbar */}
<nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
  <div className="text-lg font-bold">DeEx3</div>
  <div className="flex space-x-4">
    <ConnectButton/>
    <Link to="/" className="hover:text-gray-300">Home</Link>
    <Button>
    <Link to="/login" className="hover:text-gray-300">Logout</Link>
    </Button>
  </div>
</nav>

{/* Main Content */}
<div className="container mx-auto p-8">
  {/* Profile Heading */}
  <div className="mb-8">
    <h1 className="text-4xl font-bold mb-2 text-gray-800">My Profile</h1>
    <p className="text-gray-600">View and manage your profile information.</p>
  </div>

  {/* Profile Information */}
  <div className="bg-white p-6 rounded-md shadow-md">
    <div className="mb-4">
      <label className="block text-gray-600 text-sm font-bold mb-2">Name:</label>
      <p className="text-gray-800">{uname}</p>
      {isScientist ? (
      <span className="text-sm text-gray-600 ml-2 font-semibold">(Scientist)</span>
      ) : (
      <span className="text-sm text-gray-300 ml-2 font-semibold">(Reader)</span>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 text-sm font-bold mb-2">Email:</label>
      <p className="text-gray-800">{email}</p>
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 text-sm font-bold mb-2">Wallet ID:</label>
      <p className="text-gray-800">{address}</p>
    </div>

    {/* Published Research Information */}
    { /*<div className="mb-8">
      <h2 className="text-sm font-bold mb-4 text-gray-800">Published Research:</h2>
      <ul className="list-disc pl-4">
      {userProfile.publishedResearch.map((research, index) => (
          <li key={index} className="mb-2">
              <span className="font-normal">
              <strong>{research.title}</strong> - Published on {research.publicationDate}
               </span>
          </li>
      ))}
      </ul>
    </div> */}
 <div className="mb-4">
      <label className="block text-gray-600 text-sm font-bold mb-2">Staked Amount:</label>
      <p className="text-gray-800">{stakedAmount + stakedCoin}</p>
    </div>
    <Button>
    <Link to="/upload" className="hover:text-gray-300">Upload a Research Paper</Link>
    </Button>
    {/* Staked Amounts Information */}
    {/*<div>
      <h2 className="text-sm font-bold mb-4 text-gray-800">Staked Amount:</h2>
      <ul className="list-disc pl-4">
        {userProfile.stakedAmounts.map((stakedAmount, index) => (
          <li key={index} className="mb-2">
            {stakedAmount.amount} {stakedAmount.currency} 
          </li>
        ))}
      </ul>
    </div>
    <div className="mb-8">
       <h2 className="text-sm font-bold mb-4 text-gray-800">Funded Amount:</h2>
       <ul className="list-disc pl-4">
       {userProfile.fundedAmounts.map((fundedAmount, index) => (
       <li key={index} className="mb-2">
       {fundedAmount.amount} {fundedAmount.currency} 
      </li>
          ))}
      </ul>
   </div> */}

    {/* Add more profile information fields as needed */}
  </div>
<div className='flex flex-row justify-center'>
<div className="mt-8 h-auto">
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Research Options for Basic Users</h2>
            <ul className="list-disc ml-4">
              <li>Read research papers</li>
              <li>Like research papers</li>
            </ul>
            <Button>Continue as Basic user</Button>
          </div>
        </div>

        {/* Research Options for Resource People */}
        <div className="mt-8 h-64">
          <div className="bg-gray-200 p-6 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Research Options for Resource People</h2>
            <ul className="list-disc ml-4">
              <li>Read research papers</li>
              <li>Raise disputes</li>
              <li>Approve research papers</li>
              <li>Join academic talks</li>
              <li>Stake 0.5 ETH as security</li>
            </ul>
            <Button >Stake 1 ETH</Button>
          </div>
        </div>
</div>
</div>

{/* Footer */}
<footer className="bg-blue-500 text-white p-4 text-center">
  <div className="flex justify-center space-x-4">
    <Link to="/contact" className="hover:text-gray-300">Contact</Link>
    <Link to="/about" className="hover:text-gray-300">About</Link>
  </div>
  <div className="mt-4">
    <p>&copy; 2023 DeEx3. All rights reserved.</p>
  </div>
  
</footer>
</div></>
:<><h1>Connect a account first</h1></>
  );
  
}

export default Profile;
