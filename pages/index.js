import useSWR from "swr";
import fetch from "unfetch";
import Layout from "../components/Layout";

const fetcher = url => fetch(url).then(r => r.json());

export default function Index() {
  const { data, error } = useSWR(
    `https://api.tenor.com/v1/trending?key=${process.env.TENOR_KEY}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <h2>Gif Share</h2>
      {data.results.length &&
        data.results.map(gif => {
          return (
            <div key={gif.id}>
              <img src={gif.media[0].tinygif.url} alt={gif.id} />
            </div>
          );
        })}
    </Layout>
  );
}
