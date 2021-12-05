import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, Platform, Button, ScrollView, RefreshControl } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Panel } from '../../components';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

const Home = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState({})
  const [state, setState] = useState({
    date: '',
    weather: {},
  })

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getLocation()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getLocation()
  }, [])

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});

    const place = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    const geoCode = `https://api.openweathermap.org/data/2.5/weather?lat=${loc.coords.latitude}&lon=${loc.coords.longitude}&units=metric&appid=151e815178fbd3a59ed62c1af36541ac`
    fetch(geoCode)
      .then((response) => response.json())
      .then((json) => {
        const weather = json
        console.log('WEATHER DATA.........', weather)
        const date = new Date(loc.timestamp)
        const oldDate = String(date).split(' ')
        const newDate = `${oldDate[0]}, ${oldDate[2]} ${oldDate[1]}`
        AsyncStorage.setItem('location', JSON.stringify(place[0]))
        setLocation(loc);
        setAddress(place[0]);
        setErrorMsg(null);
        setState({
          ...state,
          date: newDate,
          weather})
      })
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={(
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
      )}
      >
        <Text>{address?.city}, {address?.country}</Text>
        <Text>{state.date}</Text>
        {/* WEATHER INFO */}
        <View>
          <Text>{state?.weather?.main?.temp} C</Text>
        </View>
        <Text style={styles.paragraph}>{text}</Text>
      </ScrollView>
      <Panel />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
