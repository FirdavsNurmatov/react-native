import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function verified() {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Verify your phone number</Text>
            <Text>Your code has been verified!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    label: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
});
