import useStore from '../state/store.ts';
import { check, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { GEOLOCATION_WATCH_INTERVAL, PERMISSIONS, RN_GEOLOCATION_WATCHERS } from '../constants.ts';
import { log } from './logger.ts';

const useWatchLocation = () => {
  const setDeviceLocation = useStore(state => state.app.setDeviceLocation);
  const startWatchLocation = () => {
    if (RN_GEOLOCATION_WATCHERS && RN_GEOLOCATION_WATCHERS.length > 0) return;
    check(PERMISSIONS.LOCATION_WHEN_IN_USE.permission).then(status => {
      if (status === RESULTS.GRANTED) {
        // Fix for long initial wait on Android
        if (Platform.OS === 'android') {
          Geolocation.getCurrentPosition(position => {
            setDeviceLocation(position);
          });
        }
        // Start watching location
        const watcherId = Geolocation.watchPosition(
          position => {
            log.debug(
              `Position update {lng: ${position.coords.longitude}, lat:${position.coords.latitude}}`,
            );
            setDeviceLocation(position);
          },
          error => {
            log.error('Watch Position Error:', error);
          },
          {
            // interval (ms) -- (Android only) The rate in milliseconds at which your app prefers to receive location
            interval: GEOLOCATION_WATCH_INTERVAL, // Default 5000
            // timeout (ms)
            timeout: 10,
            // maximumAge (ms) - Is a positive value indicating the maximum age in milliseconds
            maximumAge: 10 * 60 * 1000,
            // enableHighAccuracy (bool) - Is a boolean representing if to use GPS or not. If set to true, a GPS position will be requested. If set to false, a WIFI location will be requested.
            enableHighAccuracy: true,
            // distanceFilter (m) - The minimum distance from the previous location to exceed
            distanceFilter: 1, // Default: 5
            // useSignificantChanges (bool) - Uses the battery-efficient native significant changes APIs
            // useSignificantChanges: true, // TODO: Enable this in production
          },
        );

        RN_GEOLOCATION_WATCHERS.push(watcherId);
      } else {
        console.warn('Location permission not granted');
      }
    });
  };

  const stopWatchLocation = () => {
    for (let k in RN_GEOLOCATION_WATCHERS) {
      Geolocation.clearWatch(RN_GEOLOCATION_WATCHERS[k]);
      RN_GEOLOCATION_WATCHERS.splice(+k, 1);
    }
  };
  return {
    watchLocation: { start: startWatchLocation, stop: stopWatchLocation },
  };
};

export default useWatchLocation;
