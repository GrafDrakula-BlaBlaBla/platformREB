import React, {useEffect, useRef, useState} from 'react';
import useViewModel from '../../hooks/useViewModel';
import moment from 'moment';
import {DiscussionControl} from './DiscussionControl';
import {observer} from 'mobx-react-lite';
import {LoaderWithBackdrop} from '../SimpleComponents/LoaderWithBackdrop';
import {Divider} from '@material-ui/core';
import {
  IDiscussionComViewModel,
  IDiscussionRebViewModel,
} from '../../../ViewModel/viewModels/Discussion';
import {VIEW_MODEL} from '../../../ViewModel/identifiers';
import {IAppViewModel} from '../../../ViewModel/viewModels/App/interfaces';
import {EThreadMessageType} from '../../../Model/Discussion/Model';
import {Message} from './Message';
import {DateMessages} from './DateMessages';
import {IUserViewModel} from '../../../ViewModel/viewModels/User/interfaces';
import {IBankViewModel} from '../../../ViewModel/viewModels/Banks';
import {uuidv4} from '../../../Utils/Uid';
import './index.less';

const LIMIT = 10;

interface IProps {
  viewModel: IDiscussionComViewModel | IDiscussionRebViewModel;
  threadId: string;
  threadType: EThreadMessageType;
  recipientBankId?: string;
}

