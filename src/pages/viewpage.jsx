// src/FullPageView.js
import React, { useState, useEffect } from "react";
import { List, Avatar, Space, Tooltip, Button, Input, Form } from "antd";
import { LikeOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link,useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import database from "../../firebase";

const FullPageView = () => {
  const navi=useNavigate();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [disputeReason, setDisputeReason] = useState("");
  const [showDisputeFields, setShowDisputeFields] = useState(false);

  // Dummy data for demonstration

  useEffect(() => {
    const starCountRef = ref(database, "rp/");
    onValue(starCountRef, (snapshot) => {
      setData(snapshot.val());
    });
  }, []);
  const handleLike = () => {
    // Implement like functionality (e.g., update a database)
    console.log("Liked");
  };

  const handleDispute = () => {
    // Toggle the display of dispute fields
    setShowDisputeFields(!showDisputeFields);
  };

  const handleDisputeSubmit = () => {
    // Implement dispute functionality (e.g., submit dispute to a server)
    console.log("Disputed with reason:", disputeReason);
    // Clear the dispute reason after submission
    setDisputeReason("");
    // Hide the dispute fields
    setShowDisputeFields(false);
  };

  const handleFileClick = (fileUrl) => {
    // Implement logic to handle file click, e.g., open the file or download it
    console.log("File clicked:", fileUrl);
    window.location=`https://gateway.lighthouse.storage/ipfs/${fileUrl}`
    // You can use window.open(fileUrl) to open the file in a new tab
    // or provide a download link using an anchor tag
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
      <div>
        {data != null ? (
          <>
            {Object.keys(data).map((key) => {
              const item = data[key];
              return (
<List key='we' >
<List.Item
                key={item}
                actions={[
                  <Tooltip key="comment-basic-like" title="Like">
                    <span>
                      <LikeOutlined /> {item.deets.like.length}
                    </span>
                  </Tooltip>,
                  <Button key="like" type="primary bg-sky-500" >
                    Like
                  </Button>,
                  <Button
                    key="dispute-button"
                    className=" bg-red-300 hover:text-red-700"
                    onClick={handleDispute}
                  >
                    Dispute
                  </Button>,
                  <Button
                    key="file-button"
                    type="primary bg-blue-500"
                    onClick={() => handleFileClick(key)}
                  >
                    View File
                  </Button>,
                  <Button
                    key="app"
                    className="bg-green-500 hover:text-yellow-100"
                  >
                    Approve
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src="https://via.placeholder.com/64" />}
                  title={<a href="#">{item.deets.title}</a>}
                  description={item.address}
                />
              
                {/* Display Files */}
                <div></div>
              </List.Item>
</List>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
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

export default FullPageView;
