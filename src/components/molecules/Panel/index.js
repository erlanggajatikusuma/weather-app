import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors } from '../../../utils'
import { WeatherItem } from '../../atoms'

const Panel = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text style={{color: colors.white}}>Today</Text>
        <View style={styles.weather}>
          <WeatherItem />
          <WeatherItem />
          <WeatherItem />
          <WeatherItem />
        </View>
      </View>
    </View>
  )
}

export default Panel

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.black2,
    height: '40%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  content: {
    padding: 25,
  },
  weather: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: 10,
    marginHorizontal: -20,
  },
})
