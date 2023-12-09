// SampleComponent.jsx
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import React ,{useEffect,useState} from 'react';
import {
    SafeAuthPack,
    SafeAuthConfig,
    SafeAuthInitOptions,
    SafeAuthUserInfo
  } from '@safe-global/auth-kit'
const Profile = () => {
  const greeting = "Hello, World!";
  const [safeAuthPack, setSafeAuthPack] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState(
    null
  )


useEffect(() => {
    // @ts-expect-error - Missing globals
    const params = new URL(window.document.location).searchParams
    const chainId = params.get('chainId')

    ;(async () => {
      const options= {
        enableLogging: true,
        buildEnv: 'production',
        chainConfig: {
          chainId: chainId || '0x64',
          rpcTarget: 'https://gnosis.drpc.org'
        }
      }

      const authPack = new SafeAuthPack()

      await authPack.init(options)

      console.log('safeAuthPack:safeEmbed', authPack.safeAuthEmbed)

      setSafeAuthPack(authPack)

      authPack.subscribe('accountsChanged', async (accounts) => {
        console.log('safeAuthPack:accountsChanged', accounts, authPack.isAuthenticated)
        if (authPack.isAuthenticated) {
          const signInInfo = await authPack?.signIn()

          setSafeAuthSignInResponse(signInInfo)
          setIsAuthenticated(true)
          console.log(authPack.getAddress)
        }
      })

      authPack.subscribe('chainChanged', (eventData) =>
        console.log('safeAuthPack:chainChanged', eventData)
      )
    })()
  }, [])

  const userProfile = {
    name: 'John Doe',
    isScientist: true,
    email: 'john.doe@example.com',
    walletId: 'your_safe_wallet_id', // Add the wallet ID field
    publishedResearch: [
      {
        title: 'Title of Research 1',
        publicationDate: '2023-01-15',
        // Add more research details as needed
      },
      {
        title: 'Title of Research 2',
        publicationDate: '2023-02-28',
        // Add more research details as needed
      },
    ],
    stakedAmounts: [
      {
        currency: 'ETH',
        amount: 10.5,
        // Add more staked amount details as needed
      },
      {
        currency: 'BTC',
        amount: 5.2,
        // Add more staked amount details as needed
      },
    ],
    fundedAmounts: [
        {
          currency: 'USD',
          amount: 10000,
          // Add more funded amount details as needed
        },
        {
          currency: 'EUR',
          amount: 8000,
          // Add more funded amount details as needed
        },
      ],
    // Add more profile information as needed
  };

  return (
isAuthenticated ? <>    <div className="bg-gray-100 min-h-screen">
{/* Navbar */}
<nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
  <div className="text-lg font-bold">DeEx3</div>
  <div className="flex space-x-4">
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
      <p className="text-gray-800">{userProfile.name}</p>
      {userProfile.isScientist ? (
      <span className="text-sm text-gray-600 ml-2 font-semibold">(Scientist)</span>
      ) : (
      <span className="text-sm text-gray-300 ml-2 font-semibold">(Reader)</span>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 text-sm font-bold mb-2">Email:</label>
      <p className="text-gray-800">{userProfile.email}</p>
    </div>
    <div className="mb-4">
      <label className="block text-gray-600 text-sm font-bold mb-2">Wallet ID:</label>
      <p className="text-gray-800">{userProfile.walletId}</p>
    </div>

    {/* Published Research Information */}
    <div className="mb-8">
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
    </div>

    {/* Staked Amounts Information */}
    <div>
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
   </div>

    {/* Add more profile information fields as needed */}
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
