import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import FormInput from './FormInput'
import { Formik, useFormikContext, useField } from 'formik';

const RegistrationForm = () => {
    const { handleChange, submitForm, values} = useFormikContext()
    return (
        <>
            <FormInput 
                fieldName="username"
                fieldPh="Full name"
                fieldSecureTextEntry={false}
            />
            <FormInput 
                fieldName="email"
                fieldPh="Your Email"
                fieldSecureTextEntry={false}
            />
            <FormInput 
                fieldName="password"
                fieldPh="Password"
                fieldSecureTextEntry={true}
            />
            <TouchableOpacity style={styles.submitButton} onPress={submitForm}><Text style={styles.submitText}>Create Account</Text></TouchableOpacity> 
        </>
    )
}

export default RegistrationForm

const styles = StyleSheet.create({
    submitButton: {
        borderRadius: 20,
        backgroundColor: '#3004be',
        margin: 20,
        height: 50,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
    }
})
