
// src/Home.js
import { Button } from 'antd';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import { useEffect ,useState} from 'react';

import {
  SafeAuthPack,
 
} from '@safe-global/auth-kit'



const Intro = () => {

  const [safeAuthPack, setSafeAuthPack] = useState()
  const [isAuthenticated, setIsAuthenticated] = useState()
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] = useState(
    null
  )
  const [userInfo, setUserInfo] = useState(null)
  const [chainId, setChainId] = useState()
  const [balance, setBalance] = useState()
  const [consoleMessage, setConsoleMessage] = useState()
  const [consoleTitle, setConsoleTitle] = useState()
  const [provider, setProvider] = useState()

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
        }
      })

      authPack.subscribe('chainChanged', (eventData) =>
        console.log('safeAuthPack:chainChanged', eventData)
      )
    })()
  }, [])

  useEffect(() => {
    if (!safeAuthPack || !isAuthenticated) return
    ;(async () => {
      const web3Provider = safeAuthPack.getProvider()
      const userInfo = await safeAuthPack.getUserInfo()

      setUserInfo(userInfo)

      if (web3Provider) {
        const provider = new setProvider(safeAuthPack.getProvider())
        const signer = await provider.getSigner()
        const signerAddress = await signer.getAddress()
        console.log(userInfo)
        // eslint-disable-next-line no-unsafe-optional-chaining
        setChainId((await provider?.getNetwork()).chainId.toString())
        setBalance(
          ethers.formatEther((await provider.getBalance(signerAddress)))
        )
        setProvider(provider)
      }
    })()
  }, [isAuthenticated])

  const login= async()=>{
    

    let signInData = await safeAuthPack.signIn();
    console.log(signInData)
     
  }

  const logout = async()=>{
    await safeAuthPack.signOut();
    setIsAuthenticated(false)
    setUserInfo(null)
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-sky-500 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold text-gray-300 hover:text-black">DeEx3</div>
        <div className="flex space-x-4 ">
          <Link to="/" className="text-gray-300 hover:text-black">Home</Link>
          <Button>
          {
            isAuthenticated ?
            <><Link onClick={logout} className="hover:text-gray-300">Sign Out</Link></>
            :
            <><Link onClick={login} className="hover:text-gray-300">Sign In</Link></>
          }
          </Button>
          {/* Add more navigation links as needed */}
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        {/* Main Heading */}
        <div className="mb-8">
        <h1 className="text-9xl font-bold mb-4 font-sans">DeEx3</h1>

          <p className="text-gray-600">Discover a new era of collaboration and innovation in scientific research.</p>
        </div>
        
        
        <div className="flex space-x-8">
          
          <div className="w-1/2">
            <h2 className="text-4xl font-bold mb-4">Experiment</h2>
            <ul className="list-disc pl-4">
            <p className="font-sans  italic md:font-serif text-lg">
              Unleash boundless innovation with decentralized science experiments, transcending traditional research boundaries
              </p>
            </ul>
          </div>

          
          <div className="w-1/2">
            <h2 className="text-4xl font-bold mb-4">Explore</h2>
            <ul className="list-disc pl-4">
            <p className="font-sans italic md:font-serif text-lg">
            Explore the frontier of decentralized science, where boundless collaboration and innovation redefine the landscape of exploration.
              </p>
            </ul>
          </div>

           
          <div className="w-1/2">
            <h2 className="text-4xl font-bold mb-4">Examine</h2>
            
            <p className="font-sans italic md:font-serif text-lg">
            Examine the forefront of decentralized science, where collaboration knows no bounds, and innovation thrives in a transparent and secure research environment.
              </p>
           
          </div>

         


        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Challenges & Solutions</h2>
          <p className="font-sans italic md:font-serif text-lg">
            The current scientific systems face challenges such as limited global collaboration, centralized data vulnerabilities, and lack of transparency. DeEx3 provides a decentralized solution, fostering worldwide cooperation, ensuring secure data storage, and promoting transparency in scientific endeavors.
          </p>
        </div>
      </div>
      <footer className="bg-sky-500 text-white p-4 text-center">
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