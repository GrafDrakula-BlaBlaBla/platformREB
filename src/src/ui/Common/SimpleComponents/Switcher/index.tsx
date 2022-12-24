import React, {FC, useEffect, useRef} from 'react';
import './index.less';

interface IProps {
  items: Array<Item>;
}

interface Item {
  title: string;
  value: string;
  selected: boolean;
  onClick: () => void;
}

export const Switcher: FC<IProps> = ({items}) => {
  const switcherElRef = useRef<HTMLDivElement>(null);
  const itemsElsRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    itemsElsRefs.current.forEach((item, i) => {
      const value = item.getAttribute('data-value');
      const selected = items.find((d) => d.selected);
      if (value === selected?.value) {
        item.children[0].classList.add('switcher__item_white');
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    //choose index of selected element
    let index = 0;
    itemsElsRefs.current.forEach((item, i) => {
      const value = item.getAttribute('data-value');
      const selected = items.find((d) => d.selected);
      if (value === selected?.value) index = i;
    });
    setTimeout(() => {
      moveRunnerTo(index);
    }, 100);
  }, [items]);

  const moveRunnerTo = (indexOfItem: number) => {
    if (switcherElRef.current) {
      const elementDuration = getComputedStyle(switcherElRef.current)
        .transitionDuration;
      const duration = (parseFloat(elementDuration) * 1000) / 3;
      let leftMarginSwitcher = 0;
      itemsElsRefs.current.forEach((item, i) => {
        const element = item.children[0];
        if (i === indexOfItem) {
          setTimeout(() => {
            element.classList.add('switcher__item_white');
          }, duration);
        } else {
          setTimeout(() => {
            element.classList.remove('switcher__item_white');
          }, duration);
        }
        if (i < indexOfItem) {
          leftMarginSwitcher += item.offsetWidth;
        }
      });
      switcherElRef.current.style.left = leftMarginSwitcher + 'px';
      switcherElRef.current.style.width = getComputedStyle(
        itemsElsRefs.current[indexOfItem]
      ).width;
    }
  };

  return (
    <div className="switcher">
      <div className="switcher__container">
        {items.map((item, i) => {
          return (
            <div
              key={item.value}
              data-value={item.value}
              className="switcher__item"
              ref={(el) => {
                if (el) itemsElsRefs.current[i] = el;
              }}
              onClick={item.onClick}
            >
              <div className="switcher__item-title">{item.title}</div>
            </div>
          );
        })}
        <div className="switcher__runner" ref={switcherElRef} />
      </div>
    </div>
  );
};
