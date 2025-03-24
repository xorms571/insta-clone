import { useNavigate } from "react-router-dom";
import Image from "../../Image";
import Login from "../sign/Login";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
type UserInfoTopProps = {
  userData: any;
  currentUserUid: string;
  userPosts: any[];
};
const UserInfoTop = ({
  currentUserUid,
  userData,
  userPosts,
}: UserInfoTopProps) => {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate(`/user/${currentUserUid}/edit`);
  };

  useEffect(() => {
    const fetchFollowerCount = async () => {
      if (userData && userData.uid) {
        const followersCollection = collection(
          db,
          `users/${userData.uid}/followers`
        );
        const followerSnapshot = await getDocs(followersCollection);
        setFollowerCount(followerSnapshot.size);
        const followingCollection = collection(
          db,
          `users/${userData.uid}/following`
        );
        const followingSnapshot = await getDocs(followingCollection);
        setFollowingCount(followingSnapshot.size);
      }
    };

    fetchFollowerCount();
  }, [userData]);

  return (
    <div className="flex items-center gap-4 p-4 border-b bg-white">
      <div
        className="rounded-full overflow-hidden shadow-lg"
        style={{ width: "70px", height: "70px" }}
      >
        <Image
          src={userData.profileImageUrl || "default-image-url"}
          size="fit"
        />
      </div>
      <div className="text-xs flex flex-col gap-2">
        <b>{userData.name}</b>
        <p>{`게시물: ${userPosts.length}, 팔로워: ${followerCount}, 팔로우: ${followingCount}`}</p>
        {userData.uid === currentUserUid ? (
          <div className="flex gap-2">
            <button
              onClick={handleEditProfile}
              className="text-xs px-3 py-0.5 border rounded-md shadow-inner"
            >
              프로필 편집
            </button>
            <Login />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default UserInfoTop;
