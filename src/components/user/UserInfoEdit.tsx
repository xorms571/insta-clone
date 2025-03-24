import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from "../../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { HiOutlineX } from "react-icons/hi";
import LinkIcon from "../../LinkIcon";
import Icon from "../../Icon";
import { loadingScreenStyle } from "../../styles/style";
import Image from "../../Image";

const UserInfoEdit = () => {
  const [profileData, setProfileData] = useState<{
    name: string;
    profileImageUrl: string;
  }>({
    name: "",
    profileImageUrl: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setProfileData({
            name: data.name || "",
            profileImageUrl: data.profileImageUrl || "",
          });
        }
      }
    };

    fetchProfileData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        let updatedProfileData = { ...profileData };
        if (file) {
          const storageRef = ref(storage, `profileImages/${user.uid}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          updatedProfileData.profileImageUrl = downloadURL;
        }
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, updatedProfileData);
        navigate(`/user/${user.uid}`);
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div
        style={loadingScreenStyle}
        className="z-50 flex items-center justify-center h-screen bg-slate-100"
      >
        <Image src={process.env.PUBLIC_URL + "/loading.gif"} size="sm" />
      </div>
    );
  }

  return (
    <div className="flex text-xs items-center justify-center h-full bg-slate-200">
      <div className="flex flex-col gap-4 p-4 shadow-lg mx-6 bg-white rounded-lg">
        <div className="flex border-b pb-2 justify-between items-center font-bold text-sm">
          <p>프로필 편집</p>
          <LinkIcon
            pageUrl="/user"
            size="none"
            icon={<Icon icon={<HiOutlineX />} size="sm" />}
          />
        </div>
        <p>
          이름 :
          <input
            className="mt-2 bg-slate-100 w-full p-3 text-xs rounded-md shadow-inner"
            type="text"
            value={profileData.name}
            onChange={(e) =>
              setProfileData({ ...profileData, name: e.target.value })
            }
            placeholder="이름"
          />
        </p>
        <p>
          프로필 사진 :
          <input
            type="file"
            className="mt-2 bg-slate-100 w-full p-3 rounded-md shadow-inner"
            onChange={handleFileChange}
          />
        </p>
        <button
          onClick={handleSave}
          className="font-extrabold px-5 py-0.5 border rounded-md bg-slate-200 shadow-md"
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default UserInfoEdit;
