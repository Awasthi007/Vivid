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

    

}

const production = {
    name: 'production',
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

}


module.exports = development;