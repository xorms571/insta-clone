import { useNavigate } from "react-router-dom";
import UserInfoTop from "./UserInfoTop";
import UserInfoContents from "./UserInfoContents";

type UserInfoProps = {
  userData: any;
  userPosts: any[];
  currentUserUid: string;
};

const UserInfo = ({ userData, userPosts, currentUserUid }: UserInfoProps) => {
  const navigate = useNavigate();

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className="w-full">
      <UserInfoTop
        currentUserUid={currentUserUid}
        userData={userData}
        userPosts={userPosts}
      />
      <UserInfoContents userPosts={userPosts} onClick={handlePostClick} />
    </div>
  );
};

export default UserInfo;
