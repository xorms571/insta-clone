import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import PostDetailTop from "./PostDetailTop";
import PostDetailImage from "./PostDetailImage";
import PostDetailBottom from "./PostDetailBottom";
import PostInteraction from "./PostInteraction";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      try {
        const postRef = doc(db, "posts", postId);
        const postDoc = await getDoc(postRef);

        if (postDoc.exists()) {
          const postData = postDoc.data();
          let profileImageUrl = "";
          if (postData.authorId) {
            const userDocRef = doc(db, "users", postData.authorId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              const userData = userDocSnap.data();
              if (typeof userData === "object" && userData !== null) {
                profileImageUrl = userData.profileImageUrl || "";
              }
            }
          }
          setPost({
            ...postData,
            profileImageUrl,
          });
        } else {
          setError("포스트를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("Error fetching post: ", error);
        setError("포스트를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchPost();
  }, [postId]);

  if (error) return <p>{error}</p>;

  return post ? (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-slate-100 px-4">
      <div className="flex flex-col gap-2 m-4 p-4 w-full shadow-lg text-sm rounded-2xl bg-white">
        <PostDetailTop
          authorName={post.authorName}
          city={post.city}
          country={post.country}
          profileImageUrl={post.profileImageUrl}
        />
        <PostDetailImage imageUrls={post.imageUrls} />
        <PostInteraction postId={postId as string} />
        <PostDetailBottom
          authorName={post.authorName}
          description={post.description}
          tags={post.tags}
        />
      </div>
    </div>
  ) : (
    <p className="w-full h-screen flex items-center justify-center">Loading...</p>
  );
};

export default PostDetail;
