import Link from "next/link";

const linkStyle = {
  marginRight: 15
};

const Header = () => {
  return (
    <div>
      <Link href="/">
        <a style={linkStyle}>Tenor</a>
      </Link>
    </div>
  );
};

export default Header;
