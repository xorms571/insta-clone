type PostDescriptionProps = {
  tags: string[];
  description: string;
  name: string;
  date: string;
};
const PostDescription = ({
  description,
  name,
  tags,
  date,
}: PostDescriptionProps) => {
  return (
    <div className="text-xs px-2">
      <p>
        <b className="mr-1">{name}</b>
        {description}
      </p>
      <div className="text-slate-700 flex gap-1">
        {tags.map((tag, i) => (
          <span key={i}>#{tag}</span>
        ))}
      </div>
      <p className="mt-2 text-gray-500">{date}</p>
    </div>
  );
};
export default PostDescription;
