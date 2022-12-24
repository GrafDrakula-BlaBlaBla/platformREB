import React, {
  ReactChild,
  ReactFragment,
  ReactNodeArray,
  useEffect,
} from 'react';

interface IFormWrapperGetNamesFields {
  handler: (names: string[]) => void;
  children: ReactNodeArray | ReactChild | ReactFragment | Element[] | null;
}

type childType = {
  props?: {
    children?: childrenType | childType;
    name?: string;
  };
};
type childrenType = childType[] | childType;

export const FormWrapperGetNamesFields = ({
  children,
  handler,
}: IFormWrapperGetNamesFields): JSX.Element => {
  const trigger = children instanceof Array ? children.length : children;
  useEffect(() => {
    const names: string[] = [];
    const parseChildren = (children: childrenType) => {
      if (children instanceof Array) {
        children.forEach(parseChild);
      } else if (children instanceof Object && children !== null) {
        parseChild(children);
      }
    };

    const parseChild = (child: childType) => {
      if (child && child.props) {
        const {name, children} = child.props;
        if (name) {
          names.push(name);
        } else if (children) {
          parseChildren(children);
        }
      } else if (child instanceof Array) {
        parseChildren(child);
      }
    };

    parseChildren(children as childrenType);
    handler(names);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return <>{children}</>;
};
