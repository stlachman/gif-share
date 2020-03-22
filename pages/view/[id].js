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
    `https://api.tenor.com/v1/gifs?ids=${router.query.id}&key=${process.env.TENOR_KEY}&limit=1&media_filter=minimal`,
    fetcher
  );

  if (error) return <Layout>failed to load</Layout>;
  if (!data) return <Layout>loading...</Layout>;
  console.log(data);
  const regex = /[^/]+$/;
  const match = data.results[0].itemurl.match(regex)[0].split("-");
  const title = match.slice(0, match.length - 1).join(" ");

  return (
    <Layout>
      <h2>{title}</h2>
      <Grid>
        {data.results.length &&
          data.results.map(gif => {
            return (
              <div key={gif.id}>
                <img src={gif.media[0].gif.url} alt={gif.id} />
              </div>
            );
          })}
      </Grid>
    </Layout>
  );
};

export default SearchResults;
