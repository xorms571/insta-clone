import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import {
  IoChatbubbleOutline,
  IoPaperPlaneOutline,
  IoBookmark,
  IoBookmarkOutline,
} from "react-icons/io5";
import Icon from "../../Icon";
import { useState, useEffect } from "react";
import { useSpring } from "@react-spring/web";
import PostComment from "./PostComment";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import PostLikeUsers from "./PostLikeUsers";
import CustomAnimatedDiv from "../../CustomAnimatedDiv";

type PostInteractionProps = {
  postId: string;
};

const PostInteraction = ({ postId }: PostInteractionProps) => {
  const [isLike, setIsLike] = useState(false);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showLikes, setShowLikes] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [likeUsers, setLikeUsers] = useState<any[]>([]);
  const [openHeight, setOpenHeight] = useState(window.innerHeight * 0.7);
  const [{ y }, api] = useSpring(() => ({ y: openHeight }));
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    const fetchLikes = async () => {
      const postRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        const postData = postDoc.data();
        const currentLikes = postData.likes || [];
        if (user) {
          setIsLike(currentLikes.includes(user.uid));
        }

        const userDetails = await Promise.all(
          currentLikes.map(async (userId: string) => {
            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);
            return userDoc.exists() ? userDoc.data() : null;
          })
        );
        setLikeUsers(userDetails.filter((user) => user !== null));
      }
    };

    fetchLikes();
    return () => unsubscribe();
  }, [postId, user]);
  const handleCommentsClick = () => {
    setShowComments(true);
    setShowLikes(false);
    api.start({ y: 0 });
  };

  const handleLikesClick = () => {
    setShowLikes(true);
    setShowComments(false);
    api.start({ y: 0 });
  };

  const handleLikeToggle = async () => {
    if (!user) {
      alert("로그인 해 주세요.");
      navigate("/user");
      return;
    }

    const postRef = doc(db, "posts", postId);

    try {
      if (isLike) {
        await updateDoc(postRef, {
          likes: arrayRemove(user.uid),
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(user.uid),
        });
      }
      setIsLike((prev) => !prev);
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  const href = window.location.href;

  return (
    <>
      <div
        className="flex justify-between"
        style={{ padding: href.includes("post") ? "" : "0 8px" }}
      >
        <div className="flex gap-4">
          <Icon
            onClick={handleLikeToggle}
            icon={
              isLike ? (
                <IoMdHeart color="red" className="cursor-pointer" />
              ) : (
                <IoMdHeartEmpty className="cursor-pointer" />
              )
            }
            size="md"
          />
          <Icon
            onClick={handleCommentsClick}
            icon={<IoChatbubbleOutline className="cursor-pointer" />}
            size="md"
          />
          <Icon
            onClick={() => alert("지원되지 않는 기능의 버튼입니다.")}
            icon={<IoPaperPlaneOutline className="cursor-pointer" />}
            size="md"
          />
        </div>
        <div>
          <Icon
            onClick={() => {
              setIsBookMarked((prev) => !prev);
              alert("지원되지 않는 기능의 버튼입니다.");
            }}
            icon={
              isBookMarked ? (
                <IoBookmark className="cursor-pointer" />
              ) : (
                <IoBookmarkOutline className="cursor-pointer" />
              )
            }
            size="md"
          />
        </div>
      </div>
      <PostLikeUsers
        handleLikesClick={handleLikesClick}
        likeUsers={likeUsers}
        openHeight={openHeight}
        showLikes={showLikes}
        y={y}
        api={api}
        setOpenHeight={setOpenHeight}
      />
      {showComments && (
        <CustomAnimatedDiv
          api={api}
          openHeight={openHeight}
          setOpenHeight={setOpenHeight}
          y={y}
        >
          <PostComment postId={postId} />
        </CustomAnimatedDiv>
      )}
    </>
  );
};

export default PostInteraction;
