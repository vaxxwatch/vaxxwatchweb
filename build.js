const fs = require('fs');

const publicDirectory = './public'

const copyCallBack = (error) => {
    if (error) {
        throw error
    }
}

// Create public dir
if (!fs.existsSync(publicDirectory)){
    fs.mkdirSync(publicDirectory);
}

// Copy html to public dir
fs.copyFile('./src/index.html', `${publicDirectory}/index.html`, copyCallBack)