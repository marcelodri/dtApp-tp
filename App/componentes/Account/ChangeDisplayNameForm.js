import React, {useState} from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import * as firebase from 'firebase';


export default function changeDisplayNameForm (props) {
    const [newDisplayName, setNewDisplayName]=useState(null);
    const [error, setError]=useState(null);
    const [isLoading, setIsLoading]=useState(false);
    const {displayName, setIsVisiblemodal, setReloadData, toastRef} = props;

    const updateDisplayName= () => {
        setError(null);
        if(!newDisplayName){
            setError("El Nickname de Usuario no ha Cambiado");
        } else {
            setIsLoading(true);
            const update = {
                displayName: newDisplayName
            };
            firebase
            .auth()
            .currentUser.updateProfile(update)
            .then(() => {
                setIsLoading(false); 
                setReloadData(true);
                toastRef.current.show("El Nickname se ha actualizado correctamente");
                setIsVisiblemodal(false);
            })
            .catch (() => {
                setError("Error al actualizar el Nickname");
                setIsLoading(false);
            });
        }
    };



    return (
        <ScrollView>
        <View style={styles.view}>
            <Input 
                placeholder="Nickname"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                defaultValue={displayName && displayName}
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                errorMessage={error}
            />
            <Button
                title="Cambiar Nickname"
                containerStyle={styles.btncontainer}
                buttonStyle={styles.btn}
                onPress={updateDisplayName}
                loading={isLoading}
            />
        </View>
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        marginBottom: 10
    },
    btncontainer: {
        marginTop: 20,
    },
    btn: {
        backgroundColor: "#00a680"
    }
})