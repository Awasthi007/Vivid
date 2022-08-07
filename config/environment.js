const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory,
});

const development = {
    name : 'development',
    asset_path: '/assets',
    session_cookie_key: 'shashank',
    db: 'vivid_development',
    smtp : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port : 587,
        secure: false,
        auth: {
            user : 'shtester007',
            pass: 'dyyqpgpmgymiktfl'
        }
    },
    google_client_id : '248545932190-8obb1tbtbmiiu58mu74590drpas8kroa.apps.googleusercontent.com',
    google_client_secret : "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'shashankvivid',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}

    }

    

}

const production = {
    name: 'production',
    asset_path: process.env.VIVID_ASSET_PATH ,
    session_cookie_key: process.env.VIVID_SESSION_COOKIE_KEY,
    db: process.env.VIVID_DB,
    smtp : {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port : 587,
        secure: false,
        auth: {
            user : process.env.VIVID_GMAIL_USERNAME,
            pass: process.env.VIVID_GMAIL_PASSWORD
        }
    },
    google_client_id : process.env.VIVID_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.VIVID_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.VIVID_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.VIVID_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}

    }

}


module.exports = eval(process.env.VIVID_ENVIRONMENT) == undefined ? development : eval(process.env.VIVID_ENVIRONMENT);