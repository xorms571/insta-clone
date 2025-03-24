import { useState, useEffect } from "react";
import { db, storage } from "../firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Image from "../Image";
import { loadingScreenStyle } from "../styles/style";

const AddPost = () => {
  const [formData, setFormData] = useState({
    description: "",
    tags: "",
    images: [] as File[],
  });
  const [user, setUser] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const userQuery = query(
            collection(db, "users"),
            where("__name__", "==", user.uid)
          );
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            setUserInfo(querySnapshot.docs[0].data());
          } else {
            console.error(
              "UID에 해당하는 사용자 문서를 찾을 수 없습니다.:",
              user.uid
            );
            setError("사용자 정보를 찾을 수 없습니다. 다시 가입해주세요.");
          }
        } catch (error) {
          console.error("Error fetching user info: ", error);
          setError("사용자 정보를 가져오는 중에 오류가 발생했습니다.");
        }
      } else {
        setError("User not logged in.");
        alert("로그인 해 주세요.");
        navigate("/user");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const imageUrls = await Promise.all(
        formData.images.map(async (image) => {
          const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
          await uploadBytes(imageRef, image);
          return await getDownloadURL(imageRef);
        })
      );
      await addDoc(collection(db, "posts"), {
        description: formData.description,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        imageUrls,
        authorId: user?.uid || "Unknown",
        authorName: userInfo?.name || "Unknown",
        profileImageUrl: userInfo?.profileImageUrl || "",
        city: userInfo?.city || "Unknown",
        country: userInfo?.country || "Unknown",
        createdAt: Timestamp.fromDate(new Date()),
      });
      navigate("/");
    } catch (error) {
      console.error("Error uploading post: ", error);
      setError("Failed to upload post.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={loadingScreenStyle} className="z-50">
        <Image src={process.env.PUBLIC_URL + "loading.gif"} size="sm" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 px-4 items-end h-full justify-center bg-slate-300"
    >
      <textarea
        name="description"
        placeholder="Description"
        onChange={handleChange}
        required
        className="bg-slate-100 w-full h-60 p-5 rounded-md shadow-inner"
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma separated)"
        onChange={handleChange}
        className="bg-slate-100 w-full p-5 rounded-md shadow-inner"
      />
      <input
        type="file"
        className="bg-slate-100 w-full p-3 text-xs rounded-md shadow-inner"
        multiple
        onChange={handleFileChange}
      />
      <button
        type="submit"
        className="text-sm font-extrabold px-5 py-1 border rounded-md bg-slate-200 shadow-md"
      >
        업로드
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddPost;
