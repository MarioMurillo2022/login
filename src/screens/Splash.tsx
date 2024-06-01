// SplashScreenComponent.js
import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

const Splash = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/CeutecLogo.png')} style={styles.image} />
            <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    image: {
        width: 600,
        height: 163,
    },
    spinner: {
        marginTop: 20,
    },
});

export default Splash;
