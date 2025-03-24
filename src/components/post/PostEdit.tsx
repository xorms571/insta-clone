import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const PostEdit = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<any>(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPost(data);
        setDescription(data.description);
        setTags(data.tags.join(", "));
      } else {
        console.error("No such document!");
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postId) return;

    try {
      const docRef = doc(db, "posts", postId);
      await updateDoc(docRef, {
        description,
        tags: tags.split(",").map((tag) => tag.trim()),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  const handleUpdateCancle = () => {
    navigate("/");
  };

  if (!post)
    return (
      <div className="flex items-center justify-center h-full">
        로딩중...
      </div>
    );

  return (
    <form
      onSubmit={handleUpdate}
      className="flex flex-col gap-2 justify-center h-full px-4"
    >
      <div>
        <p className="px-2 pb-2 text-sm">내용 수정 :</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="bg-slate-100 w-full h-60 p-5 text-sm rounded-lg shadow-inner"
        />
      </div>
      <div>
        <p className="px-2 pb-2 text-sm">태그 수정 :</p>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="bg-slate-100 w-full p-5 text-sm rounded-lg shadow-inner"
        />
      </div>
      <div className="text-sm flex w-full gap-2 justify-center pt-2">
        <button
          type="submit"
          className="text-start px-3 py-1 border rounded-md bg-slate-200 shadow-md"
        >
          게시물 수정
        </button>
        <button
          onClick={handleUpdateCancle}
          className="text-start px-3 py-1 border rounded-md bg-slate-200 shadow-md"
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default PostEdit;
