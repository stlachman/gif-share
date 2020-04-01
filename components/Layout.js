import styled from "@emotion/styled";

import Header from "./Header";
import SearchBar from "./SearchBar";

const Main = styled("main")`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1em;
`;

const Layout = ({ user, loading = false, children }) => {
  return (
    <>
      <Header user={user} loading={loading} />
      <SearchBar />
      <Main>{children}</Main>
    </>
  );
};

export default Layout;
