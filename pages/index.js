import useSWR from "swr";
import fetch from "unfetch";
import { useFetchUser } from "../lib/user";
import Layout from "../components/Layout";
import GifList from "../components/GifList";
import Loader from "../components/Loader";

const fetcher = url => fetch(url).then(r => r.json());

export default function Index() {
  const { user, loading } = useFetchUser();
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
    return <Loader />;
  }

  return (
    <Layout user={user} loading={loading}>
      <h2>Trending Gifs</h2>
      <GifList data={data.results} />
    </Layout>
  );
}
