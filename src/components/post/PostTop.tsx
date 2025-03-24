import { useState, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useSpring } from "@react-spring/web";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";
import { onAuthStateChanged } from "firebase/auth";
import Image from "../../Image";
import Icon from "../../Icon";
import CustomAnimatedDiv from "../../CustomAnimatedDiv";

type PostTopProps = {
  profileImageUrl: string;
  authorName: string;
  city: string;
  country: string;
  id: string;
  authorId: string;
};

const PostTop = ({
  profileImageUrl,
  authorName,
  city,
  country,
  authorId,
  id,
}: PostTopProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openHeight, setOpenHeight] = useState(window.innerHeight * 0.7);
  const [{ y }, api] = useSpring(() => ({ y: openHeight }));
  const currentUser = auth.currentUser;
  const navigate = useNavigate();

  const handleIconClick = () => {
    if (currentUser) {
      setIsSheetOpen((prev) => {
        const newState = !prev;
        if (newState) {
          api.start({ y: 0 });
        } else {
          api.start({ y: openHeight });
        }
        return newState;
      });
    } else {
      alert("로그인을 해야합니다.");
      navigate("/user");
    }
  };

  const handleUserClick = () => {
    navigate(`/user/${authorId}`);
  };

  const isAuthor = auth.currentUser?.uid === authorId;

  const handleDelete = async () => {
    if (window.confirm("이 게시물을 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        alert("게시물이 삭제되었습니다.");
      } catch (error) {
        console.error("Error deleting post: ", error);
      }
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    const checkIfFollowing = async () => {
      if (!currentUser) return;
      const followerRef = doc(
        db,
        `users/${authorId}/followers`,
        currentUser.uid
      );
      const followerDoc = await getDoc(followerRef);
      setIsFollowing(followerDoc.exists());
    };

    checkIfFollowing();
  }, [authorId, currentUser]);

  const handleFollow = async () => {
    if (!currentUser) return;

    const followerRef = doc(db, `users/${authorId}/followers`, currentUser.uid);
    const followingRef = doc(
      db,
      `users/${currentUser.uid}/following`,
      authorId
    );

    if (isFollowing) {
      await deleteDoc(followerRef);
      await deleteDoc(followingRef);
      setIsFollowing(false);
    } else {
      await setDoc(followerRef, { followedAt: new Date() });
      await setDoc(followingRef, { followedAt: new Date() });
      setIsFollowing(true);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <div className="flex gap-2 items-center">
          <div
            className="w-10 h-10 rounded-full overflow-hidden shadow-md cursor-pointer"
            onClick={handleUserClick}
          >
            <Image src={profileImageUrl} size="fit" />
          </div>
          <div className="cursor-pointer" onClick={handleUserClick}>
            <b>{authorName}</b>
            <p>
              {city}, {country}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isAuthor && isLoggedIn && (
            <button
              onClick={handleFollow}
              className="text-xs px-3 py-0.5 border rounded-md shadow-inner"
            >
              {isFollowing ? "언팔로우" : "팔로우"}
            </button>
          )}
          {isAuthor ? (
            <Icon icon={<BsThreeDots />} size="sm" onClick={handleIconClick} />
          ) : null}
        </div>
      </div>
      {isSheetOpen && (
        <CustomAnimatedDiv
          api={api}
          openHeight={openHeight}
          setOpenHeight={setOpenHeight}
          y={y}
        >
          <div className="p-4 flex flex-col gap-2 items-start text-base">
            <div
              className="border w-3/4 border-y-2 border-slate-300"
              style={{ margin: "0 auto" }}
            ></div>
            <div className="flex flex-col gap-5 mt-5 w-full text-sm">
              {isAuthor && (
                <>
                  <button
                    className="flex gap-2 items-center pb-2 font-bold border-b w-full"
                    onClick={handleEdit}
                  >
                    <Icon icon={<MdOutlineEdit />} size="sm" />
                    수정
                  </button>
                  <button
                    className="flex gap-2 items-center pb-2 text-red-700 font-bold border-b w-full"
                    onClick={handleDelete}
                  >
                    <Icon icon={<MdOutlineDeleteOutline />} size="sm" />
                    삭제
                  </button>
                </>
              )}
            </div>
          </div>
        </CustomAnimatedDiv>
      )}
    </div>
  );
};

export default PostTop;
