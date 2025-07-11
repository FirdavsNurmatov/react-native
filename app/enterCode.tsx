import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function enterCode() {
  const router = useRouter();
  const { phone } = useLocalSearchParams();
  const [code, setCode] = useState('');
  const [wrong, setWrong] = useState(false);
  const [time, setTime] = useState(20)
  const [help, setHelp] = useState('')

  useEffect(() => {
    if (time === 0) {
      setHelp("I didn't receive a code ");
      return;
    }

    const interval = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const ResetTime = () => {
    setTime(20)
    setHelp('')
  }

  const handleVerify = () => {
    if (code === '123456') {
      router.push('/verified');
    } else {
      setWrong(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.getBtn} onPress={() => router.back()}><Text>{'<'}</Text></TouchableOpacity>
      <Text style={styles.label}>Enter code</Text>
      <Text>We've sent an SMS with an activation {'\n'} code to your phone {phone.slice(0, 4) + ' ' + phone.slice(4, 6) + ' ' + phone.slice(6, 9) + ' ' + phone.slice(9, 11) + ' ' + phone.slice(11, 13)}</Text>

      <TextInput
        style={[styles.codeInput, wrong && styles.codeInputWrong]}
        maxLength={6}
        keyboardType="numeric"
        onChangeText={setCode}
        value={code}
      />
      {wrong && <Text style={styles.errorText}>Wrong code, please try again</Text>}
      {help ?
        <View style={styles.resendText}>
          <Text>{help}</Text>
          <TouchableOpacity onPress={ResetTime}><Text style={styles.resendCode}>Resend</Text></TouchableOpacity>
        </View>
        : <Text style={styles.timerText}>Send code again {`00:${time > 9 ? time : '0' + time}`}</Text>}

      <TouchableOpacity style={styles.verifyBtn} onPress={handleVerify}>
        <Text style={styles.verifyText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 120, paddingHorizontal: 10 },
  label: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  codeInput: { borderWidth: 1, padding: 10, fontSize: 20, textAlign: 'center', letterSpacing: 10, marginVertical: 10 },
  codeInputWrong: { borderColor: 'red', color: 'red' },
  errorText: { color: 'red',textAlign:'center'},
  getText: { fontSize: 20 },
  getBtn: { padding: 15, position: 'absolute', top: -100, alignItems: 'center', borderStyle: 'solid', borderRadius: 10 },
  resendCode: { fontWeight: 'bold' },
  resendText: { marginTop: 70, marginBottom: 20, flexDirection: "row", justifyContent: "center" },
  timerText: { marginTop: 70, marginBottom: 20, textAlign: 'center' },
  verifyBtn: { backgroundColor: 'green', padding: 15, borderRadius: 10, alignItems: 'center' },
  verifyText: { color: '#fff', fontWeight: 'bold' },
});
