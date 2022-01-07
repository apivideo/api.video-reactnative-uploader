import React from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  color?: string;
}

export function DemoButton({
  onPress,
  children,
  disabled,
  color,
}: React.PropsWithChildren<Props>) {
  return (
    <Pressable
      onPress={() => {
        if (!disabled) onPress();
      }}
      style={{
        backgroundColor: color ? color : disabled ? '#FF7355' : '#F64325',
        ...styles.container,
      }}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

interface Styles {
  container: ViewStyle;
  text: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    minWidth: '45%',
    maxWidth: '100%',
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  text: {
    textAlign: 'center',
    color: 'white',
  },
});
