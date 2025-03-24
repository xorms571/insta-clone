import { TbSquares } from "react-icons/tb";
import Image from "../../Image";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Icon from "../../Icon";

type SearchImagesProps = {
  selectedType: string;
  query: string;
};

const SearchImages = ({ selectedType, query }: SearchImagesProps) => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postSnapshot = await getDocs(postsCollection);
        const postList = postSnapshot.docs.map((doc) => {
          const postData = doc.data();
          return {
            id: doc.id,
            description: postData.description || "",
            imageUrls: postData.imageUrls || [],
            tags: postData.tags || [],
            authorName: postData.authorName || "Anonymous",
            profileImageUrl: postData.profileImageUrl || "",
            city: postData.city || "Unknown",
            country: postData.country || "Unknown",
            createdAt:
              postData.createdAt?.toDate().toLocaleDateString() || "날짜 없음",
            authorId: postData.authorId,
          };
        });
        setPosts(postList);
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredContents = posts.filter((post) => {
    const matchesType = selectedType
      ? post.tags.some((x: any) => x.includes(selectedType))
      : true;
    const matchesQuery = query
      ? post.description.toLowerCase().includes(query.toLowerCase())
      : true;

    return matchesType && matchesQuery;
  });

  return (
    <ul
      className="gap-0.5"
      style={{
        gridTemplateColumns: "repeat(3, 1fr)",
        marginBottom: "50px",
        display: filteredContents.length === 0 ? "flex" : "grid",
        justifyContent: filteredContents.length === 0 ? "center" : "",
        alignItems: filteredContents.length === 0 ? "center" : "",
        height: filteredContents.length === 0 ? "70vh" : "",
      }}
    >
      {filteredContents.length === 0 ? (
        <p className="relative">일치하는 게시물이 없습니다.</p>
      ) : (
        filteredContents.map((post, index) => (
          <li
            key={index}
            className="relative aspect-w-1 aspect-h-1 bg-slate-200"
          >
            <Image src={post.imageUrls[0]} size="fit" />
            {post.imageUrls.length > 1 && (
              <Icon
                icon={
                  <TbSquares
                    className="absolute z-10 top-2 left-2"
                    color="#fff"
                    style={{
                      filter: "drop-shadow(0 0 1px rgba(0,0,0,.7))",
                    }}
                  />
                }
                size="sm"
              />
            )}
          </li>
        ))
      )}
    </ul>
  );
};

export default SearchImages;
