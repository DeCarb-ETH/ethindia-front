// src/Upload.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Upload as AntdUpload, Input, Form, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


//import lighthouse from '@lighthouse-web3/sdk'
const Upload = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleUpload = (file) => {
    form.validateFields().then(async (values) => {
      // Implement your file upload logic here
      // You can access the file name and description from the 'values' object
      // You can send the fileList, values, or perform any required actions
      message.success('File uploaded successfully!');

      //const an=await lighthouse.upload(file,"f5ce34ec.2a78e667fd954562bbb38a58c66c7358",false,null)
      setFileList([]); // Clear fileList after successful upload
      console.log(an)
      form.resetFields(); // Clear form fields after successful upload
    });
  };

  const uploadProps = {
    fileList,
    onChange: handleFileChange,
    beforeUpload: (file) => {
      // Add any file type validation logic here
      const isPDF = file.type === 'application/pdf';
      if (!isPDF) {
        message.error('You can only upload PDF files!');
      }
      return isPDF;
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">DeEx3</div>
        <div className="flex space-x-4">
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

            <AntdUpload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Select PDF File</Button>
            </AntdUpload>

            
            <div className="mt-4 text-center">
              <Button type="primary" onClick={e=>handleUpload(e.target.file)} className="text-black bg-slate-300">
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