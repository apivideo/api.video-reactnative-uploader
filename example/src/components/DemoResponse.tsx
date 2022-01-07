import * as React from 'react';
import { Image, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';

export function DemoResponse({
  videoFile,
}: React.PropsWithChildren<{ videoFile: string | null }>) {
  console.log({ videoFile });
  if (!videoFile) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        resizeMethod="scale"
        style={styles.img}
        source={{ uri: videoFile }}
      />
    </View>
  );
}

interface Styles {
  container: ViewStyle;
  img: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 200,
  },
});
