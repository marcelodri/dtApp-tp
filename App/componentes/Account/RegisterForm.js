import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import {validateEmail} from "../../Utils/Validation";
import * as firebase from 'firebase';
import Loading from '../../componentes/Loading';
import {withNavigation} from 'react-navigation';




function RegisterForm (props) {
    const   {toastref, navigation}=props;
    const   [hidePassword, setHidePassword] = useState(true);
    const   [hideRepeatPassword, setHideRepeatPassword] = useState(true);
    const   [email, setEmail]= useState("");
    const   [password, setPassword]= useState("");
    const   [repeatPassword, setRepeatPassword]= useState("");
    const   [isVisibleLoading, setIsVisibleLoading] = useState("");


    const register = async () => {
      setIsVisibleLoading(true);
      
      if (!email || !password || !repeatPassword){
        toastref.current.show("Todos los campos son obligatorios");

      } else {
        if(!validateEmail(email)){
            toastref.current.show("El email no es correcto");
        } else {
            if(password !== repeatPassword) {
                toastref.current.show("Las contraseñas no son iguales");
            } else {
              await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then (()=> {
                    navigation.navigate("MiCuenta");
                })
                .catch(() => {
                    toastref.current.show("Error al crear la cuenta, intentalo más tarde");
                });
            }   
        }
      }
      setIsVisibleLoading(false);
    };

    return (
        <View style={styles.formCountainer} behavior="padding" enabled>
            <Input
                placeholder="Correo electronico"
                containerStyle={styles.inputForm}
                onChange={e => setEmail(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                password={true}
                secureTextEntry={hidePassword}
                containerStyle={styles.inputForm}
                onChange={e => setPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                }
            />
            <Input
                placeholder="Repetir Contraseña"
                password={true}
                secureTextEntry={hideRepeatPassword}
                containerStyle={styles.inputForm}
                onChange={e => setRepeatPassword(e.nativeEvent.text)}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hideRepeatPassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHideRepeatPassword(!hideRepeatPassword)}
                    />
                }
            />
        <Button 
            title="Unirse"
            style={styles.containerRegister}
            buttonStyle={styles.btnregister}
            onPress={register}
            //raised="true"
        />
        <Loading text="Creando Cuenta" isVisible={isVisibleLoading}/>
        </View>
    );

}

export default withNavigation(RegisterForm);


const styles=StyleSheet.create ({
    formCountainer: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    iconRight: {
        color: "#c1c1c1"
    },
    containerRegister:{
        marginTop: 30,
        width: "95%",
        marginLeft: 10

    },
    btnregister: {
        backgroundColor: "#00a680",
        
    }
})