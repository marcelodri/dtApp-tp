import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';





export default function InfoUser (props) {
    const { 
        userInfo: {uid, displayName, email, photoURL},
        setReloadData,
        toastRef,
        setIsLoading,
        setTextLoading
    } = props;

    const changeAvatar = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;
        
        if(resultPermissionCamera === "denied") {
            toastRef.current.show("Es necesario aceptar los permisos de la galeria");
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if(result.cancelled) {
                toastRef.current.show("Has cancelado la galeria de imagenes");
            } else {
                uploadImage(result.uri, uid).then(() => {
                updatePhotoUrl(uid);
                });
            }
        }
    };

    const uploadImage = async (uri, nameImage) => {
        setTextLoading("Actualizando");
        setIsLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = firebase
            .storage()
            .ref()
            .child("Avatar/"+nameImage);
        return ref.put(blob);
    };
    
    const updatePhotoUrl = uid => {
        firebase
            .storage()
            .ref("Avatar/"+uid)
            .getDownloadURL()
            .then(async result => { 
                const update ={
                    photoURL: result
                }
                await firebase.auth().currentUser.updateProfile(update);
                setReloadData(true);
                setIsLoading(false);
            }).catch(() => {
                toastRef.current.show("Error al recuperar el avatar del servidor.");
            });
    };


    return (
        <View style={styles.viewUserInfo}>
            <Avatar
                rounded
                size="large"
                showEditButton
                onEditPress={changeAvatar}
                containerStyle={styles.userInfoAvatar}
                source={{
                    uri: photoURL ? photoURL : "https://api.adorable.io/avatars/205/abott@adorable.png"
                }}
            />
            <View>
                <Text style={styles.displayName}>
                    {displayName ? displayName : "Anonimo"}
                </Text>
                <Text style={styles.emailstyle}>{email ? email : "Social Login"}</Text>
            </View>
        </View>
    );

} 

const styles=StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#E5E7E9",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar: {
        marginRight: 0

    },
    displayName: {
        fontWeight: "bold",
        marginLeft: 10
    },
    emailstyle: {
        marginLeft: 10
    }

})