import useSWR from "swr";
import fetch from "unfetch";
import Layout from "../components/Layout";
import GifList from "../components/GifList";

const fetcher = url => fetch(url).then(r => r.json());

export default function Index() {
  const { data, error } = useSWR(
    `https://api.tenor.com/v1/trending?key=${process.env.TENOR_KEY}&media_filter=minimal`,
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
      <GifList data={data.results} />
    </Layout>
  );
}
