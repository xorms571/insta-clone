import Icon from "../../Icon";
import Image from "../../Image";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { IoBookmarkOutline } from "react-icons/io5";
import { TbSquares } from "react-icons/tb";
type UserInfoContentsProps = {
  userPosts: any[];
  onClick: (postId: string) => void;
};
const UserInfoContents = ({ userPosts, onClick }: UserInfoContentsProps) => {
  return (
    <>
      <div className="flex bg-white">
        <div className="w-1/2 flex justify-center py-2 border-r">
          <Icon icon={<HiOutlineSquares2X2 />} size="sm" />
        </div>
        <div className="w-1/2 flex justify-center py-2">
          <Icon icon={<IoBookmarkOutline />} size="sm" />
        </div>
      </div>
      <ul
        className="gap-0.5"
        style={{
          width: userPosts.length === 0 ? "100%" : "",
          height: userPosts.length === 0 ? "100%" : "",
          display: userPosts.length === 0 ? "flex" : "grid",
          alignItems: userPosts.length === 0 ? "center" : "",
          gridTemplateColumns: userPosts.length === 0 ? "" : "repeat(3,1fr)",
        }}
      >
        {userPosts.length === 0 ? (
          <p className="w-full text-center">게시물이 없습니다.</p>
        ) : (
          userPosts.map((post) => (
            <li
              key={post.id}
              className="bg-slate-300 aspect-w-1 aspect-h-1 cursor-pointer"
              onClick={() => onClick(post.id)}
            >
              <Image src={post.imageUrls[0]} size="fit" />
              {post.imageUrls.length > 1 && (
                <div className="w-full flex justify-end p-2 text-white">
                  <Icon
                    icon={
                      <TbSquares
                        style={{
                          filter: "drop-shadow(0 0 1px rgba(0,0,0,.7))",
                        }}
                      />
                    }
                    size="sm"
                  />
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </>
  );
};
export default UserInfoContents;
