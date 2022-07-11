import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD1RrVEMYyFjM1DgdCvAfOFVv7_8jF3Nzs",
  authDomain: "uploadfiles-4f30c.firebaseapp.com",
  projectId: "uploadfiles-4f30c",
  storageBucket: "uploadfiles-4f30c.appspot.com",
  messagingSenderId: "503402772539",
  appId: "1:503402772539:web:a29ab31e962e5226e5441e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)