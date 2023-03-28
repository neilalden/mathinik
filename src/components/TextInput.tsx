import React from "react"
import { View, Text, TextInput, ViewStyle, TextStyle, StyleSheet } from "react-native"
import { ArgFunction } from "../common/types";
import { COLORS } from "../common/utils/colors";

type PropType = {
    value: string;
    onChange: ArgFunction;
    label: string;
    error?: string;
    placeholder?: string;
    containerStyle?: ViewStyle;
    labelStyle?: TextStyle;
    textInputStyle?: TextStyle;
    keyboardType?: "default" | "numeric" | "phone-pad" | "email-address" | "url"
}
const Index = (props: PropType) => {
    const { label, value, onChange, error, placeholder, containerStyle, labelStyle, textInputStyle, keyboardType } = props
    return (
        <View style={containerStyle}>
            <View
                style={styles.container}>
                <View
                    style={styles.labelContainer}>
                    <Text style={[styles.label, labelStyle]}>{label}</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput style={[styles.textInput, textInputStyle]}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={onChange}
                        keyboardType={keyboardType} />
                </View>
            </View>
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.GREENNORMAL,
        borderRadius: 16,
    },
    labelContainer: {
        position: 'absolute',
        marginLeft: 10,
        marginTop: 2,
    },
    label: { fontWeight: 'bold', color: COLORS.BLACK },
    textInputContainer: { marginLeft: 6, paddingTop: 12 },
    textInput: { fontSize: 16 },
    error: {
        color: COLORS.RED,
        marginLeft: 10,
    }
})

export { Index as default }