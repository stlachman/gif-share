import { useState } from "react";
import { useRouter } from "next/router";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.id || "");

  const movePage = e => {
    if (e.key === "Enter") {
      router.push(`/search/${query}`);
    }
  };

  return (
    <div>
      <label htmlFor="search">
        <input
          name="search"
          id="search"
          onChange={e => setQuery(e.target.value)}
          type="text"
          value={query}
          placeholder="Powered by Tenor"
          onKeyDown={movePage}
        />
      </label>
    </div>
  );
};

export default SearchBar;
