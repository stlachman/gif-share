import Link from "next/link";
import styled from "@emotion/styled";

const Container = styled("div")`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0.8em 0.5em;
`;
const Nav = styled("nav")`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Header = ({ user, loading }) => {
  return (
    <Container>
      <Nav>
        <Link href="/">
          <a>Tenor</a>
        </Link>
        {!loading && user ? (
          <>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
            <Link href="/api/logout">
              <a>Logout</a>
            </Link>
          </>
        ) : (
          <Link href="/api/login">
            <a>Login</a>
          </Link>
        )}
      </Nav>
    </Container>
  );
};

export default Header;
