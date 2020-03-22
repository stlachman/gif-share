import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "@emotion/styled";
import useDebounce from "../hooks/useDebounce";

const Background = styled("div")`
  background-image: linear-gradient(90deg, #4cafff, #2e93e6);
  padding: 1em 0;
`;

const OuterContainer = styled("div")`
  position: relative;
`;

const Container = styled("div")`
  margin: 0 auto;
  padding: 0 0.5em;
  position: relative;

  @media (min-width: 940px) {
    max-width: 930px;
  }

  @media (min-width: 1160px) {
    max-width: 1140px;
  }
`;

const SearchResults = styled("div")`
  position: absolute;
  background: #fff;
  width: 100%;
`;

const List = styled("ul")`
  list-style: none;
  padding-left: 0;
`;

const Li = styled("li")`
  padding: 0.5em;
  background-color: ${props =>
    props.selected ? "rgba(200,200,200,0.45)" : "#fff"};
`;

const ResultLink = styled("a")`
  color: #000;
  text-decoration: none;
  cursor: pointer;
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

function fetchData(searchTerm) {
  return fetch(
    `https://api.tenor.com/v1/autocomplete?q=${searchTerm}&key=${process.env.TENOR_KEY}&limit=10`,
    {
      method: "GET"
    }
  )
    .then(r => r.json())
    .then(r => r.results)
    .catch(error => {
      console.error(error);
      return [];
    });
}

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const debouncedSearchTerm = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      fetchData(debouncedSearchTerm).then(results => {
        setIsSearching(false);
        setResults(results);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  const handleKeyDown = e => {
    if (e.key === "ArrowUp" && results.length > 0) {
      if (selectedIndex > -1) {
        setSelectedIndex(selectedIndex - 1);
      } else {
        setSelectedIndex(results.length - 1);
      }
    }

    if (e.key === "ArrowDown" && results.length > 0) {
      if (selectedIndex < results.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      } else {
        setSelectedIndex(-1);
      }
    }

    if (e.key === "Enter") {
      if (selectedIndex > -1) {
        const currentSelection = results[selectedIndex];
        router.push(`/search/${currentSelection}`);
      } else {
        router.push(`/search/${query}`);
      }
    }
  };

  return (
    <Background>
      <OuterContainer>
        <Container>
          <label htmlFor="search"></label>
          <Input
            name="search"
            id="search"
            onChange={e => setQuery(e.target.value)}
            type="text"
            value={query}
            onKeyDown={handleKeyDown}
            placeholder="Powered By Tenor"
          />
          <SearchResults>
            {results.length > 0 && (
              <List>
                {results.map((suggestion, i) =>
                  selectedIndex === i ? (
                    <Li selected key={i}>
                      <Link href={`/search/${suggestion}`}>
                        <ResultLink>{suggestion}</ResultLink>
                      </Link>
                    </Li>
                  ) : (
                    <Li key={i}>
                      <Link href={`/search/${suggestion}`}>
                        <ResultLink>{suggestion}</ResultLink>
                      </Link>
                    </Li>
                  )
                )}
              </List>
            )}
          </SearchResults>
        </Container>
      </OuterContainer>
    </Background>
  );
};

export default SearchBar;
