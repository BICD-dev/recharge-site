import Image from "next/image";
import {Link} from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <Image
        src="/images/logo/logo8.png"
        alt="logo"
        width={135}
        height={32}
        style={{ width: "auto", height: "auto" }}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
