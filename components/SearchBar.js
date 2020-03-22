import { useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

const Background = styled("div")`
  background-image: linear-gradient(90deg, #4cafff, #2e93e6);
  padding: 1em 0;
`;

const Container = styled("div")`
  margin: 0 auto;
  padding: 0 0.5em;

  @media (min-width: 940px) {
    max-width: 930px;
  }

  @media (min-width: 1160px) {
    max-width: 1140px;
  }
`;

const Input = styled("input")`
  display: block;
  padding: 0.3em 0.5em 0.3em 0.5em;
  font-size: 1.25rem;
  width: 80%;

  @media (min-width: 1160px) {
    width: 100%;
  }
`;

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.id || "");

  const movePage = e => {
    if (e.key === "Enter") {
      router.push(`/search/${query}`);
    }
  };

  return (
    <Background>
      <Container>
        <label htmlFor="search"></label>
        <Input
          name="search"
          id="search"
          onChange={e => setQuery(e.target.value)}
          type="text"
          value={query}
          onKeyDown={movePage}
        />
      </Container>
    </Background>
  );
};

export default SearchBar;
