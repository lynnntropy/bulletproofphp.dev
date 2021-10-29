import Logo from "../assets/images/logo.svg";

const Header: React.FC = () => (
  <div className="h-20 mb-24 flex justify-center items-center">
    <Logo className="h-8 w-auto sm:h-10" alt="Bulletproof PHP" />
  </div>
);

export default Header;
