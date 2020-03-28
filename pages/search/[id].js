import useSWR from "swr";
import fetch from "unfetch";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import GifList from "../../components/GifList";
import Loader from "../../components/Loader";

const fetcher = url => fetch(url).then(r => r.json());

const SearchResults = () => {
  const router = useRouter();
  const { data, error } = useSWR(
    `https://api.tenor.com/v1/search?q=${router.query.id}&key=${process.env.TENOR_KEY}&media_filter=minimal`,
    fetcher
  );

  if (error) return <Layout>failed to load</Layout>;
  if (!data) return <Loader />;

  return (
    <Layout>
      <h2>{router.query.id}</h2>
      <GifList data={data.results} />
    </Layout>
  );
};

export default SearchResults;
