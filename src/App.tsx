import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AddPost from "./pages/AddPost";
import Main from "./pages/Main";
import PostEdit from "./components/post/PostEdit";
import Layout from "./Layout";
import User from "./pages/User";
import PostDetail from "./components/post/PostDetail";
import Search from "./pages/Search";
import UserInfoEdit from "./components/user/UserInfoEdit";
import Like from "./pages/Like";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout page={<Main />} />} />
        <Route path="/user/:uid/edit" element={<Layout page={<UserInfoEdit />} />} />
        <Route path="/user/:uid" element={<Layout page={<User />} />} />
        <Route path="/user" element={<Layout page={<User />} />} />
        <Route path="/addpost" element={<Layout page={<AddPost />} />} />
        <Route path="/search" element={<Layout page={<Search />} />} />
        <Route path="/edit/:postId" element={<Layout page={<PostEdit />} />} />
        <Route path="/post/:postId" element={<Layout page={<PostDetail />} />} />
        <Route path="/like" element={<Layout page={<Like />} />} />
      </Routes>
    </Router>
  );
}

export default App;