import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
type LayoutProps = {
  page: React.ReactNode;
};

const Layout = ({ page }: LayoutProps) => {
  const href = window.location.href;
  return (
    <div className="max-w-sm m-auto shadow-2xl h-screen overflow-hidden">
      <Header />
      <main
        className="z-0 h-full overflow-auto"
        style={{
          marginTop:
            href.includes("edit") ||
            href.includes("addpost") ||
            href.includes("post") ||
            href.includes("search") ||
            href.includes("user")
              ? ""
              : "85px",
        }}
      >
        {page}
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
