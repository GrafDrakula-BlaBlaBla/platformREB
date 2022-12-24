import React, {useState} from 'react';
import useViewModel from '../../../../hooks/useViewModel';
import {SStorage} from '../../../../../Utils/Storage';
import {AccordionContainer} from '../../../../Common/SimpleComponents/Accordion';
import {Form, FormField, FormSection} from '../../../../Common/FormComponents';
import {PDFDialog} from '../../../../Common/SimpleComponents/PDFDialog';
import {VIEW_MODEL} from '../../../../../ViewModel/identifiers';
import {IAppViewModel} from '../../../../../ViewModel/viewModels/App/interfaces';
import './index.less';

export const UserInstructionForm = () => {
  const app = useViewModel<IAppViewModel>(VIEW_MODEL.App);
  const [openModalState, setOpenModalState] = useState({
    isOpen: false,
    title: '',
    fileName: '',
  });
  const message = SStorage.notification?.account;

  if (message) {
    app.sendNotification(message);
    SStorage.notification = {
      account: null,
    };
  }

  return (
    <Form className="user-instruction-form">
      <PDFDialog
        isOpen={openModalState.isOpen}
        onClose={() => setOpenModalState({...openModalState, isOpen: false})}
        title={openModalState.title}
        fileName={openModalState.fileName}
      />
      <FormSection title="Сервисы">
        <AccordionContainer title="Фондирование">
          <Form>
            <FormSection title="1. Общая информация">
              <FormField>
                Фонди́рование — это привлечённые ресурсы, используемые банком для
                обеспечения своей основной деятельности.
                <br />
                <br /> Источниками фондирования могут быть средства на
                депозитных, расчётных и текущих счетах клиентов, заимствования
                на российских и международных рынках капитала, межбанковские
                кредиты и другие. На сегодняшний день основную долю привлеченных
                средств в банках формируют средства клиентов.
                <br />
                <br /> При оценке финансовой деятельности банка всегда
                анализируют структуру фондирования, в том числе его срочность и
                стоимость.
                <br />
                <br />
                Фондирование может быть долгосрочным и краткосрочным. Например,
                к первому относятся заимствования на рынках капитала, а ко
                второму — текущие и расчётные счета клиентов. Сбалансированность
                ресурсной базы с активами по срокам обеспечивает полноценное
                функционирование банка.
                <br />
                <br /> Стоимость привлеченных ресурсов условно можно разделить
                на высокую, например у выпущенных облигаций, и низкую — у
                средств клиентов на текущих и расчётных счетах.
              </FormField>
            </FormSection>
            <FormSection title="2. Материалы по продукту">
              <FormField>
                <span
                  className="link"
                  onClick={() => {
                    setOpenModalState({
                      ...openModalState,
                      isOpen: true,
                      fileName: 'fondirovanie.pdf',
                      title:
                        'Инструкция пользователя по продукту «Фондирование»',
                    });
                  }}
                >
                  Инструкция пользователя по продукту «Фондирование».pdf
                </span>
              </FormField>
            </FormSection>
          </Form>
        </AccordionContainer>
        <AccordionContainer title="Кредит под аккредитив">
          <Form>
            <FormSection title="1. Общая информация">
              <FormField>
                Продукт «Кредит под резервный аккредитив» представляет собой
                предоставление РЭБом льготного кредита экспортеру под
                обеспечение обслуживающего банка в виде резервного аккредитива.
                <br />
                <br /> {'   '}Кредит под резервный аккредитив открывается в
                обеспечение обязательства Клиента перед РЭБ по Кредитному
                договору (Соглашению о кредитной линии), заключенному между
                Клиентом и РЭБ. <br />
                <br /> Аккредитив выполняет гарантийную функцию, с учетом и в
                соответствии с Положением Банка России от 28 июня 2017 г. №
                590-П «О порядке формирования кредитными организациями резервов
                на возможные потери по ссудам, ссудной и приравненной к ней
                задолженности» в действующей редакции или заменяющим его актом,
                для целей обеспечения исполнения Клиентом платежных обязательств
                по Кредитному договору перед Бенефициаром.
              </FormField>
            </FormSection>
            <FormSection title="2. Материалы по продукту">
              <FormField>
                <span
                  className="link"
                  onClick={() => {
                    setOpenModalState({
                      ...openModalState,
                      isOpen: true,
                      fileName: 'creditForAccreditive.pdf',
                      title:
                        'Инструкция пользователя по продукту «Кредит под резервный аккредитив»',
                    });
                  }}
                >
                  {' '}
                  Инструкция пользователя по продукту «Кредит под резервный
                  аккредитив».pdf
                </span>
              </FormField>
            </FormSection>
          </Form>
        </AccordionContainer>
      </FormSection>
      <FormSection title="Ролевая модель">
        <AccordionContainer title="Описание ролей и прав пользователей в системе">
          <Form>
            <FormSection title="1. Регистрация/аккредитация">
              <FormField>
                <span
                  className="link"
                  onClick={() => {
                    setOpenModalState({
                      ...openModalState,
                      isOpen: true,
                      fileName: 'administrator.pdf',
                      title: 'Администратор',
                    });
                  }}
                >
                  Администратор.pdf
                </span>
              </FormField>
            </FormSection>
            <FormSection title="2. Фондирование">
              <FormField>
                <span
                  className="link"
                  onClick={() => {
                    setOpenModalState({
                      ...openModalState,
                      isOpen: true,
                      fileName: 'lead.pdf',
                      title: 'Руководитель',
                    });
                  }}
                >
                  Руководитель.pdf
                </span>
              </FormField>
              <FormField>
                <span
                  className="link"
                  onClick={() => {
                    setOpenModalState({
                      ...openModalState,
                      isOpen: true,
                      fileName: 'manager_1.pdf',
                      title: 'Менеджер_1',
                    });
                  }}
                >
                  Менеджер_1.pdf
                </span>
              </FormField>
              <FormField>
                <span
                  className="link"
                  onClick={() => {
                    setOpenModalState({
                      ...openModalState,
                      isOpen: true,
                      fileName: 'Manager_2.pdf',
                      title: 'Менеджер 2',
                    });
                  }}
                >
                  Менеджер_2.pdf
                </span>
              </FormField>
            </FormSection>
            <FormSection title="3. Кредит под резервный аккредитив">
              <FormField>
                <span
                  className="link"
                  onClick={() => {
                    setOpenModalState({
                      ...openModalState,
                      isOpen: true,
                      fileName: 'Kontroler_1.pdf',
                      title: 'Контролер 1',
                    });
                  }}
                >
                  Контролер_1.pdf
                </span>
              </FormField>
              <FormField>
                <span
                  className="link"
                  onClick={() => {
                    setOpenModalState({
                      ...openModalState,
                      isOpen: true,
                      fileName: 'Kontroler_2.pdf',
                      title: 'Контролер 2',
                    });
                  }}
                >
                  Контролер_2.pdf
                </span>
              </FormField>
            </FormSection>
          </Form>
        </AccordionContainer>
      </FormSection>
      <FormSection title="Аккредитация и регистрация учетных записей">
        <AccordionContainer title="Общая информация">
          <Form>
            <FormSection title="1. Материалы">
              <FormField>
                <span
                  className="link"
                  onClick={() => {
                    setOpenModalState({
                      ...openModalState,
                      isOpen: true,
                      fileName: 'regAndAccrdtv.pdf',
                      title:
                        'Инструкция по аккредитации и регистрации учетных записей пользователей',
                    });
                  }}
                >
                  Инструкция по аккредитации и регистрации учетных записей
                  пользователей.pdf
                </span>
              </FormField>
            </FormSection>
          </Form>
        </AccordionContainer>
      </FormSection>
    </Form>
  );
};
