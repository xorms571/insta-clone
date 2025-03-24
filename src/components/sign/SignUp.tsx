import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebaseConfig";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    city: "",
    gender: "",
    profileImage: null as File | null,
  });
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const DEFAULT_PROFILE_IMAGE_URL =
    "https://tse1.mm.bing.net/th?q=profile%20pic%20blank&w=250&h=250&c=7";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, profileImage: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password.length < 6) {
      alert("비밀번호는 최소 6자리 이상이어야 합니다.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      let profileImageUrl = DEFAULT_PROFILE_IMAGE_URL;
      if (formData.profileImage) {
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(imageRef, formData.profileImage);
        profileImageUrl = await getDownloadURL(imageRef);
      }

      await updateProfile(user, {
        displayName: formData.name,
        photoURL: profileImageUrl,
      });

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: formData.name,
        email: formData.email,
        country: formData.country,
        city: formData.city,
        gender: formData.gender,
        profileImageUrl,
      });

      alert("회원가입에 성공하셨습니다.");
    } catch (error: any) {
      console.error("Error signing up: ", error);
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 items-start shadow-lg rounded-lg bg-white"
    >
      <input
        className="bg-slate-50 shadow-inner rounded-md px-2 py-0.5 w-full"
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        value={formData.name}
        required
      />
      <input
        className="bg-slate-50 shadow-inner rounded-md px-2 py-0.5 w-full"
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
        required
      />
      <input
        className="bg-slate-50 shadow-inner rounded-md px-2 py-0.5 w-full"
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
        required
      />
      <input
        className="bg-slate-50 shadow-inner rounded-md px-2 py-0.5 w-full"
        type="text"
        name="country"
        placeholder="Country"
        onChange={handleChange}
        value={formData.country}
        required
      />
      <input
        className="bg-slate-50 shadow-inner rounded-md px-2 py-0.5 w-full"
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChange}
        value={formData.city}
        required
      />
      <select
        className="bg-slate-50 shadow-inner rounded-md px-2 py-0.5 w-full"
        name="gender"
        onChange={handleChange}
        value={formData.gender}
        required
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input type="file" onChange={handleFileChange} />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Profile Preview"
          style={{ width: "100px", height: "100px", marginTop: "10px" }}
        />
      )}
      <button
        className="px-5 py-0.5 bg-slate-100 shadow-md rounded-md"
        type="submit"
      >
        회원가입
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default SignUp;
