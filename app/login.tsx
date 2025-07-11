import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function login() {
    const router = useRouter()
    const languages = {
        'uz': { phoneNumber: 'Telefon nomer:', appLanguage: 'Ilova tili', login: 'Tizimga kirish' }, 'ru': {
            phoneNumber: 'Номер телефона:',
            appLanguage: 'Язык приложения',
            login: 'Войти в систему'
        }
    }
    const [phone, setPhone] = useState('+998');
    const [language, setLanguage] = useState<'uz' | 'ru'>('uz');

    const handlePhoneChange = (text: string) => {
        let newValue = text.replace(/\D/g, '');
        if (!newValue.startsWith('998')) {
            newValue = '998';
        }
        if (newValue.length > 12) {
            newValue = newValue.slice(0, 12);
        }
        setPhone('+' + newValue);
    };
    const [count, setCount] = useState(0)

    const handleLogin = () => {
        console.log('Phone:', phone);
        if (phone.length == 13) {
            if (phone.startsWith('+998'))
                router.push({ pathname: '/enterCode', params: { phone: phone } })
        } else if (count >= 1) {
            setPhone('')
        } else {
            setCount(count)
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{language === 'uz' ? languages.uz.phoneNumber : languages.ru.phoneNumber}</Text>
            <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={handlePhoneChange}
                maxLength={13}
            />
            {!phone && <Text>Iltimos telefon nomerni kiriting</Text>}
            <Text style={styles.label}>{language === 'uz' ? languages.uz.appLanguage : languages.ru.appLanguage}</Text>
            <View style={styles.languageContainer}>
                <TouchableOpacity
                    style={[
                        styles.langButton,
                        language === 'uz' && styles.selectedLangButton,
                    ]}
                    onPress={() => setLanguage('uz')}
                >
                    <Image
                        source={{
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Flag_of_Uzbekistan.svg/1200px-Flag_of_Uzbekistan.svg.png',
                        }}
                        style={styles.flag}
                    />
                    <Text>Uz</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.langButton,
                        language === 'ru' && styles.selectedLangButton,
                    ]}
                    onPress={() => setLanguage('ru')}
                >
                    <Image
                        source={{
                            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/800px-Flag_of_Russia.svg.png?20120812011549',
                        }}
                        style={styles.flag}
                    />
                    <Text>Ru</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>{language === 'uz' ? languages.uz.login : languages.ru.login}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 110,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
    },
    languageContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 12,
        gap: 16,
    },
    langButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        width: 80,
    },
    selectedLangButton: {
        borderColor: '#007AFF',
        backgroundColor: '#E6F0FF',
    },
    flag: {
        width: 32,
        height: 20,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    loginButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 10,
        marginTop: 40,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
