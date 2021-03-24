import React, {useContext} from "react";
import ReactPlayer from "react-player";
import { Spinner } from "reactstrap";
import Uploader from "./Uploader/Uploader.js";
import NMLoggedIn from "./NavMenu/NMLoggedIn";

import { AuthContext,AuthProvider } from "../Authorization/Auth.js";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { firestore } from "../base.js";

const spinnerGroup = (
  <div>
    <Spinner type="grow" color="info" />
    <Spinner type="grow" color="info" />
    <Spinner type="grow" color="info" />
  </div>
);


function Viewer(props) {

  const { currentUser } = useContext(AuthContext);

  const usersRef = firestore.collection("users");
  const [users] = useCollectionData(usersRef, { idField: "id" });
  
  return (
    <div>
      <NMLoggedIn/>
      {/* {usersRef.doc("BLxO7xwhAWbNBjHTD9ouE9jH8Av2").get()} */}

      <button onClick={()=>{console.log(users); 
     usersRef.doc("BLxO7xwhAWbNBjHTD9ouE9jH8Av2").get().then(snapshot =>  console.log(snapshot.data()))}}
      
      
      >dgfgdf</button>

      {/* {users.length} */}
      {currentUser.email}
      {currentUser.uid}
      <Uploader/>
      <h2>Sent Documents</h2>
      {props.isLoading
        ? spinnerGroup
        : props.downloables.map((URL) => (
            <ReactPlayer url={URL} width="40%" height="40%" controls={true} />
          ))}
    </div>
  );
}

export default Viewer;
