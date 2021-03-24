import firebase from "firebase/app";

import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};


firebase.initializeApp(firebaseConfig);

// export default firebase_app;

export const auth = firebase.auth();
export const firebase_auth = firebase.auth;

export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const analytics = firebase.analytics();



export const uploadFile = async (file, setVideoFileURL) => {

  const storageRef = storage.ref();
  const childPath = "Videos/" + file.name;
  const fileRef = storageRef.child(childPath);
  const videosRef = firestore.collection("videos");

  await fileRef.put(file).then(() => {
    console.log("Uploaded a file");
  });

  await videosRef
    .add({
      url: childPath,
      user: "user123",
    })
    .then(() => console.log("Registry updated"));

  // await fileRef.getDownloadURL().then((result) => {
  //   setVideoFileURL(result);
  // });
};


export const showFile  = (videos, setVideoFileURL) => {
  videos.map(({url})=>console.log(url))
}

export const retrieveDownloadUrl  =  async(url) => {
  // console.log(url);
  const storageRef = storage.ref();
  const fileRef = storageRef.child(url);
  // console.log(fileRef.getDownloadURL());
  // let k

// return url
  return await fileRef.getDownloadURL()


  // let data
  // try {
  //   //const response = await window.fetch(endpoint, config)
  //   await fileRef.getDownloadURL().then((result) => data=result)
  //   // console.log(data)


  //   // if (response.status<=200) {
  //   return data
  //   // }
  //   // throw new Error(response.statusText)
  // } catch (err) {
  //   return Promise.reject(err.message ? err.message : data)
  // }


 
  // storage.ref().child(url).getDownloadURL()
  // return await fileRef.getDownloadURL()
}