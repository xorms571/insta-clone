import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Login from "../components/sign/Login";
import UserInfo from "../components/user/UserInfo";
import SignUp from "../components/sign/SignUp";

const User = () => {
  const { uid } = useParams<{ uid: string }>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [userPosts, setUserPosts] = useState<any[]>([]);
  const [switchButton, setSwitchButton] = useState<boolean>(false);
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUserUid(user.uid);
        fetchUserData(uid || user.uid);
        fetchUserPosts(uid || user.uid);
      } else {
        setIsLoggedIn(false);
        setUserData(null);
        setUserPosts([]);
      }
    });

    return () => unsubscribe();
  }, [uid]);

  const fetchUserData = async (userId: string) => {
    try {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData({ ...data, uid: userId });
      } else {
        console.error("No such user document!");
        setUserData(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    }
  };

  const fetchUserPosts = async (userId: string) => {
    try {
      const postsQuery = query(
        collection(db, "posts"),
        where("authorId", "==", userId)
      );
      const querySnapshot = await getDocs(postsQuery);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserPosts(posts);
    } catch (error) {
      console.error("Error fetching user posts: ", error);
    }
  };

  if (isLoggedIn === null) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="text-xs flex flex-col items-center gap-4 justify-center h-full bg-slate-200"
      style={{
        alignItems: !isLoggedIn ? "center" : "start",
        justifyContent: !isLoggedIn ? "center" : "start",
        height: !isLoggedIn ? "100%" : "",
        marginTop: !isLoggedIn ? "" : "45px",
        width: !isLoggedIn ? "100%" : "",
      }}
    >
      {!isLoggedIn ? (
        <>
          {switchButton ? <SignUp /> : <Login />}
          <button
            className="px-5 py-0.5 bg-slate-100 shadow-md rounded-md"
            onClick={() => setSwitchButton(!switchButton)}
          >
            {switchButton ? "로그인하기" : "회원가입하기"}
          </button>
        </>
      ) : userData ? (
        <UserInfo
          userData={userData}
          userPosts={userPosts}
          currentUserUid={currentUserUid!}
        />
      ) : (
        <Login />
      )}
    </div>
  );
};

export default User;
