import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = () => {
        if (email === 'user@example.com' && password === 'password') {
            navigation.navigate('Home');
        } else {
            Alert.alert('Error', 'Correo electrónico o contraseña incorrectos');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Shop Cut✂</Text>
            <Image
                source={require('../assets/CeutecLogo.png')}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Correo Electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
                <Button color="#14746f" title="Iniciar Sesión" onPress={handleLogin} />
            </View>
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
        width: 250,
        height: 250,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginTop: 20,
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        flex: 1,
        padding: 50,
        backgroundColor: '#192a57',
        borderTopLeftRadius: 50,
        overflow: 'hidden',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
});

export default Login;
