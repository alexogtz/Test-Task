import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { Formik, useFormikContext, useField } from 'formik';

const FormInput = ({fieldName, fieldPh, fieldSecureTextEntry, ...props}) => {
    const [field, meta] = useField(fieldName)
    return (
      <>
        <TextInput style={styles.inputStl}
        placeholder={fieldPh}
        secureTextEntry={fieldSecureTextEntry}
        onChangeText={field.onChange(fieldName)}
        onBlur={field.onBlur(fieldName)}
        value={field.values}
        {...props}
        />
        {meta.error && meta.touched && (
          <Text style={{color: 'red'}}>{meta.error}</Text>
        )}
      </>
    )
  }

export default FormInput

const styles = StyleSheet.create({
    inputStl: {
        borderRadius: 30,
        backgroundColor: '#eee',
        height: 60,
        width: '90%',
        margin: 10,
        paddingLeft: 30
    }
})
