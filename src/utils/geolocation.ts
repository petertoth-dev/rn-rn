import useStore from '../state/store.ts';
import { check, request } from 'react-native-permissions';
import { Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { GEOLOCATION_WATCH_INTERVAL, PERMISSIONS, RN_GEOLOCATION_WATCHERS } from '../constants.ts';
import { log } from './logger.ts';

/**
 * Hook to manage geolocation tracking (start/stop watching).
 *
 * ❗ NOTE: This hook does NOT handle permissions internally.
 * The caller must ensure permissions are granted BEFORE calling `watchLocation.start()`.
 * This keeps the permission logic customizable for different apps or APIs.
 *
 * If you find this hook a bit strange, don't be surprised. The `@react-native-community/geolocation` library has many bugs/flaws,
 * this is the only production-tested stable usage on both platforms so far.
 */
const useWatchLocation = () => {
  const setDeviceLocation = useStore(state => state.app.setDeviceLocation);

  /**
   * Permissions (grouped by type, UI-agnostic)
   */
  const permissions = {
    foreground: {
      check: () => check(PERMISSIONS.LOCATION_WHEN_IN_USE.permission),
      request: () => request(PERMISSIONS.LOCATION_WHEN_IN_USE.permission),
    },
    background: {
      check: () => check(PERMISSIONS.LOCATION_ALWAYS.permission),
      request: () => request(PERMISSIONS.LOCATION_ALWAYS.permission),
    },
  };

  /**
   * Start watching location
   */
  const start = () => {
    if (RN_GEOLOCATION_WATCHERS.length > 0) return;

    // Quick initial fix on Android
    if (Platform.OS === 'android') {
      Geolocation.getCurrentPosition(
        pos => setDeviceLocation(pos),
        err => log.error('Initial position error:', err),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }

    const watcherId = Geolocation.watchPosition(
      pos => setDeviceLocation(pos),
      err => log.error('Watch Position Error:', err),
      {
        interval: GEOLOCATION_WATCH_INTERVAL,
        timeout: 10000,
        maximumAge: 10 * 60 * 1000,
        enableHighAccuracy: true,
        distanceFilter: 5,
        useSignificantChanges: true,
      }
    );

    RN_GEOLOCATION_WATCHERS.push(watcherId);
  };

  /**
   * Stop watching location
   */
  const stop = () => {
    RN_GEOLOCATION_WATCHERS.forEach(id => Geolocation.clearWatch(id));
    RN_GEOLOCATION_WATCHERS.length = 0;
  };

  return { watch: { start, stop }, permissions };
};

export default useWatchLocation;
