import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import Image from "../../Image";

const PostComment = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    const fetchComments = async () => {
      try {
        const q = query(
          collection(db, "comments"),
          where("postId", "==", postId)
        );
        const querySnapshot = await getDocs(q);
        const commentsData = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const commentData = docSnapshot.data();
            let userProfileImage = "";
            if (commentData.userId) {
              const userDocRef = doc(db, "users", commentData.userId);
              const userDocSnap = await getDoc(userDocRef);
              if (userDocSnap.exists()) {
                userProfileImage =
                  (userDocSnap.data() as { profileImageUrl?: string })
                    .profileImageUrl || "";
              }
            }
            return {
              id: docSnapshot.id,
              ...commentData,
              userProfileImage,
            };
          })
        );
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments: ", error);
      }
    };

    fetchComments();

    return () => unsubscribe();
  }, [postId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("로그인 해 주세요.");
      navigate("/user");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        postId: postId,
        userId: user.uid,
        userName: user.displayName || "Unknown User",
        userProfileImage: user.photoURL || "",
        content: comment,
        createdAt: Timestamp.now(),
      });

      const newComment = {
        postId: postId,
        userId: user.uid,
        userName: user.displayName || "Unknown User",
        userProfileImage: user.photoURL || "",
        content: comment,
        createdAt: Timestamp.now(),
        id: docRef.id,
      };

      setComment("");
      setComments((prev) => [...prev, newComment]);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleEdit = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditingContent(currentContent);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCommentId) {
      try {
        const commentRef = doc(db, "comments", editingCommentId);
        await updateDoc(commentRef, {
          content: editingContent,
        });

        setComments((prev) =>
          prev.map((c) =>
            c.id === editingCommentId ? { ...c, content: editingContent } : c
          )
        );

        setEditingCommentId(null);
        setEditingContent("");
      } catch (error) {
        console.error("Error updating comment: ", error);
      }
    }
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleDelete = async (commentId: string) => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      try {
        await deleteDoc(doc(db, "comments", commentId));
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      } catch (error) {
        console.error("Error deleting comment: ", error);
      }
    }
  };

  return (
    <div className="pt-4 px-2 pb-2 h-full flex flex-col">
      <div
        className="border w-3/4 border-y-2 border-slate-300 mt-2 mb-2 cursor-pointer"
        style={{ margin: "0 auto" }}
      ></div>
      <form onSubmit={handleCommentSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="댓글을 입력하세요..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="w-5/6 text-xs px-3 py-2 border rounded-md bg-slate-100 shadow-inner"
        />
        <button
          type="submit"
          className="w-1/6 text-xs px-3 border rounded-md bg-slate-200 shadow-sm"
        >
          게시
        </button>
      </form>
      <ul className="mt-2 text-xs overflow-y-scroll">
        {comments.map((c) => (
          <li key={c.id} className="py-2 border-b flex flex-col gap-2">
            <div className="flex gap-2">
              <div className="w-1/12">
                <div className="rounded-full aspect-w-1 aspect-h-1 overflow-hidden bg-slate-100">
                  <Image src={c.userProfileImage} size="fit" />
                </div>
              </div>
              <div className="flex flex-col gap-2 w-11/12">
                <div
                  className="flex gap-2 flex-wrap"
                >
                  <b>{c.userName} :</b>
                  {editingCommentId === c.id ? (
                    <form
                      onSubmit={handleEditSubmit}
                      className="flex gap-2 items-center"
                    >
                      <input
                        type="text"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        className="px-3 py-1 border rounded-md bg-slate-100 shadow-inner"
                      />
                      <button
                        type="submit"
                        className="px-2 py-1 border rounded-md bg-slate-200 shadow-sm"
                      >
                        저장
                      </button>
                      <button
                        type="button"
                        onClick={handleEditCancel}
                        className="px-2 py-1 border rounded-md bg-slate-200 shadow-sm"
                      >
                        취소
                      </button>
                    </form>
                  ) : (
                    <p className="overflow-auto break-all">{c.content}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-slate-400">
                    {c.createdAt?.toDate().toLocaleDateString()}
                  </span>
                  {user && user.uid === c.userId && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(c.id, c.content)}
                        className="px-2 py-0.5 border rounded-md bg-slate-200 shadow-sm"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="px-2 py-0.5 border rounded-md bg-slate-200 shadow-sm"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostComment;
