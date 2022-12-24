import React, {FC, useEffect} from 'react';
import {useFormContext} from 'react-hook-form';
import {ModalPage} from '../../SimpleComponents/ModalPage';
import {observer} from 'mobx-react-lite';
import {IBaseCardViewModel} from '../../../../ViewModel/viewModels/BaseCard/interfaces';
import './index.less';

interface IParametersModalProps<T> {
  title: string;
  viewModel: IBaseCardViewModel<T>;
  className?: string;
  onBeforeSubmit?: (data: T) => any;
  onAfterSubmit?: () => void;
  labelCancelButton?: string;
  labelSubmitButton?: string;
  children: JSX.Element;
}

export const FormModal: FC<IParametersModalProps<any>> = observer((props) => {
  const {
    title,
    viewModel,
    className,
    onBeforeSubmit,
    onAfterSubmit,
    labelCancelButton = 'Отмена',
    labelSubmitButton = 'Сохранить',
    children,
  } = props;

  const cls = ['form-modal'];
  if (className) cls.push(className);

  const {handleSubmit} = useFormContext();

  const onSubmit = async (data: any) => {
    if (onBeforeSubmit) onBeforeSubmit(data);
    viewModel.setFields(data);
    await viewModel.saveData().finally(() => {
      onAfterSubmit?.();
    });
    viewModel.setIsOpenCard(false);
  };

  const onClose = (): void => {
    viewModel.setIsOpenCard(false);
  };

  // eslint-disable-next-line
  useEffect(() => () => onClose(), []);

  return (
    <ModalPage
      className={cls.join(' ')}
      loading={viewModel.loading}
      onClose={onClose}
      isOpen={viewModel.isOpenCard}
      header={{title: title}}
      footerButtonConfig={[
        {
          children: labelCancelButton,
          onClick: onClose,
          whiteTheme: true,
        },
        {
          children: labelSubmitButton,
          onClick: handleSubmit(onSubmit),
        },
      ]}
    >
      {children}
    </ModalPage>
  );
});
