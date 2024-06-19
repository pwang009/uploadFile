const express = require('express');
const multer = require('multer');
const azure = require('azure-storage');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// Azure Storage account credentials
const storageAccount = 'docrecsa';
const storageAccessKey = process.env.AccessKey;

// Create a blob service client
const blobService = azure.createBlobService(storageAccount, storageAccessKey);

// Multer setup for handling file uploads
const upload = multer({ dest: 'uploads/' });

const app = express();
const port = 3000;
app.use(cors());

// Upload file to Azure Storage Blob
function uploadToAzureStorage(filePath, blobName, containerName, callback) {
  blobService.createBlockBlobFromLocalFile(containerName, blobName, filePath, (error, result, response) => {
    if (!error) {
      console.log('File uploaded successfully:', result);
      callback(null, result);
    } else {
      console.error('Error uploading file:', error);
      callback(error);
    }
  });
}

// POST endpoint to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const containerName = 'product'; // Name of the container in Azure Storage
  const blobName = `${Date.now()}-${req.file.originalname}`;
  const filePath = path.resolve(req.file.path);

  uploadToAzureStorage(filePath, blobName, containerName, (error, result) => {
    // Remove the file from the server after upload
    fs.unlinkSync(filePath);

    if (error) {
      return res.status(500).send('Error uploading file to Azure Storage.');
    }

    res.status(200).send('File uploaded successfully to Azure Storage.');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});