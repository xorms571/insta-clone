import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error: any) {
      alert("로그인에 실패했습니다. 아이디 혹은 비밀번호를 확인해 주세요.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error: any) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 items-start rounded-lg bg-white"
      style={{
        padding: isLoggedIn ? "" : "16px",
      }}
    >
      {isLoggedIn ? (
        <button
          type="button"
          className="text-xs px-3 py-0.5 shadow-inner border rounded-md"
          onClick={handleLogout}
        >
          로그아웃
        </button>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-slate-100 px-3 py-0.5 shadow-inner rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-slate-100 px-3 py-0.5 shadow-inner rounded-md"
          />
          <button
            type="submit"
            className="px-5 py-0.5 bg-slate-100 shadow-md rounded-md"
          >
            로그인
          </button>
        </>
      )}
    </form>
  );
};

export default Login;
