import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // TODO: handle the response from the server
    } catch (error) {
      // TODO: handle the error
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to my app!</h1>
        <p>Upload your image or video to get started.</p>
        <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </header>
    </div>
  );
}

export default App;
