import React, {useState} from 'react';
import {Input, Icon, Button} from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import {validateEmail} from "../../Utils/Validation";
import Loading from "../../componentes/Loading";
import firebase from 'firebase';
import {withNavigation} from 'react-navigation'; 

function LoginForm(props) {
    const {toastRef, navigation} = props;
    const [hidePassword, setHidePassword] = useState(true);
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState ("");
    const [isVisibleLoading, setIsVisibleLoading]= useState(false);



    const login =async () => {
        setIsVisibleLoading(true);
        if(!email || !password) {
            toastRef.current.show("Todos los Campos Son Obligatorios");
        } else {
          if(!validateEmail(email)) {
              toastRef.current.show("El email No Es Correcto");
          } else {
            await firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    navigation.navigate("MiCuenta");
                })
                .catch(() => {
                    toastRef.current.show("email o contraseña incorrecta");
                });
          }
        }
        setIsVisibleLoading(false);
    };

    return (
    <View style={styles.formContainer}>
        <Input 
            placeholder="Correo Electronico"
            containerStyle={styles.inputForm}
            onChange={e=>setEmail(e.nativeEvent.text)}
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
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={hidePassword}
            onChange={e=>setPassword(e.nativeEvent.text)}
            rightIcon={
                <Icon
                    type="material-community"
                    name={hidePassword ? "eye-outline" : "eye-off-outline"}
                    iconStyle={styles.iconRight}
                    onPress={() => setHidePassword(!hidePassword)}
                />
            }
        />
        <Button 
            title= "Iniciar Secion" 
            containerStyle={styles.btnform}
            buttonStyle={styles.btn}
            onPress={login}
            raised={true}
            
        />
        <Loading alignItems="center" isVisible={isVisibleLoading} text="iniciando Sesión"/>    
    </View>
    );
}

export default withNavigation(LoginForm);


const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm: {
        width: "100%",
        marginTop: 20
    },
    iconRight:{
        color: "#c1c1c1"
    },
    btnform: {
        marginTop: 40,
        width: "95%",
        height: 46
    },
    btn: { 
        backgroundColor: "#00a680",
        borderRadius: 23,
        height: 46
    }
});
