import { FlatList, Text, View } from 'react-native';
import SearchBar from '@/components/search-bar';
import React, { useEffect, useState } from 'react';
import LargeButton from '@/components/large-button';
import ProductCard from '@/components/product-card';
import KeyboardAccessory from '@/components/keyboard-accessory';
import Caption from '@/components/caption';
import { router } from 'expo-router';
import { BarCodeScanner } from 'expo-barcode-scanner';
import PostNotification from '@/components/post-notification';

export default function Search() {
  const inputAccessoryViewID = 'keyboard-accessory';
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    router.push(`/product/${data}`);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <View className='flex-1 px-4 pt-4 dark:bg-black'>
        <PostNotification />
        <Caption text='Search' />
        <SearchBar inputAccessoryViewID={inputAccessoryViewID} />
        <Text className='self-center py-2 text-xl font-bold text-black dark:text-white'>
          or
        </Text>
        <LargeButton
          text='Scan barcode'
          onPress={() => {
            router.push('/scan-code');
          }}
          iconName='barcode-outline'
        />
        {/*<Caption text='History' className='pt-6' />*/}
        {/*<BarCodeScanner*/}
        {/*  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}*/}
        {/*  style={StyleSheet.absoluteFillObject}*/}
        {/*/>*/}
        {/*{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}*/}
      </View>
      <KeyboardAccessory inputAccessoryViewID={inputAccessoryViewID} />
    </>
  );
}
