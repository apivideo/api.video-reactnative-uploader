import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
} from 'react-native';

export function DemoResponse({ children }: React.PropsWithChildren<{}>) {
  var json = JSON.stringify(children, null, 2);
  var ui = JSON.parse(json);

  var uri = ui?.assets[0].uri;

  if (children == null) {
    ui = 'children null';
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{json}</Text>
      <View style={styles.image}>
        <Image
          resizeMode="cover"
          resizeMethod="scale"
          style={styles.img}
          source={{ uri: uri }}
        />
      </View>
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  text: TextStyle;
  image: ViewStyle;
  img: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    backgroundColor: '#dcecfb',
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
  },
  text: {
    color: 'black',
  },
  image: {
    marginVertical: 24,
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
  },
});
