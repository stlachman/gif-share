import Link from "next/link";
import styled from "@emotion/styled";

const GifContainer = styled.a`
  cursor: pointer;
  transition: 0.225s transform ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
`;

const GifImage = styled.img`
  border: 1px solid #eee;
  border-radius: 0.2rem;
`;

const Gif = ({ gif }) => {
  return (
    <Link href={`/view/${gif.id}`} key={gif.id}>
      <GifContainer>
        <GifImage src={gif.media[0].tinygif.url} alt={gif.id} />
      </GifContainer>
    </Link>
  );
};

export default Gif;
