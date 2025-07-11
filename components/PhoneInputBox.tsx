import React from 'react';
import { StyleSheet } from 'react-native';
import PhoneInput from 'react-native-phone-number-input'

interface Props {
    value: string;
    onChange: (val: string) => void;
    phoneRef: React.Ref<any>;
}

export const PhoneInputBox: React.FC<Props> = ({ value, onChange, phoneRef }) => {
    return (
        <PhoneInput
            ref={phoneRef}
            defaultValue={value}
            defaultCode="UZ"
            layout="first"
            onChangeFormattedText={onChange}
            containerStyle={styles.phoneInput}
        />
    );
};

const styles = StyleSheet.create({
    phoneInput: { marginBottom: 20 },
});
