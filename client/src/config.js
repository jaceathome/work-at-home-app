const firebaseConfig = {
    apiKey: process.env.VUE_APP_CLIENT_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_CLIENT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_CLIENT_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_CLIENT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_CLIENT_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_CLIENT_FIREBASE_APP_ID,
    measurementId: process.env.VUE_APP_CLIENT_FIREBASE_MEASUREMENT_ID
};

const globals = {
    LOGIN_ROUTE_NAME: "login",
    HOME_ROUTE_NAME: "home",
    USER_DEFAULT_PASSWORD: process.env.VUE_APP_USER_DEFAULT_PASSWORD
}

export {
    firebaseConfig,
    globals
}