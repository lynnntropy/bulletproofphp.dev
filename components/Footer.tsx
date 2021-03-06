const Footer: React.FC = () => (
  <footer className="h-28 flex flex-col justify-center items-center text-gray-500 lg:mt-24">
    <span className="mb-2">© {new Date().getFullYear()} Bulletproof PHP</span>
    <span className="text-sm text-gray-400">
      This site doesn't use tracking cookies.
    </span>
  </footer>
);

export default Footer;
