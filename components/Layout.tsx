import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default Layout;
