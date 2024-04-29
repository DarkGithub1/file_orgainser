const fs = require('fs');
const path = require('path');

// Specify the directory containing the files to be organized
const directory = 'D:/';

// Read all files in the directory
fs.readdir(directory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  // Iterate through each file
  files.forEach(file => {
    // Get the file extension
    const fileExtension = path.extname(file).toLowerCase().slice(1);
    
    // Create a folder if it doesn't exist based on the file extension
    const folderPath = path.join(directory, fileExtension);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    
    // Move the file to the corresponding folder
    const oldPath = path.join(directory, file);
    const newPath = path.join(folderPath, file);
    fs.rename(oldPath, newPath, err => {
      if (err) {
        console.error('Error moving file:', err);
      } else {
        console.log(`Moved ${file} to ${fileExtension} folder`);
      }
    });
  });
});
