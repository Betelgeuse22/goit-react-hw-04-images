import {ButtonLoad} from './Button.styled'


export function Button({ onNextFetch }) {
  return (
    <ButtonLoad type="button" onClick={onNextFetch}>
      Load more
    </ButtonLoad>
  );
}
