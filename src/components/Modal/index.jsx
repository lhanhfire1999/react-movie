import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = ({ children }) => {
  const modalRef = useRef(null);
  const handleCloseModal = () => {
    modalRef.current.classList.remove('active');
  };

  return (
    <div className="modal" ref={modalRef} onClick={handleCloseModal}>
      {children}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element,
};

export const ModalContent = ({ children }) => {
  const modalContentRef = useRef(null);

  const handlePropagation = (e) => {
    e.stopPropagation();
  };
  const handleCloseModal = () => {
    modalContentRef.current.parentNode.classList.remove('active');
    return null;
  };

  return (
    <div
      className="modal__content"
      ref={modalContentRef}
      onClick={handlePropagation}
    >
      {children}
      <span className="modal__content__close" onClick={handleCloseModal}>
        <i className="bx bx-x"></i>
      </span>
    </div>
  );
};

ModalContent.propTypes = {
  children: PropTypes.element,
};

export default Modal;
