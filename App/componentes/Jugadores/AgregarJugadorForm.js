import React, { useState } from 'react';
import {View, ScrollView, StyleSheet, Alert, Dimensions} from 'react-native';
import {Icon, Avatar, Image, Input, Button} from 'react-native-elements';
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import uuid from "uuid";

import {firebaseApp} from '../../Utils/FireBase';
import * as firebase from 'firebase/app';
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);


const widthScreen = Dimensions.get("window").width

export default function AgregarJugadorForm (props) {
    const {toastRef, setIsLoading, navigation} = props;
    const [imageSelected, setImagenSeleted] = useState([]);
    const [nombre, setNombre]=useState("");
    const [apodo, setApodo]=useState("");
    const [fechan, setFechan]=useState("");
    const [club, setClub]=useState("");
    const [posicion, setPosicion]=useState("");
    const [arco, setArco]=useState("");
    const [defensa, setDefensa]=useState("");
    const [ataque, setAtaque]=useState("");
    const [estado, setEstado]=useState("");
    const [total, setTotal]=useState("");

    


    const send = () => {
        console.log("Nombre=" + nombre);
        console.log("Apodo=" + apodo);
        console.log("Fecha Nac=" + fechan);
        console.log("club=" + club);
        console.log("posicion=" + posicion);
        console.log("arco=" + arco);
        console.log("defensa=" + defensa);
        console.log("ataque=" + ataque);
        console.log("estado=" + estado);
        console.log("total=" + total);
    };

    const AddJugador = () => {
        if(!nombre || !apodo || !fechan || !club || !posicion || !arco || !defensa || !ataque || !estado || !total  ) {
            toastRef.current.show("Todos los campos son obligatorios");
        } else { 
            //setIsLoading(true);
            uploadImageStorage(imageSelected).then(arrayImage => {
                db.collection("Jugador").add({
                    nombre: nombre, 
                    apodo: apodo, 
                    fechan: fechan, 
                    club: club,
                    posicion: posicion,
                    arco: arco, 
                    defensa: defensa,
                    ataque: ataque,
                    estado: estado, 
                    total: total,
                    imagenes: arrayImage

                }).then(() => {
                    setIsLoading(false);
                    navigation.navigate("Jugadores");
                
                }).catch (() => {
                    toastRef.current.show("Error al crear al jugador, intentelo mas tarde");

                })               
            });
        }
        
    };

    const uploadImageStorage = async imageArray => {
        const imagesBlob = [];
        await Promise.all(
            imageArray.map (async image => {
            const response = await fetch(image);
            const blob = await response.blob();
            const ref = firebase
                 .storage()
                 .ref("ImagenesJugadores/")
                 .child(uuid());
            await ref.put(blob).then(result => {
                    console.log(result);
                });
            })
        );
    };
    

        
    






    return (
    <ScrollView>
        <ImageJugador imageJugador={imageSelected[0]}
        />
            <UpLoadImagen 
                imageSelected={imageSelected} 
                setImagenSeleted={setImagenSeleted} 
                toastRef={toastRef}
            />
            
        <FormAdd 
            setNombre={setNombre}
            setApodo={setApodo}
            setFechan={setFechan}
            setClub={setClub}
            setPosicion={setPosicion}
            setArco={setArco}
            setDefensa={setDefensa}
            setAtaque={setAtaque}
            setEstado={setEstado}
            setTotal={setTotal}
        />
        <Button style= {styles.btn} title="Crear Jugador" onPress={AddJugador} />
    </ScrollView>
    );
}

function ImageJugador (props) {
    const { imageJugador} = props; 

    return (
        <View style={styles.foto}>
            {imageJugador ? (
                <Image
                    source= {{uri: imageJugador}}
                    style={{width: widthScreen, height: 200}}
                />
            ) : ( 
                <Image
                    source={ require ("../../../assets/noimagen.png")}
                    style={{width: widthScreen, height: 200}}
                />
                )}
        </View>
    );
}

function UpLoadImagen(props) {
    const {imageSelected, setImagenSeleted, toastRef }=props;

    const imageSelect = async () => {
        const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

        if (resultPermissionCamera === "denied"){
        toastRef.current.show("Es necesario aceptar los permisos de la galeria, si lo has rechazado debes ir al menu para modificarlos manualmente", 3000);
        } else {
            const result = await ImagePicker.launchImageLibraryAsync ({
                allowsEditing: true,
                aspect: [4,3]
        });   
            if (result.cancelled) {
                toastRef.current.show(
                "Has cerrado la galeria", 3000);
            } else {
            setImagenSeleted([...imageSelected, result.uri]);
        }
        }
    };




    const removeImage = image => {
        const arrayImage = imageSelected;

        Alert.alert(
            "Eliminar Imagen", 
            "Estas seguro que quieres eliminar la imagen?",
            [
            {
                text: "Cancel",
                style: "cancel"
            }, 
                {
                text: "Eliminar",
                onPress: () => setImagenSeleted(arrayImage.filter(imageUrl => imageUrl !== image))
                }
            ], 
            {cancelable: false}
            );
    };
    

    return (
        <View style= {styles.viewImagen}>
            {imageSelected.length<2 && (
            <Icon
                type='material-community'
                name='camera'
                color="#7a7a7a"
                containerStyle={styles.containerIcon}
                onPress= {imageSelect}
            />
            )}
            {imageSelected.map(imageJugador => (
                <Avatar
                key={imageJugador}
                onPress={() => removeImage(imageJugador)}
                style={styles.miniatureStyle}
                source={{uri:imageJugador}}
                />
            ))}
        </View>
    );

}

function FormAdd (props) {
    const {setNombre, setApodo, setFechan, setClub, setPosicion, setArco, setDefensa, setAtaque, setEstado, setTotal} = props; 







    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del Jugador"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                onChange={e => setNombre(e.nativeEvent.text)}
                />
            <Input
                placeholder="Apodo"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                onChange={e => setApodo(e.nativeEvent.text)}
                />
            <Input
                placeholder="Fecha de Nacimiento"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                onChange={e => setFechan(e.nativeEvent.text)}
                />
            <Input
                placeholder="Club de Futbol"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                onChange={e => setClub(e.nativeEvent.text)}
                />
            <Input      
                placeholder="Posicion"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                onChange={e => setPosicion(e.nativeEvent.text)}
                />
            <Input      
                placeholder="Arco"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                onChange={e => setArco(e.nativeEvent.text)}
                />
            <Input
                placeholder="Defensa"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                onChange={e => setDefensa(e.nativeEvent.text)}
                />
            <Input
                placeholder="Ataque"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                onChange={e => setAtaque(e.nativeEvent.text)}
                />
            <Input
                placeholder="Estado Fisico"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                onChange={e => setEstado(e.nativeEvent.text)}
                />
            <Input
                placeholder="Total"
                placeholderTextColor="#c2c2c2"
                containerStyle={styles.input}
                onChange={e => setTotal(e.nativeEvent.text)}
                />
            

        </View>
    )
}



const styles = StyleSheet.create ({
    input:{
        marginBottom: 10


    },
    foto: {
        alignItems: "center",
        marginBottom: 10,
        height: 200
    },
    viewForm: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,

    },
    viewImagen: {
        flexDirection: "row",
        marginLeft: 50,
        marginRight: 20,
        marginTop: 0,
    }, 
    containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10

    }, 
    btn: {
        backgroundColor: "#00a680",
        margin: 20
    }
})