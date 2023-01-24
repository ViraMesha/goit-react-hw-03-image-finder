import PropTypes from 'prop-types';
import { LoadMoreBtn, LoadMoreBtnWrapper } from './Button.styled';
export const Button = ({ onClick, disabled }) => {
  return (
    <LoadMoreBtnWrapper>
      <LoadMoreBtn disabled={disabled} onClick={() => onClick()}>
        Load more
      </LoadMoreBtn>
    </LoadMoreBtnWrapper>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
