import { useNavigate } from "react-router-dom";
import Image from "../../Image";
import Icon from "../../Icon";
import { AiOutlineClose } from "react-icons/ai";
type PostDetailTopProps = {
  profileImageUrl: string;
  authorName: string;
  city: string;
  country: string;
};
const PostDetailTop = ({
  authorName,
  city,
  country,
  profileImageUrl,
}: PostDetailTopProps) => {
  const navigate = useNavigate();
  const handleback = () => {
    navigate("/user");
  };
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <Image src={profileImageUrl} size="fit" />
        </div>
        <div>
          <b>{authorName}</b>
          <p>
            {city}, {country}
          </p>
        </div>
      </div>
      <Icon icon={<AiOutlineClose />} size="md" onClick={handleback} />
    </div>
  );
};
export default PostDetailTop;
