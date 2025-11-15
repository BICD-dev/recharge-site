import {Link} from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <img
        src="/images/logo/logo8.png"
        alt="logo"
        width={135}
        height={32}
        style={{ width: "auto", height: "auto" }}
      />
    </Link>
  );
};

export default Logo;
