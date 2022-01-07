import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
} from 'react-native';

interface Props {
  children: any;
}

export function DemoTitle({ children }: Props) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../logo.png')} />
      <Text style={styles.text}>{children}</Text>
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  text: TextStyle;
  logo: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#080B13',
    display: 'flex',
  },
  logo: {
    height: 64,
    width: 64,
  },
  text: {
    fontSize: 24,
    color: 'white',
  },
});
