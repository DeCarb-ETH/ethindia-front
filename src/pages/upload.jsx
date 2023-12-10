// src/Upload.js
import React, { useState,useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Button, Upload as AntdUpload, Input, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Web3 from 'web3';
import ABI from '../../contracts/main_abi.json'


import {ref,set} from 'firebase/database';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import lighthouse from '@lighthouse-web3/sdk'
import database from '../../firebase';
let key="2985b920.0b3e2b219fc44698af4374e934cb7d70"
const Upload = () => {
  const [form] = Form.useForm();
  const [contract, setContract] = useState(null);

const contractADD="0x7faa663355cdd0b7117711002a100b713cc341bf";
const [web3, setWeb3] = useState(null);
  const [title,setTitle]=useState();
  let navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const { address, isConnected ,connector} = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileUpload = (event) => {
        setSelectedFile(event.target.files);
      };
      useEffect(() => {
        // Check if Web3 is injected by the browser (MetaMask)
        if (typeof window.ethereum !== 'undefined') {
          const newWeb3 = new Web3(window.ethereum);
          setWeb3(newWeb3);
      
          window.ethereum.enable().then(() => {
            const newContract = new newWeb3.eth.Contract(ABI, contractADD);
            setContract(newContract);
          });
        } else {
          console.error('Web3 not detected. Please install MetaMask or another Ethereum wallet extension.');
        }
      }, [ABI, contractADD]);
  const handleUpload = async() => {
    const formData = new FormData();
     formData.append('file', selectedFile);
     message.success('File uploaded successfully!')
     console.log(formData)

      const an=await lighthouse.upload(selectedFile,key, false, null)
      setFileList([]); // Clear fileList after successful upload
      console.log(an)
      set(ref(database,'rp/'+an.data.Hash),{address:address,deets:{address:address,title:title,like:[''],accept:[''],dispute:[]}});
      //database.ref('rp').set({hash:an.data.Hash,deets:{address:address,like:[],accept:[],dispute:[]}}).catch(err =>{console.log(err)})
      form.resetFields(); // Clear form fields after successful upload
      navigate('/profile')

  };

  

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">DeEx3</div>
        <div className="flex space-x-4">
            <ConnectButton/>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Button>
          <Link to="/login" className="hover:text-gray-300">
            Logout
          </Link>
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        {/* Upload Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">Upload Documents</h1>
          <p className="text-gray-600">Add PDF files for sharing or publishing.</p>
        </div>

        {/* File Upload Section */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <Form form={form} layout="vertical">
            <Form.Item
              name="fileName"
              label="File Name"
              onChange={e => setTitle(e.target.value)}
              rules={[
                {
                  required: true,
                  message: 'Please enter the file name',
                },
              ]}
            >
              <Input placeholder="Enter the file name" />
            </Form.Item>

            <Form.Item name="fileDescription" label="File Description">
              <Input.TextArea placeholder="Enter a brief description of the file" />
            </Form.Item>

            <input type="file" onChange={handleFileUpload} />

            
            <div className="mt-4 text-center">
              <Button type="primary" onClick={handleUpload} className="text-black bg-slate-300">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-500 text-white p-4 text-center">
        <div className="flex justify-center space-x-4">
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
        </div>
        <div className="mt-4">
          <p>&copy; 2023 DeEx3. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Upload;