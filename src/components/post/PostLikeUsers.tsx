import { SpringRef, SpringValue } from "@react-spring/web";
import Image from "../../Image";
import CustomAnimatedDiv from "../../CustomAnimatedDiv";
import { Dispatch, SetStateAction } from "react";
type PostLikeUsersProps = {
  likeUsers: any[];
  showLikes: boolean;
  handleLikesClick: () => void;
  openHeight: number;
  y: SpringValue<number>;
  setOpenHeight: Dispatch<SetStateAction<number>>;
  api: SpringRef<{ y: number }>;
};
const PostLikeUsers = ({
  handleLikesClick,
  likeUsers,
  openHeight,
  showLikes,
  y,
  api,
  setOpenHeight,
}: PostLikeUsersProps) => {
  const pathname = window.location.pathname;
  return (
    <div style={{ padding: pathname.includes("/post") ? "0" : "0 8px", display: likeUsers.length === 0 ? 'none' : undefined }}>
      {likeUsers.length > 0 ? (
        likeUsers.length > 1 ? (
          <p>
            <b>{likeUsers[0].name}</b>님 외{" "}
            <b onClick={handleLikesClick}>{likeUsers.length - 1}명</b>이
            좋아합니다.
          </p>
        ) : (
          <p>
            <b>{likeUsers[0]?.name}</b>님이 좋아합니다.
          </p>
        )
      ) : null}

      {showLikes && (
        <CustomAnimatedDiv
          api={api}
          openHeight={openHeight}
          y={y}
          setOpenHeight={setOpenHeight}
        >
            <div className="pt-4 px-4 pb-2 h-full flex flex-col">
              <div
                className="border w-3/4 border-y-2 border-slate-300 cursor-pointer"
                style={{ margin: "0 auto" }}
              ></div>
              <ul className="mt-2">
                {likeUsers.map((user, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 py-2 border-b justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200">
                        <Image src={user.profileImageUrl} size="fit" />
                      </div>
                      <span>{user.name}</span>
                    </div>
                    <button className="px-5 py-0.5 bg-slate-100 shadow-md rounded-md text-xs">
                      팔로우
                    </button>
                  </li>
                ))}
              </ul>
            </div>
        </CustomAnimatedDiv>
      )}
    </div>
  );
};
export default PostLikeUsers;
