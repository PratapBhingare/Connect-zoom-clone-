import {
    EuiButton,
    EuiFlexGroup,
    EuiFlexItem,
    EuiImage,
    EuiPanel,
    EuiProvider,
    EuiSpacer,
    EuiText,
    EuiTextColor,
    darken,
  } from "@elastic/eui";
  import logo from "../assets/logo.png";
  import animation from "../assets/animation.gif";
  import connect from "../assets/connect.png"
  import connectt from "../assets/connectt.png"


  import React from "react";
import { dark_shades } from "@elastic/eui/src/themes/amsterdam/global_styling/variables/_colors";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { firebaseDB,firebaseAuth,usersRef } from "../utils/FirebaseConfig";
import{useNavigate} from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../app/slices/AuthSlice";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";


  
  
function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate("/");
  });

  const login = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName, email, uid },
    } = await signInWithPopup(firebaseAuth, provider);

    if (email) {
      const firestoreQuery = query(usersRef, where("uid", "==", uid));
      const fetchedUser = await getDocs(firestoreQuery);
      if (fetchedUser.docs.length === 0) {
        await addDoc(collection(firebaseDB, "users"), {
          uid,
          name: displayName,
          email,
        });
      }
      dispatch(setUser({ uid, email: email!, name: displayName! }));
      navigate("/");
    }
  };

   
    return (
      <EuiProvider colorMode="dark" >
        
        <EuiFlexGroup
          
          color="#7DE2D1"
          justifyContent="center"
          alignItems="center"
          style={{ width: "100vw", height: "100vh" }}
        >
          <EuiFlexItem grow={false}>
            <EuiPanel paddingSize="xl">
              <EuiFlexGroup justifyContent="center" alignItems="center">
                <EuiFlexItem>
                  <EuiImage src={animation} alt="logo" />
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiImage src={connectt} alt="logo" size="450px" />
                  <EuiSpacer size="xs" />
                  <EuiText textAlign="center" grow={false}>
                    <h3>
                      <EuiTextColor>One Platform to</EuiTextColor>
                      <EuiTextColor color="#0b5cff"> Meet</EuiTextColor>
                    </h3>
                  </EuiText>
                  <EuiSpacer size="l" />
                  <EuiButton fill onClick={login}>
                    Login with Google
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiProvider>
    );
  }
  
  export default Login;
  