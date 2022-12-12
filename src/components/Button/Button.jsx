import { ButtonLoad } from './Button.styled';
import PropTypes from 'prop-types';

export function Button({ onNextFetch }) {
  return (
    <ButtonLoad type="button" onClick={onNextFetch}>
      Load more
    </ButtonLoad>
  );
}

Button.propTypes = {
  onNextFetch: PropTypes.func.isRequired,
};
