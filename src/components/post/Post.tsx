import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import PostTop from "./PostTop";
import PostImage from "./PostImage";
import PostBottom from "./PostBottom";
import PostInteraction from "./PostInteraction";

interface PostProps {
  id: string;
  description: string;
  imageUrls: string[];
  tags: string[];
  authorName: string;
  profileImageUrl: string;
  city: string;
  country: string;
  createdAt: string;
  authorId: string;
}

const Post: React.FC<PostProps> = ({
  id,
  description,
  imageUrls = [],
  tags = [],
  authorName,
  profileImageUrl,
  city,
  country,
  createdAt,
  authorId,
}) => {
  return (
    <div className="flex flex-col gap-2 text-sm py-2 border-b">
      <PostTop
        authorName={authorName}
        city={city}
        country={country}
        profileImageUrl={profileImageUrl}
        id={id}
        authorId={authorId}
      />
      <PostImage imageUrls={imageUrls} />
      <PostInteraction postId={id} />
      <PostBottom
        authorName={authorName}
        authorId={authorId}
        createdAt={createdAt}
        description={description}
        id={id}
        tags={tags}
      />
    </div>
  );
};

export default Post;
