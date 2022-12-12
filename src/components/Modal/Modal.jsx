import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalWrap } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClickBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { currentImageUrl, currentImageDescription } = this.props;

    return createPortal(
      <Backdrop onClick={this.handleClickBackdrop}>
        <ModalWrap>
          <img
            src={currentImageUrl}
            alt={currentImageDescription}
            loading="lazy"
          />
        </ModalWrap>
      </Backdrop>,
      modalRoot
    );
  }
}
