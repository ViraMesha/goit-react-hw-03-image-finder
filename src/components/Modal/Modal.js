import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';
export const Modal = ({ img, onBackdropClick }) => {
  function handleBackdropClick(event) {
    if (event.currentTarget === event.target) {
      onBackdropClick();
    }
  }
  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={img} alt="img" />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onBackdropClick: PropTypes.func.isRequired,
};
