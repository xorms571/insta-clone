import { useState } from "react";

type PostDetailBottomProps = {
  authorName: string;
  description: string;
  tags: string[];
};
const PostDetailBottom = ({
  authorName,
  description,
  tags,
}: PostDetailBottomProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs">
        <b className="mr-2">{authorName}</b>
        <p className="inline-block">
          {isExpanded ? description : `${description.slice(0, 10)}...`}
          {description.length > 10 && (
            <button
              onClick={handleToggle}
              className="text-sky-800 ml-2 hover:underline"
            >
              {isExpanded ? "접기" : "더보기"}
            </button>
          )}
        </p>
      </div>
      <ul className="flex gap-1 text-sky-800 text-xs">
        {tags.map((tag, index) => (
          <li key={index}>#{tag}</li>
        ))}
      </ul>
    </div>
  );
};
export default PostDetailBottom;
