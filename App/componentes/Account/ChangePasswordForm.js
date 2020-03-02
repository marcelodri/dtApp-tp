import React, {useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as firebase from 'firebase';
import {reauthenticate} from '../../Utils/Api';
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


export default function ChangePasswordForm (props) {
    const {setIsVisibleModal, toastRef}= props;
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
    const [error, setError] = useState ({}); //4 erroes
    const [isLoading, setIsLoading] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [hideNewPassword, setHideNewPassword]= useState(true);
    const [hidNewPasswordRepeat, setHideNewPasswordRepeat] = useState(true);


    const updatePassword = () => {
        setError({});

        if (!password || !newPassword || !newPasswordRepeat) {
            let objerror = {};
            !password && (objerror.password = "No Puede Estar Vacio");
            !newPassword && (objerror.newPassword = "No Puede Estar Vacio");
            !newPasswordRepeat && (objerror.newPasswordRepeat = "No Puede Estar Vacio");
            setError(objerror);
    } else {   
        if (newPassword !== newPasswordRepeat) {
            setError({
                newPassword: "Las nuevas contraseñas tienen que ser iguales.",
                newPasswordRepeat: "Las nuevas contraseñas tienen que ser iguales."
            });
        } else {
            setIsLoading(true);
            reauthenticate(password)
            .then (() => {
                firebase
                .auth()
                .currentUser.updatePassword(newPassword)
                .then(() => {
                    setIsLoading(false);
                    toastRef.currentUser.show("Contraseña actualizada correctamente");
                    setIsVisibleModal(false);
                    firebase.auth().signOut();
                })
                .catch(() => {
                    setError ({general: "Error al actualizar la contraseña"});
                    setIsLoading(false);
                });
            })
            .catch (() => {
                setError({ password: "La Contraseña no es correcta"});
                setIsLoading(false);
            });
        }
    
    
    
    }
    };
    
    return (
       <ScrollView>
       <View style={styles.view}>
            <Input
                placeholder="Contraseña actual"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={hidePassword} 
                onChange={e => setPassword(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: hidePassword ? "eye-outline" : "eye-off-outline",
                    color: "#c2c2c2",
                    onPress: () => setHidePassword(!hidePassword)
                }}
            errorMessage={error.password}
            />
            <Input
                placeholder="Nueva Constraseña"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={hideNewPassword}
                onChange={e => setNewPassword(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: hideNewPassword ? "eye-outline" : "eye-off-outline",
                    color: "#c2c2c2",
                    onPress: () => setHideNewPassword(!hideNewPassword)
                }}
            errorMessage={error.newPassword}
            />
            <Input
                placeholder="Nueva Constraseña"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={hidNewPasswordRepeat}
                onChange={e => setNewPasswordRepeat(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: hidNewPasswordRepeat ? "eye-outline" : "eye-off-outline",
                    color: "#c2c2c2",
                    onPress: () => setHideNewPasswordRepeat(!hidNewPasswordRepeat)
                }}
            errorMessage={error.newPasswordRepeat}
            />
        <Button
            title="Cambiar Contraseña"
            containerStyle={styles.btncontainer}
            buttonStyle={styles.btn}
            onPress={updatePassword}
            loading={isLoading}
        />
        </View>
        </ScrollView>
    );



}

const styles = StyleSheet.create ({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        marginBottom: 10
    },
    btncontainer: {
        marginTop: 20,
        width: "95%"
    }, 
    btn: {
        backgroundColor: "#00a680"
    }
});