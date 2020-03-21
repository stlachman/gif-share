import useSWR from "swr";
import fetch from "unfetch";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const fetcher = url => fetch(url).then(r => r.json());

const SearchResults = () => {
  const router = useRouter();
  const { data, error } = useSWR(
    `https://api.tenor.com/v1/search?q=${router.query.id}&key=${process.env.TENOR_KEY}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <h2>Search Results</h2>
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
};

export default SearchResults;
