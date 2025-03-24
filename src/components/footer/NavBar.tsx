import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import LinkIcon from "../../LinkIcon";
import Icon from "../../Icon";
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoSearchOutline, IoSearchSharp } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import {
  AiOutlinePlusSquare,
  AiFillPlusSquare,
  AiOutlineUser,
} from "react-icons/ai";
import Image from "../../Image";
import { Link, useLocation } from "react-router-dom";
import { sizes } from "../../styles/sizes";

const NavBar = () => {
  const [user, setUser] = useState<any>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserProfileImage(currentUser.uid);
      } else {
        setUser(null);
        setProfileImageUrl(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserProfileImage = async (uid: string) => {
    try {
      const userDoc = doc(db, "users", uid);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setProfileImageUrl(userData.profileImageUrl);
      }
    } catch (error) {
      console.error("Error fetching user profile image:", error);
    }
  };

  return (
    <>
      <LinkIcon
        icon={
          <Icon
            icon={location.pathname === "/" ? <GoHomeFill /> : <GoHome />}
            size="md"
          />
        }
        pageUrl="/"
      />
      <LinkIcon
        icon={
          <Icon
            icon={
              location.pathname === "/search" ? <IoSearchSharp /> : <IoSearchOutline />
            }
            size="md"
          />
        }
        pageUrl="/search"
      />
      <LinkIcon
        icon={
          <Icon
            icon={
              location.pathname === "/addpost" ? (
                <AiFillPlusSquare />
              ) : (
                <AiOutlinePlusSquare />
              )
            }
            size="md"
          />
        }
        pageUrl="/addpost"
      />
      <LinkIcon
        icon={<Icon icon={location.pathname === "/like" ? (
          <IoMdHeart />
        ) : (
          <IoMdHeartEmpty />
        )} size="md" />}
        pageUrl="/like"
      />
      {user ? (
        <Link style={{ padding: sizes.padding.sm }} to={`/user/${user.uid}`}>
          <div style={{ width: "25px", height: "25px"}} className="rounded-full overflow-hidden bg-slate-200">
            <Image src={profileImageUrl || "/default-profile.png"} size="fit" />
          </div>
        </Link>
      ) : (
        <LinkIcon
          icon={<Icon icon={<AiOutlineUser />} size="md" />}
          pageUrl="/user"
        />
      )}
    </>
  );
};

export default NavBar;
