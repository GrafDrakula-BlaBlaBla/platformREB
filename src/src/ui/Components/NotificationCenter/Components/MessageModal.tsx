import React from 'react';
import {ModalPage} from '../../../Common/SimpleComponents/ModalPage';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  isReadOnly?: boolean;
  loading?: boolean;
}

export const MessageModal = ({
  isOpen,
  onClose,
  isReadOnly,
  loading,
}: IProps) => {
  return (
    <ModalPage
      header={{
        title: 'Отказ по реестру',
        subTitle: 'Реестр №12002 от 26.03.2021',
      }}
      onClose={onClose}
      isOpen={isOpen}
      loading={loading}
      footerButtonConfig={
        isReadOnly
          ? []
          : [
              {
                children: 'Отправить',
                onClick: () => console.log('Отправка сообщения'),
              },
            ]
      }
    >
      <div>Здесь будет какой-то текст</div>
    </ModalPage>
  );
};
