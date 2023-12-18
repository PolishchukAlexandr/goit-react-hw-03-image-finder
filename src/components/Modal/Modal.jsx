// import { useEffect } from "react";

import PropTypes from 'prop-types';
import style from './modal.module.scss';
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root')

const Modal = ({closeModal, img}) => {
    componentDidMount() {
        window.addEventListener('keydown', handleKeyDown)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', handleKeyDown);
    }

  const handleKeyDown = (e) => {
        if (e.code === 'Escape') {
            closeModal();
        }
    }

  const handleClick = (e) => {
        if (e.currentTarget === e.target) {
            closeModal();
        }
    }

        return createPortal((
            <div className={style.overlay} onClick={handleClick}>
                <div className={style.modal}>
                    <img src={img.url} alt={img.alt} />
                </div>
            </div>
        ), modalRoot)
}

Modal.propTypes = {
    img: PropTypes.object,
    closeModal: PropTypes.func,
}

export default Modal;