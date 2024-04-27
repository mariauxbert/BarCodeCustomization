
import React, { useState, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import QRCode from 'react-native-qrcode-svg';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
  Image
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import QRCodeStyled from 'react-native-qrcode-styled';
import CirclePieces from "./barcodeComponents/CirclePieces";
import DownloadQR from "./DownloadQR";
import CustomPieces from './barcodeComponents/CustomPieces';

//import GluedRoundedPieces from './examples/GluedRoundedPieces';
import LiquidPieces from './barcodeComponents/LiquidPieces';
//import CutCornersPieces from './examples/CutCornersPieces';
import RainStyle from './barcodeComponents/RainStyle';
//import LinearGradient from './LinearGradient';
import CustomEyes from './barcodeComponents/CustomEyes';

import CustomPiecesAndEyes from './barcodeComponents/CustomPiecesAndEyes';
//NfcManager.start();
import styles from "./CustomStyles";
const App = () => {


  const [url, setUrl] = useState('');

  const [loader, setLoader] = useState(false);
  const [loader1, setLoader1] = useState(false);
  let logoFromFile = require('./barcodeComponents/logo.png');
  const handleScan = async () => {
    setLoader(true);
    if (url !== '') {
      console.log('url');
      await BarCodeScanner.scanFromURLAsync(url)
        .then(val => {

          if (val && val.length > 0) {
            setLoader(false);
            Alert.alert('Decoded text: ', val[0].data);
          }
        })
        .catch(err => {
          console.log('err', err);

          setLoader(false);
        });
    }
  };
  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        await BarCodeScanner.scanFromURLAsync(imageUri)
          .then(val => {
            console.log("value", val);
            if (val && val.length > 0) {
              setLoader(false);
              console.log("value", val);
              setLoader1(val[0].data)
              Alert.alert('Decoded text: ', val[0].data);
            }
          })
          .catch(err => {
            console.log('err', err);
            setLoader(false);
          });
      }
    });
  };


  return (

    <ScrollView
      contentContainerStyle={{ alignItems: 'center' }}
      style={{
        // backgroundColor: '#ffff',

      }}>

      <View style={{ paddingTop: 30, width: '90%' }}>
        <TextInput
          style={styles.input}
          placeholder="Enter URL to Scan"
          onChangeText={e => setUrl(e)}
        />
      </View>

      <View style={styles.root}>

        <Text style={styles.Heading}>BarCode Designs</Text>

        <View style={styles.buttonContainer}>

          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              alignItems: 'center',
              height: 45,
              justifyContent: 'center',
              borderRadius: 22,
              width: '48%'
            }}
            onPress={handleScan}
          >
            {loader ? (
              <ActivityIndicator />
            ) : (
              <Text style={{ color: 'white' }}>Scan</Text>
            )}
          </TouchableOpacity>


          <TouchableOpacity
            style={{
              backgroundColor: 'grey',
              alignItems: 'center',
              height: 45,
              justifyContent: 'center',
              borderRadius: 22,
              width: '48%'
            }}
            onPress={openImagePicker}>
            <Text style={{ color: 'white' }}>Upload from gallery</Text>
          </TouchableOpacity>


        </View>
        <View style={styles.textValue}>
          <Text numberOfLines={2} style={{ marginVertical: 30 }} >QR Code Value: {loader1}</Text>
          <Text > Text Length:{loader1.length}</Text>
        </View>
        <QRCode
          color='#6897bb'

          enableLinearGradient
 
          value="Just some string value"
          logo={logoFromFile}
          logoSize={20}
      
        />
        <QRCodeStyled
          data={'QR code with logo'}
          style={styles.svg}
          padding={20}
          pieceSize={8}
          color={'#000'}
          errorCorrectionLevel={'H'}
          innerEyesOptions={{
            borderRadius: 12,
            color: '#000',
          }}
          outerEyesOptions={{
            borderRadius: 12,
            color: '#ffa114',
          }}
     
        />
        <View style={styles.logoContainer}>
          <Image

            source={require('./barcodeComponents/logo.png')}
            style={[styles.logo, {}]} />
        </View>



        <CirclePieces />
        <DownloadQR />
        <CustomEyes />
        <CustomPieces />
        <CustomPiecesAndEyes />
        <LiquidPieces />
        <QRCodeStyled
          data={'QR with background'}
          style={styles.svg}
          padding={24}
          pieceSize={8}
          backgroundImage={{
            href: require('./barcodeComponents/logo.png'),
            // ... any other svg Image props (x, y, preserveAspectRatio, opacity, ...etc)
          }}
        />


      </View>
    </ScrollView>
  );
}



export default App;

