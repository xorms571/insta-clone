import { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Post from "./Post";

const PostList = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postSnapshot = await getDocs(postsCollection);
        const postList = await Promise.all(
          postSnapshot.docs.map(async (docSnapshot) => {
            const postData = docSnapshot.data();
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

            return {
              id: docSnapshot.id,
              description: postData.description,
              imageUrls: postData.imageUrls || [],
              tags: postData.tags || [],
              authorName: postData.authorName || "Anonymous",
              profileImageUrl,
              city: postData.city || "Unknown",
              country: postData.country || "Unknown",
              createdAt: postData.createdAt,
              authorId: postData.authorId,
            };
          })
        );
        postList.sort((a, b) => {
          const dateA = a.createdAt ? a.createdAt.toDate().getTime() : 0;
          const dateB = b.createdAt ? b.createdAt.toDate().getTime() : 0;
          return dateB - dateA;
        });

        setPosts(postList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ marginBottom: "134px" }} className="bg-white">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          description={post.description}
          imageUrls={post.imageUrls}
          tags={post.tags}
          authorName={post.authorName}
          profileImageUrl={post.profileImageUrl}
          city={post.city}
          country={post.country}
          createdAt={
            post.createdAt?.toDate().toLocaleDateString() || "날짜 없음"
          }
          authorId={post.authorId}
        />
      ))}
    </div>
  );
};

export default PostList;
