/* eslint-disable react/prop-types */
import React, {useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {colors} from '../../utils'

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 3000)
  }, [navigation])
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Weather App</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginTop: 20,
  },
})
