import useSWR from "swr";
import fetch from "unfetch";
import styled from "@emotion/styled";
import Layout from "../components/Layout";

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

export default function Index() {
  const { data, error } = useSWR(
    `https://api.tenor.com/v1/trending?key=${process.env.TENOR_KEY}`,
    fetcher
  );

  if (error) {
    return (
      <Layout>
        <h2>Error</h2>
      </Layout>
    );
  }
  if (!data) {
    return (
      <Layout>
        <h2>loading...</h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <h2>Gif Share</h2>
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
}
