import Link from "next/link";
import { homePath } from "../utils/path";
import Twemoji from "./Twemoji";

const Header: React.FC = () => (
  <div className="h-20 mb-8 flex justify-center items-center lg:mb-24">
    <Link href={homePath()}>
      <a>
        <span className="font-title text-xl font-bold lg:text-2xl">
          <Twemoji emoji="🐘" /> Bulletproof PHP
        </span>
      </a>
    </Link>
  </div>
);

export default Header;
