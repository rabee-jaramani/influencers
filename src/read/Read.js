import axios from 'axios';
import React, { useState } from 'react';
export default function Read() {
  const [data, setData] = useState([]);
  function base64ToBlob(base64String, mimeType) {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }
  const fetchUsers = () => {
    axios
      .get('https://server-for-crud.onrender.com/users')
      .then((response) => {
        // Handle the response here (response.data contains the fetched data)
        const users = response.data;
        console.log(users);
        setData(users);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };
  const downloadFile = (user) => {
    const base64String = user.file.data;
    const mimeType = user.file.contentType;
    const downloaded_file = user.file.filename;
    const blob = base64ToBlob(base64String, mimeType);
    // Example: Create a download link for the Blob
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = downloaded_file; // Specify the desired file name (without an extension)
    document.body.appendChild(link);
    link.click();
  };
  return (
    <div className="read-cont">
      <h1>READ PAGE</h1>
      <h3>Records: {data.length}</h3>
      {data.map((user) => (
        <div key={user._id}>
          <div className="user">
            <div className="column">
              <span>
                <strong>Id: </strong>
              </span>
              <span>{user._id}</span>
            </div>
            <div className="column">
              <span>
                <strong>Name: </strong>
              </span>
              <span>{user.name}</span>
            </div>
            <div className="column">
              <span>
                <strong>Email: </strong>
              </span>
              <span>{user.email}</span>
            </div>
            <div className="column">
              <span>
                <strong>File: </strong>
              </span>
              <p onClick={() => downloadFile(user)}>{user.file.filename}</p>
            </div>
          </div>
        </div>
      ))}
      <button onClick={fetchUsers}>Fetch data</button>
    </div>
  );
}
