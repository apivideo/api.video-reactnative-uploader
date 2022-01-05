import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Button,
  Alert,
  Platform,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';
import ApiVideoUploader from '@api.video/react-native-uploader';
import RNFetchBlob from 'rn-fetch-blob';
import { DemoButton } from './components/DemoButton';
import { DemoResponse } from './components/DemoResponse';
import { DemoTitle } from './components/DemoTitle';
import type { Video } from 'src/video-type';

export default function App() {
  const [response, setResponse] = React.useState<any>(null);

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, (res) => {
        setResponse(res);
      });
    }
  }, []);

  const upload = React.useCallback((token: string, uri: string) => {
    if (Platform.OS === 'android') {
      console.log(`video path : `, uri);
      RNFetchBlob.fs.stat(uri).then((stat) => {
        ApiVideoUploader.uploadWithUploadToken(token, stat.path).then(
          (value: Video) => {
            console.log(`json video : `, value);
            Alert.alert(`resultat upload : ${value.videoId}`);
          }
        );
      });
    } else {
      console.log(`token : `, token);
      console.log(`uri : `, uri);
      ApiVideoUploader.uploadWithUploadToken(token, uri).then(
        (value: Video) => {
          console.log(`json video : `, value);
          Alert.alert(`resultat upload : ${value.videoId}`);
        }
      );
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <DemoTitle>🌄 React Native Image Picker</DemoTitle>
      <ScrollView>
        <View style={styles.buttonContainer}>
          {actions.map(({ title, type, options }) => {
            return (
              <DemoButton
                key={title}
                onPress={() => onButtonPress(type, options)}
              >
                {title}
              </DemoButton>
            );
          })}
        </View>
        <DemoResponse>{response}</DemoResponse>
        <Button
          onPress={() => upload('My video token', response.assets[0].uri)}
          title="upload video"
          color="#841584"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },

  image: {
    marginVertical: 24,
    alignItems: 'center',
  },
});

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'video',
    },
  },
];
