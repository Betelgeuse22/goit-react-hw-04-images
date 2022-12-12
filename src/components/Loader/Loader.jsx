import CircleLoader from 'react-spinners/CircleLoader';
import { LoaderWrap } from './Loader.styled';

export function Loader() {
  return (
    <LoaderWrap>
      <CircleLoader color="#3654d6" size={100} />
    </LoaderWrap>
  );
}
