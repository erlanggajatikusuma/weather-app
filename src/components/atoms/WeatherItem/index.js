import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { colors } from '../../../utils'

const WeatherItem = ({img}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: colors.white}}>18.00</Text>
      <Text>14 C</Text>
    </View>
  )
}

export default WeatherItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(14, 41, 39, 0.7)',
    padding: 15,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 40,
    height: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
})
