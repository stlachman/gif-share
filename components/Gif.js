import Link from "next/link";
import styled from "@emotion/styled";

const Gif = ({ gif }) => {
  return (
    <Link href={`/view/${gif.id}`} key={gif.id}>
      <a>
        <img src={gif.media[0].tinygif.url} alt={gif.id} />
      </a>
    </Link>
  );
};

export default Gif;
