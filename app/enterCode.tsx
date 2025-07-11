import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function enterCode() {
  const navigation = useNavigation();
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const [code, setCode] = useState('');
  const [wrong, setWrong] = useState(false);

  const handleVerify = () => {
    if (code === '123456') {
      router.push('/verified');
    } else {
      setWrong(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter code</Text>
      <Text>We've sent an SMS with an activation code to your phone {phone}</Text>

      <TextInput
        style={[styles.codeInput, wrong && styles.codeInputWrong]}
        maxLength={6}
        keyboardType="numeric"
        onChangeText={setCode}
        value={code}
      />
      {wrong && <Text style={styles.errorText}>Wrong code, please try again</Text>}
      <Text style={styles.timerText}>Send code again 00:20</Text>

      <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  codeInput: { borderWidth: 1, padding: 10, fontSize: 20, textAlign: 'center', letterSpacing: 10, marginVertical: 10 },
  codeInputWrong: { borderColor: 'red', color: 'red' },
  errorText: { color: 'red', marginBottom: 10 },
  timerText: { marginBottom: 20, textAlign: 'center' },
  verifyBtn: { backgroundColor: 'green', padding: 15, borderRadius: 10, alignItems: 'center' },
  verifyText: { color: '#fff', fontWeight: 'bold' },
});
