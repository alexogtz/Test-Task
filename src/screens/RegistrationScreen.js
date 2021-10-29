import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Formik, useFormikContext, useField } from 'formik';
import RegistrationForm from '../components/RegistrationForm'
import * as Yup from 'yup'
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { StatusBar } from 'expo-status-bar';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBY_WfQfN96y7i39xDPHW347mHterO9i7c",
    authDomain: "test-task-90d44.firebaseapp.com",
    projectId: "test-task-90d44",
    storageBucket: "test-task-90d44.appspot.com",
    messagingSenderId: "286375428560",
    appId: "1:286375428560:web:947a3a010911856992f9d5",
    measurementId: "G-3QTXHE56LD"
  };

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

const RegistrationScreen = ({ navigation }) => {
    const createUser = (credentials) => {
        const {email, password} = credentials
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in
        console.log(userCredential)
        const { user } = userCredential;
        const { username, email } = credentials;
        storageUser(credentials)
        navigation.navigate('Home', {user: user})
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn(errorCode,errorMessage)
        });
    }
    const storageUser = async (user) => {
        const { username, email } = user;
        try {
            const docRef = await addDoc(collection(db, "users"), {
                username:username,
                uid: email
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          db.collection("users").add({
            username:username,
            uid: email
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    }
    return (
       <ScrollView>
            <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    <Image 
                    source={require('../../assets/favicon.png')}
                    />
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStl}>Create account</Text>
                    <Text style={styles.subtitleStl}>Add your details to register</Text>
                </View>
                <View style={styles.formContainer}>
                    <Formik
                        onSubmit= {user => createUser(user)}
                        validationSchema= {Yup.object({
                        username: Yup.string().min(4).required('username is required'),
                        email: Yup.string().email('Invalid Email').required('Email is required'),
                        password: Yup.string().min(6).required('Password is required'),
                        })}
                        initialValues={{ email: '', password: ''}}
                    >
                        <RegistrationForm />
                    </Formik>
                </View>
                <View style={styles.footerContainer}>
                    <Text style={styles.subtitleStl}>Already have an account? </Text>
                    <Text style={styles.signInSub}>Sign In</Text>
                </View>
                <StatusBar style="light" />
            </View>
       </ScrollView>
    )
}

export default RegistrationScreen

const styles = StyleSheet.create({
    footerContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 10,
      marginBottom: 20,
    },
    titleContainer: {
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    formContainer: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    topContainer: {
        height: 190,
        width: '100%',
        backgroundColor: '#3004be',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleStl: {
        fontSize: 37,
        fontWeight: 'bold'
    },
    subtitleStl: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold',
        opacity: 0.4
    },
    mainContainer: {
        backgroundColor: 'white'
    },
    signInSub: {
        marginTop: 10,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#3004be'
    },
    statusColor: {
        color: '#fff'
    }
  });
