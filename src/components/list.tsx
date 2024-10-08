import { View } from 'react-native';
import React, { ReactElement } from 'react';
import ListItem from '@/components/list-item';

export default function List({
  children,
  style,
}: {
  children: ReactElement<typeof ListItem> | ReactElement<typeof ListItem>[];
  style?: string;
}) {
  const childrenArray = React.Children.toArray(children);
  const modifiedChildren = childrenArray.map((child, index) => {
    if (
      React.isValidElement<{
        firstItem?: boolean;
        lastItem?: boolean;
      }>(child)
    ) {
      if (childrenArray.length === 1) {
        return React.cloneElement(child, { firstItem: true, lastItem: true });
      } else if (index === 0) {
        return React.cloneElement(child, { firstItem: true });
      } else if (index === childrenArray.length - 1) {
        return React.cloneElement(child, { lastItem: true });
      }
      return child;
    }
    return null;
  });

  return <View className={style}>{modifiedChildren}</View>;
}
