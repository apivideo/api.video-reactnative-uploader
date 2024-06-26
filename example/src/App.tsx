import ApiVideoUploader from '@api.video/react-native-video-uploader';
import * as React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { ImagePickerResponse } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { DemoButton } from './components/DemoButton';
import { DemoResponse } from './components/DemoResponse';
import { DemoTitle } from './components/DemoTitle';
import type { Video } from 'src/types';

export default function App() {
  const [videoFile, setVideoFile] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [isProgressive, setIsProgressive] = React.useState<boolean>(false);
  const [uploadToken, setUploadToken] = React.useState<string>('');
  const [chunkSize, setChunkSize] = React.useState<string>('20');
  const [uploadResult, setUploadResult] = React.useState<any | null>(null);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);

      if (
        granted['android.permission.CAMERA'] !==
        PermissionsAndroid.RESULTS.GRANTED
      ) {
        throw new Error('Permissions request failed');
      }
    }
  };

  const onSelectButtonPress = React.useCallback((type, options) => {
    const setVideoFileFromPickerResponse = (elt: ImagePickerResponse) =>
      elt?.assets && elt?.assets.length > 0 && elt?.assets[0].uri
        ? setVideoFile(elt?.assets[0].uri)
        : setVideoFile(null);

    requestPermissions().then(() => {
      if (type === 'capture') {
        ImagePicker.launchCamera(options, setVideoFileFromPickerResponse);
      } else {
        ImagePicker.launchImageLibrary(options, setVideoFileFromPickerResponse);
      }
    });
  }, []);

  const onUploadButtonPress = React.useCallback(
    (
      token: string,
      uri: string | null,
      chunkSize: string,
      isProgressive: boolean
    ) => {
      const chunkSizeInt = parseInt(chunkSize);

      if (!uri) {
        return;
      }

      if (!chunkSizeInt || chunkSizeInt < 5 || chunkSizeInt > 128) {
        Alert.alert(
          'Invalid chunk size',
          'Chunk size value must be between 5 and 128'
        );
        return;
      }

      setUploading(true);

      ApiVideoUploader.setChunkSize(1024 * 1024 * parseInt(chunkSize));

      const resolveUri = (u: string): Promise<string> => {
        return Platform.OS === 'android'
          ? ReactNativeBlobUtil.fs.stat(u).then((stat) => stat.path)
          : new Promise((resolve, _) => resolve(u.replace('file://', '')));
      };

      resolveUri(uri).then(async (u) => {
        if (isProgressive) {
          const size = (await ReactNativeBlobUtil.fs.stat(u)).size;

          const session = ApiVideoUploader.createProgressiveUploadSession({
            token,
          });
          const chunkSizeBytes = 1024 * 1024 * chunkSizeInt;
          let start = 0;
          for (
            let i = 0;
            start <= size - chunkSizeBytes;
            start += chunkSizeBytes, i++
          ) {
            await ReactNativeBlobUtil.fs.slice(
              u,
              `${u}.part${i}`,
              start,
              start + chunkSizeBytes
            );
            await session.uploadPart(`${u}.part${i}`);
          }
          await ReactNativeBlobUtil.fs.slice(u, `${u}.lastpart`, start, size);
          const value = await session.uploadLastPart(u + '.lastpart');
          setUploadResult(value);
          setUploading(false);
        } else {
          ApiVideoUploader.uploadWithUploadToken(token, u)
            .then((value: Video) => {
              setUploadResult(value);
              setUploading(false);
            })
            .catch((e: any) => {
              Alert.alert('Upload failed', e?.message || JSON.stringify(e));
              setUploading(false);
            });
        }
      });
    },
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <DemoTitle>api.video uploader sample</DemoTitle>
      <ScrollView style={styles.scrollview}>
        {!uploadResult && !videoFile && (
          <View>
            <Text style={styles.textSectionTitle}>
              First, select a video to upload:
            </Text>
            <View style={styles.buttonContainer}>
              {actions.map(({ title, type, options }) => {
                return (
                  <DemoButton
                    disabled={uploading}
                    key={title}
                    onPress={() => onSelectButtonPress(type, options)}
                  >
                    {title}
                  </DemoButton>
                );
              })}
            </View>
          </View>
        )}
        {!uploadResult && videoFile && (
          <>
            <DemoResponse videoFile={videoFile} />
            <Text style={styles.textSectionTitle}>
              Then, define your settings:
            </Text>
            <View
              style={{
                borderLeftWidth: 1,
                marginLeft: 8,
                borderLeftColor: '#F64325',
                marginVertical: 5,
              }}
            >
              <Text style={styles.label}>Upload token:</Text>
              <TextInput
                editable={!uploading}
                selectTextOnFocus={!uploading}
                style={styles.textInput}
                placeholder="Your upload token"
                value={uploadToken}
                onChangeText={setUploadToken}
              />
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                marginLeft: 8,
                borderLeftColor: '#F64325',
                marginVertical: 5,
              }}
            >
              <Text style={styles.label}>Chunk size (MB):</Text>
              <TextInput
                editable={!uploading}
                selectTextOnFocus={!uploading}
                style={styles.textInput}
                placeholder="The chunk size"
                value={chunkSize}
                onChangeText={(a) => setChunkSize(a)}
                keyboardType="numeric"
              />
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                marginLeft: 8,
                borderLeftColor: '#F64325',
                marginVertical: 5,
                alignItems: 'flex-start',
              }}
            >
              <Text style={styles.label}>Progressive upload</Text>
              <Switch
                disabled={uploading}
                trackColor={{ false: '#767577', true: '#767577' }}
                thumbColor={isProgressive ? '#F64325' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setIsProgressive(!isProgressive)}
                value={isProgressive}
              />
            </View>
            <Text style={styles.textSectionTitle}>And finally... upload!</Text>
            <DemoButton
              disabled={uploading}
              onPress={() =>
                onUploadButtonPress(
                  uploadToken,
                  videoFile,
                  chunkSize,
                  isProgressive
                )
              }
            >
              {uploading ? 'UPLOADING...' : 'UPLOAD'}
            </DemoButton>
            <DemoButton
              disabled={uploading}
              onPress={() => setVideoFile(null)}
              color="grey"
            >
              {'Cancel'}
            </DemoButton>
          </>
        )}
        {uploadResult && (
          <>
            <Text style={{ ...styles.textSectionTitle, marginBottom: 10 }}>
              Upload done! Here is the API result:
            </Text>
            <Text style={styles.text}>Video id: {uploadResult.videoId}</Text>
            <Text style={{ ...styles.text, marginBottom: 20 }}>
              Player url: {uploadResult.assets.player}
            </Text>
            <DemoButton
              disabled={uploading}
              onPress={() => {
                setVideoFile(null), setUploadResult(null);
              }}
            >
              New upload
            </DemoButton>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollview: {
    padding: 10,
  },
  text: {
    paddingHorizontal: 8,
  },
  textSectionTitle: {
    padding: 8,
    fontWeight: 'bold',
  },

  label: {
    borderColor: '#F64325',
    color: 'black',
    marginHorizontal: 10,
    fontSize: 14,
  },
  textInput: {
    fontSize: 12,
    color: '#F64325',
    marginHorizontal: 10,
    padding: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    title: 'Record a video',
    type: 'capture',
    options: {
      selectionLimit: 1,
      mediaType: 'video',
    },
  },
  {
    title: 'Select an existing video',
    type: 'library',
    options: {
      selectionLimit: 1,
      mediaType: 'video',
    },
  },
];
