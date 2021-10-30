import Logo from "../assets/images/logo.svg";
import Link from "next/link";
import { homePath } from "../utils/path";

const Header: React.FC = () => (
  <div className="h-20 mb-8 flex justify-center items-center lg:mb-24">
    <Link href={homePath()}>
      <a>
        <Logo className="h-8 w-auto sm:h-10" alt="Bulletproof PHP" />
      </a>
    </Link>
  </div>
);

export default Header;
