import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import {
  Overlay,
  ModalWindow,
  ModalClose,
  Container,
  OverlayClick,
  Wrapper,
} from './ModalErrors.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ toggleModal, children }) => {
  const isTablet = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    window.document.body.classList.add('scroll-lock');
    return () => window.document.body.classList.remove('scroll-lock');
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onOverlayClick = e => {
    toggleModal();
    if (e.target === e.currentTarget) {
    }
  };

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  return createPortal(
    <Container className="container">
      <Wrapper className="wrapper" isTablet={isTablet}>
        <OverlayClick className="overlayClick" onClick={onOverlayClick} />
        <Overlay className="overlay">
          <ModalWindow>
            <ModalClose onClick={toggleModal} />
            {children}
          </ModalWindow>
        </Overlay>
      </Wrapper>
    </Container>,
    modalRoot,
  );
};

export default Modal;
