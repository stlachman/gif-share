import Header from "./Header";
import SearchBar from "./SearchBar";

const layoutStyle = {
  margin: 20,
  padding: 20
};

const Layout = ({ children }) => {
  return (
    <div style={layoutStyle}>
      <Header />
      <SearchBar />
      {children}
    </div>
  );
};

export default Layout;
