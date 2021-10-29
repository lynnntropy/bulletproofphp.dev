import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <main className="flex-1 flex flex-col">{children}</main>
    <Footer />
  </div>
);

export default Layout;
