
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC6DvZt-QCx_61FXeWEJOaRQdq_8nkcFSY",
  authDomain: "netflix-clone-36d36.firebaseapp.com",
  projectId: "netflix-clone-36d36",
  storageBucket: "netflix-clone-36d36.firebasestorage.app",
  messagingSenderId: "933178274571",
  appId: "1:933178274571:web:15c009d64e98c908a5a80e",
  measurementId: "G-2CZQG14WCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        console.log("registro user: ",user)
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        //alert(error);
        toast.error(error.code.split('/')[1].split("-").join(" "))
    }
}

const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);

    } catch (error) {
        console.log(error);
        //alert(error);
        toast.error(error.code.split('/')[1].split("-").join(" "))
    }
}

const logout = async()=>{
    //console.log("d")

    await signOut(auth);
    
}

export {auth,db,login,signup,logout}