export const Discussion = observer(
  ({viewModel, threadId, threadType, recipientBankId}: IProps) => {
    const {
      mapMessagesOnDay,
      scrollHeight,
      offset,
      total,
      actualTotal,
      loading,
      sendMessage,
      setOffset,
      setScrollHeight,
      setMessages,
      getMessages,
      clearMessages,
      updateMessages,
    } = viewModel;
    const {currentUser} = useViewModel<IUserViewModel>(VIEW_MODEL.User);
    const {currentBank} = useViewModel<IBankViewModel>(VIEW_MODEL.Banks);
    const {sendNotification} = useViewModel<IAppViewModel>(VIEW_MODEL.App);

    const [messageText, setMessageText] = useState<string>('');
    const [rowsOfTextArea, setRowsOfTextArea] = useState<number>(1);
    const [isSending, setIsSending] = useState(false);
    const messageAreaElement = useRef<HTMLDivElement>(null);

    const offsetIncrement = () => {
      setOffset(offset + 10);
    };

    useEffect(() => {
      let requestLoop: any;
      if (threadId && threadType) {
        getMessages({
          threadId,
          threadType,
          limit: LIMIT,
          offset,
        }).finally(() => {
          offsetIncrement();
          setScrollHeight(messageAreaElement.current?.scrollHeight);
          messageAreaElement.current?.scrollTo({
            top: messageAreaElement.current.scrollHeight,
            left: 0,
          });
        });

        requestLoop = setInterval(() => {
          updateMessages({
            threadId,
            threadType,
            limit: LIMIT,
            offset,
          });
        }, 10000);
      }

      return () => {
        clearMessages();
        clearInterval(requestLoop);
      };
      // eslint-disable-next-line
    }, []);

    const onScroll = (e: any) => {
      for (let i = dateElementRefs.length - 1; i >= 0; i--) {
        const dateElement = dateElementRefs[i];
        if (dateElement && messageAreaElement.current) {
          if (
            dateElement.getBoundingClientRect().top -
              messageAreaElement.current.getBoundingClientRect().top <=
            0
          ) {
            dateElement.parentElement
              ?.getElementsByClassName(`date-${i}`)[0]
              .classList.add('fixed');

            dateElement.classList.add('date-insert-height');
          } else {
            dateElement.parentElement
              ?.getElementsByClassName(`date-${i}`)[0]
              .classList.remove('fixed');
            dateElement.classList.remove('date-insert-height');
          }
        }
      }

      if (messageAreaElement.current?.scrollTop === 0) {
        dateElementRefs.forEach((el, i) => {
          el?.parentElement
            ?.getElementsByClassName(`date-${i}`)[0]
            ?.classList.remove('fixed');
          el?.classList.remove('date-insert-height');
        });
        if (total > actualTotal) {
          getMessages({
            threadId,
            threadType,
            limit: LIMIT,
            offset,
          }).finally(() => {
            offsetIncrement();

            if (messageAreaElement.current) {
              messageAreaElement.current.scroll(
                0,
                messageAreaElement.current?.scrollHeight - scrollHeight
              );
            }
            setScrollHeight(messageAreaElement.current?.scrollHeight);
          });
        }
      }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const enterCount = getEnterCount(e.target.value);
      if (enterCount) {
        setRowsOfTextArea(enterCount + 1);
      } else {
        setRowsOfTextArea(1);
      }

      setMessageText(e.target.value.trim());
    };

    const onSendMessage = () => {
      if (!messageText) return;

      const messageTextCopy = messageText;
      const message = {
        text: messageText,
        threadId: threadId,
        threadType: threadType,
      };

      //ui send message
      const today = moment(new Date()).format('DD.MM.YYYY');
      if (mapMessagesOnDay.has(today)) {
        mapMessagesOnDay.get(today)?.push({
          ...message,
          FIO: currentUser?.FIO,
          time: moment(new Date()).format('HH.mm'),
          senderBankName: currentBank?.bankName,
          isSelf: true,
        });
      }

      setMessages(mapMessagesOnDay);
      setMessageText('');
      setRowsOfTextArea(1);
      setIsSending(true);

      sendMessage(message, recipientBankId)
        .then(() => {
          getMessages({
            threadId: threadId,
            threadType: threadType,
            offset: 0,
            limit: LIMIT,
          }).finally(() => {
            setIsSending(false);
          });
        })
        .catch((err) => {
          sendNotification({
            text: 'Ошибка отправки комментария',
            title: 'Ошибка',
            isError: true,
          });

          //rollback send message ui
          const lastMessages = mapMessagesOnDay.get(today);
          if (lastMessages) {
            lastMessages.pop();
            mapMessagesOnDay.set(today, lastMessages);
          }
          setMessages(mapMessagesOnDay);
          setMessageText(messageTextCopy);
          setIsSending(false);
        })
        .finally(() => {
          messageAreaElement.current?.scrollTo({
            top: messageAreaElement.current.scrollHeight,
            left: 0,
            behavior: 'smooth',
          });
        });
    };

    const dateElementRefs: Array<HTMLDivElement | null> = [];
    const setRef = (ref: HTMLDivElement | null) => {
      dateElementRefs.push(ref);
    };

    return (
      <div
        className="discussion"
        style={{
          height:
            window.innerHeight -
            (messageAreaElement.current?.getBoundingClientRect().top || 0) -
            158,
        }}
      >
        <div
          className="discussion__messages"
          ref={messageAreaElement}
          onScroll={onScroll}
        >
          <LoaderWithBackdrop loading={loading} />
          {Array.from(mapMessagesOnDay).map((dayMessagesPair, i, dates) => {
            const day = dayMessagesPair[0];
            const messages = dayMessagesPair[1];
            return (
              <React.Fragment key={day}>
                <div ref={setRef}></div>
                <DateMessages day={day} className={`date-${i}`} />
                {messages.map((message, n, messages) => {
                  return (
                    <React.Fragment key={uuidv4()}>
                      <Message
                        title={`${message.FIO} (${message.senderBankName})`}
                        time={message.time}
                        text={message.text}
                        self={message.isSelf}
                        loading={
                          i === dates.length - 1 &&
                          n === messages.length - 1 &&
                          isSending
                        }
                      />
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
        <Divider />
        <div className="discussion__controls">
          <DiscussionControl
            value={messageText}
            textLength={messageText.length}
            onChange={onChange}
            onSend={onSendMessage}
            rows={rowsOfTextArea}
          />
        </div>
      </div>
    );
  }
);

function getEnterCount(str: string): number | undefined {
  const regEx = /[\n]+/gm;
  return str.match(regEx)?.length;
}
