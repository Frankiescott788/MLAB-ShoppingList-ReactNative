import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotFoundScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>404</Text>
            <Text style={styles.message}>Page Not Found</Text>
            {/* <Button title="Go Home" onPress={() => navigation.navigate('Home')} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    message: {
        fontSize: 18,
        marginBottom: 32,
    },
});

export default NotFoundScreen;