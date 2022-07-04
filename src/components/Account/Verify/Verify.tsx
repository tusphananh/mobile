import {ReactNativeFile} from 'apollo-upload-client';
import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  useGetImageIdLazyQuery,
  useUploadIdImageMutation,
} from '../../../graphql-generated/graphql';
import Background from '../../Background/Background';
import globalStyles from '../../globalStyles';
import styles from './VerifyStyles';

let options: ImageLibraryOptions = {
  mediaType: 'photo',
  quality: 0.5,
  includeBase64: true,
};

const Verify: React.FC<{navigation: any}> = ({navigation}) => {
  const [frontUri, setFrontUri] = useState('');
  const [backUri, setBackUri] = useState('');
  const [frontPreview, setFrontPreview] = useState<string>();
  const [backPreview, setBackPreview] = useState<string>();
  const [uploadIdImageMutation] = useUploadIdImageMutation();
  const [getImageId, {client}] = useGetImageIdLazyQuery({
    onCompleted: data => {
      if (data.getImageId?.success) {
        setFrontPreview(
          `data:image/*;base64,${data.getImageId.data?.frontSide}`,
        );
        setBackPreview(`data:image/*;base64,${data.getImageId.data?.backSide}`);
      }
    },
  });
  const uploadIdImage = async () => {
    const front = new ReactNativeFile({
      uri: frontUri,
      type: 'image/jpeg',
      name: 'front.jpg',
    });

    const back = new ReactNativeFile({
      uri: backUri,
      type: 'image/jpeg',
      name: 'back.jpg',
    });

    uploadIdImageMutation({
      variables: {
        frontSide: front,
        backSide: back,
      },
    });
  };
  useEffect(() => {
    const front =
      client?.cache?.extract()?.ROOT_QUERY?.getImageId?.data?.frontSide;
    const back =
      client?.cache?.extract()?.ROOT_QUERY?.getImageId?.data?.backSide;
    if (front && back) {
      setFrontPreview(`data:image/*;base64,${front}`);
      setBackPreview(`data:image/*;base64,${back}`);
    } else {
      getImageId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setFrontSide = (front: string) => {
    setFrontPreview(`data:image/jpeg;base64,${front}`);
  };
  const setBackSide = (back: string) => {
    setBackPreview(`data:image/jpeg;base64,${back}`);
  };

  return (
    <Background>
      <SafeAreaView style={[globalStyles.fullWidthHeight]}>
        <View style={[globalStyles.flex1, globalStyles.pd20]}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={[globalStyles.backBtn]}>back</Text>
          </TouchableOpacity>
          <Text style={[globalStyles.h4, globalStyles.bold, styles.title]}>
            Verify
          </Text>
          <View style={styles.contentContainer}>
            <TouchableOpacity
              style={[styles.imgContainer]}
              onPress={async () => {
                const result = await launchImageLibrary(options);
                setFrontUri(result.assets![0].uri!);
                setFrontSide(result.assets![0].base64!);
              }}>
              <Text style={[globalStyles.subtitle]}>Upload Front Side</Text>
              {frontPreview && (
                <Image style={[styles.imgID]} source={{uri: frontPreview}} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.imgContainer]}
              onPress={async () => {
                const result = await launchImageLibrary(options);
                setBackUri(result.assets![0].uri!);
                setBackSide(result.assets![0].base64!);
              }}>
              <Text style={[globalStyles.subtitle]}>Upload Back Side</Text>
              {backPreview && (
                <Image style={[styles.imgID]} source={{uri: backPreview}} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={uploadIdImage}
              style={[globalStyles.confirmBtn, globalStyles.fullWidth]}>
              <Text style={[globalStyles.primaryColor, globalStyles.bold]}>
                Verify
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Verify;
