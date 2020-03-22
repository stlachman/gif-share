import useSWR from "swr";
import fetch from "unfetch";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Layout from "../../components/Layout";

const Grid = styled("div")`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  @media (min-width: 650px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 940px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const fetcher = url => fetch(url).then(r => r.json());

const SearchResults = () => {
  const router = useRouter();
  const { data, error } = useSWR(
    `https://api.tenor.com/v1/search?q=${router.query.id}&key=${process.env.TENOR_KEY}`,
    fetcher
  );

  if (error) return <Layout>failed to load</Layout>;
  if (!data) return <Layout>loading...</Layout>;

  return (
    <Layout>
      <h2>{router.query.id}</h2>
      <Grid>
        {data.results.length &&
          data.results.map(gif => {
            return (
              <div key={gif.id}>
                <img src={gif.media[0].tinygif.url} alt={gif.id} />
              </div>
            );
          })}
      </Grid>
    </Layout>
  );
};

export default SearchResults;
