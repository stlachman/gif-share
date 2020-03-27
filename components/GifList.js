import styled from "@emotion/styled";
import Gif from "./Gif";

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
const GifList = ({ data }) => {
  return (
    <Grid>
      {data.map(gif => {
        return <Gif key={gif.id} gif={gif} />;
      })}
    </Grid>
  );
};

export default GifList;
