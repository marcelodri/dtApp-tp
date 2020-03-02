import React, {useRef, useEffect, useState} from 'react';
import ActionButton from 'react-native-action-button';
import {StyleSheet, View, ScrollView, Button, Text, Image, requireNativeComponent} from 'react-native';
import {Divider} from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import { NavigationEvents } from 'react-navigation';
import * as firebase from 'firebase';



export default function Jugadores (props) {
    const {navigation} = props;
    const [user, setUser]=useState(null)

    useEffect(() => {
        firebase.auth () .onAuthStateChanged(userInfo => {
            setUser(userInfo);
        });



    }, [])



    return (
        <View style={styles.view}
        >
            <Text> Estamos en Jugadores </Text>
            { user && <AddJugadores navigation={navigation} />}
        </View>
        );
}



function AddJugadores (props) {
    const {navigation} = props;

    return (
        <ActionButton 
            onPress= {() => navigation.navigate("Agregar")}/>


    );
}





const styles = StyleSheet.create({
    view: {
        flex: 1
    }



});


