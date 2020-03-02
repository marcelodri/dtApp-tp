import React, {useState} from 'react';
import {SocialIcon} from 'react-native-elements';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import {FacebookApi} from '../../Utils/Social';
import Loading from '../../componentes/Loading';


export default function LoginFacebook (props) {
    const {toastRef, navigation} = props;
    const [isLoading, setIsLoading]=useState(false);


    const login = async () => {
        await Facebook.initializeAsync(FacebookApi.application_id);
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(
            //FacebookApi.application_id,
            { permissions: FacebookApi.permissions}
        );
        if (type==="success") {
            setIsLoading(true);
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            await firebase
                .auth()
                .signInWithCredential(credentials)
                .then(()=> {
                    navigation.navigate("MiCuenta");
                })
                .catch (() => {
                    toastRef.current.show("Error Accediendo con Facebook, inténtelo mas tarde");
                });
        } else if (type==="cancel"){
            toastRef.current.show("Inicio de seccion canceldo");
        } else {
            toastRef.current.show("Error desconocido, inténtelo mas tarde");
        }
        setIsLoading(false);
    };
    
    
    return (
        <>
        <SocialIcon
            title="Inicar sesión con Facebook"
            button
            type="facebook"
            onPress={login}
        />
        <Loading isVisible={isLoading} text="Iniciando sesion"/>
        </>
    );





}