import { ColorSchemes, ColorSchemeSettings } from '@app-types/theme.types.ts';
import { AppPermissions } from '@app-types/general.types.ts';
import { Platform } from 'react-native';
import {Permission, PERMISSIONS as PERMS} from "react-native-permissions";

export const LOG_API_REQUESTS: boolean = true;
export const LOG_API_RESPONSES: boolean = true;
export const LOG_API_ERRORS: boolean = true;
export const DEFAULT_COLOR_SCHEME: ColorSchemes = 'light';
export const COLOR_SCHEME: ColorSchemeSettings = 'system'; // Override system's setting
export const DEFAULT_THEME: string = 'default';
export const DEFAULT_FONT = 'Ubuntu';

/**
 * Geolocation
 */
export const GEOLOCATION_WATCH_INTERVAL: number = 5000;
export const RN_GEOLOCATION_WATCHERS: any[] = [];

export const PERMISSIONS: {[key in AppPermissions]: {image: any; title: string, description: string, buttonText: string, permission: Permission}} = {
  LOCATION_WHEN_IN_USE: {
    image: require('@src/assets/globe.png'),
    title: 'Enhance your travel experience',
    description: 'Automatically mark new countries and attraction nearby on your personal map as you travel by turning location settings on',
    buttonText: 'Allow Location',
    permission: Platform.OS === 'android' ? PERMS.ANDROID.ACCESS_FINE_LOCATION : PERMS.IOS.LOCATION_WHEN_IN_USE,
  },
  LOCATION_ALWAYS: {
    image: require('@src/assets/globe.png'),
    title: 'Enhance your travel experience',
    description: 'Automatically mark new countries and attraction nearby on your personal map as you travel by turning location settings on',
    buttonText: 'Allow Location',
    permission: Platform.OS === 'android' ? PERMS.ANDROID.ACCESS_BACKGROUND_LOCATION : PERMS.IOS.LOCATION_ALWAYS,
  },
};
