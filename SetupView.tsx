/*
 * Copyright (c) 2020-2022 Mateusz Falkowski (appidea.pl) and contributors. All rights reserved.
 * This file is part of "react-native-hce" library: https://github.com/appidea/react-native-hce
 * Licensed under the MIT license. See LICENSE file in the project root for details.
 */

import React, { useState } from 'react';
import { Image, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NFCTagType4NDEFContentType, NFCTagType4 } from 'react-native-hce';
import FormRow from './Controls/FormRow';
import type { DataLayer } from './DataLayerTypes';
import DropDownPicker from 'react-native-dropdown-picker';
//const logo = require('../../logo.png');

const HCEPickerItem: any = Picker.Item;
const HCEPicker: any = Picker;

const App = ({ nfcTagProps, updateProp }: DataLayer) => (
  <View style={styles.container}>
    <View style={styles.header}>
      {/* <Image source={logo} style={styles.headerLogo} resizeMode="cover" /> */}
      <Text style={styles.headerText}>
        Welcome
      </Text>
      <Text style={styles.headerText}>
        Lets Communicate: Android IOS
      </Text>
    </View>

    <FormRow label="Select content type">
      <HCEPicker
        itemStyle={{ fontSize: 17 }}
        mode={'dialog'}
        dropdownIconRippleColor={'red'}
        dropdownIconColor={'red'}
        themeVariant={'light'}
        selectedValue={nfcTagProps.type}
        style={styles.typePicker}

        onValueChange={(itemValue: string) => updateProp('type', itemValue)}
      >
        <HCEPickerItem

          label="Text"
          key={1}

          color='blach'
          value={NFCTagType4.stringFromContentType(
            NFCTagType4NDEFContentType.Text
          )}
        />
        <HCEPickerItem
          label="URL"
          key={2}
          color='black'
          value={NFCTagType4.stringFromContentType(
            NFCTagType4NDEFContentType.URL
          )}
        />
      </HCEPicker>


    </FormRow>

    <FormRow label="Set content">
      <TextInput
        onChangeText={(text: string) => updateProp('content', text)}
        autoCapitalize="none"
        spellCheck={false}
        value={nfcTagProps.content}
        style={styles.fieldContent}
        placeholderTextColor={'grey'}
        placeholder="Put the content here."
      />
    </FormRow>

    <FormRow label="Is tag writable?">
      <Switch
        trackColor={{ false: '#E2B928', true: '#E2B928' }}
        thumbColor={nfcTagProps.writable ? 'red' : 'red'}

        onChange={() => updateProp('writable', !nfcTagProps.writable)}
        value={nfcTagProps.writable}
        style={styles.fieldWritable}
      />
    </FormRow>
  </View>)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //  justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  headerLogo: {
    //height: 160,
    //  aspectRatio: 1.516,
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 15,
    fontSize: 18
  },
  fieldWritable: {
    width: 50,
    marginVertical: 10,
    marginHorizontal: 4,
    color: 'grey'
  },
  fieldContent: {
    paddingHorizontal: 16,
    color: 'grey',
    fontSize: 15
  },
  typePicker: {
    height: 50,
    color: 'grey',
    fontWeight: '400',
    backgroundColor: '#ffff'
  },
});

export default App;
