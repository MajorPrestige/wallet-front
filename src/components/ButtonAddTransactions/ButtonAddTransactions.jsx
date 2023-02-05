import React from 'react';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';

// import {
//   TransactionButton,
//   IconLogo,
// } from './ButtonAddTransactions.js';
import ModalAddTransactions from 'components/ModalAddTransactions/ModalAddTransactions';
import Modal from './../Modal/Modal';
import ModalAddTransMobile from './../ModalAddTransMobile/ModalAddTransMobile';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { getTransactionsError } from 'redux/transactions/trans-selectors';
import AddTransactionButton from '../AddTransactionButton/AddTransactionButton.jsx';


const ButtonAddTransactions = () => {
  const [isModal, setIsModal] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const transactionError = useSelector(getTransactionsError);


  const toggleModal = () => {
    setIsModal(!isModal);
  };
  return (
    <>
      <AddTransactionButton type="button" onClick={() => toggleModal()}/>

      {!transactionError && !isMobile && isModal && (
        <Modal toggleModal={toggleModal} isSignIn>
          <ModalAddTransactions toggleModalCancel={toggleModal} />
        </Modal>
      )}
      {!transactionError && isMobile && isModal && (
        <Modal toggleModal={toggleModal} isSignIn>
          <ModalAddTransactions toggleModalCancel={toggleModal} />
        </Modal>
      )}
      {transactionError && (
        <Modal toggleModal={toggleModal}>
          <ErrorMessage message={transactionError}>messege</ErrorMessage>
        </Modal>
      )}
    </>
  );
};

export default ButtonAddTransactions;
