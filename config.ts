import { Platform } from "react-native";

const config = {
    gamesApiUrl: Platform.OS === 'android' ? 'http://10.0.2.2:3000/' : 'http://localhost:3000/',
    clientId: 'tf9h3g1uu0z3mpswltlolc8ifca35l',
    clientSecret: 'fi7hk2jxilnctu1t8nu0znthjutbao',

    firebaseWebConfig: {
        apiKey: "AIzaSyBr2BQ-LxxNWHdYj3d98EcsGj0KmFJnOqA",
        authDomain: "apprw-1a109.firebaseapp.com",
        projectId: "apprw-1a109",
        storageBucket: "apprw-1a109.appspot.com",
        messagingSenderId: "693388961149",
        appId: "1:693388961149:web:fb3d2812e0e8691fbd1814",
        measurementId: "G-4YWWE3X8J2"
    }
};

export default config;