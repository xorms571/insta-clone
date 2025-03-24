import Image from "../../Image";

type PostLikesProps = {
  likes: {
    name: string;
    img: string;
  }[];
};
const PostLikes = ({ likes }: PostLikesProps) => {
  if (likes.length === 0) return null;
  return (
    <p className="text-xs px-2 flex items-center">
      <span className="rounded-full overflow-hidden h-5 bg-slate-300 mr-1">
        <Image size="fit" src={likes[0].img} />
      </span>
      {likes.length === 1 ? (
        <>
          <b>{likes[0].name}</b>님이 좋아합니다
        </>
      ) : (
        <>
          <b>{likes[0].name}</b>님 외 <b className="ml-1">{likes.length}명</b>이
          좋아합니다
        </>
      )}
    </p>
  );
};
export default PostLikes;
