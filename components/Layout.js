import styled from "@emotion/styled";

import Header from "./Header";
import SearchBar from "./SearchBar";

const Main = styled("main")`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1em;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <SearchBar />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
