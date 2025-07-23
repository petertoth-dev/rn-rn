import React, {memo, useEffect, useRef} from 'react';
import {Text, StyleSheet, Animated} from 'react-native';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import useStore from '@state/store.ts';

const Connectivity = () => {
    const isOnline = useStore((state) => state.app.connectivity.isOnline);
    const set = useStore((state) => state.app.set);

    useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener((connectivityState: NetInfoState) => {
            set(state=>{
                state.app.connectivity = {
                    isConnected: connectivityState.isConnected,
                    isOnline: connectivityState.isInternetReachable,
                }
            });
        });

        return () => {
            unsubscribe();
        };
    }, []);



    return (
        <Text>
            {isOnline ? 'Online' : 'Offline'} {/* Ensure only string values are rendered */}
        </Text>
    );
};

//const themeColors = getThemeColors()

const styles = StyleSheet.create({

});

export default memo(Connectivity);
