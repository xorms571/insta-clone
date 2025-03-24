import { useState } from "react";

type PostBottomProps = {
  description: string;
  tags: string[];
  authorId: string;
  createdAt: string;
  id: string;
  authorName: string;
};

const PostBottom = ({
  createdAt,
  description,
  tags,
  authorName,
}: PostBottomProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const filteredTags = tags.filter((tag) => tag.trim() !== "");

  return (
    <div className="flex flex-col gap-2 px-2">
      <div>
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
      {tags.length > 0 && (
        <ul
          className="flex gap-1 text-sky-800"
          style={{
            display: filteredTags.length > 0 ? undefined : "none",
          }}
        >
          {filteredTags
            .map((tag, index) => (
              <li key={index}>#{tag}</li>
            ))}
        </ul>
      )}
      <span className="text-slate-500">{createdAt}</span>
    </div>
  );
};

export default PostBottom;
