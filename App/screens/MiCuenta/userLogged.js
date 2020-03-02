import React, { useState, useEffect, useRef } from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import * as firebase from 'firebase';
import InfoUser from '../../componentes/Account/InfoUser';
import Toast from 'react-native-easy-toast';
import Loading from '../../componentes/Loading';
import AccountOptions from '../../componentes/Account/AccountOpcion';



export default function UserLogged (){
    const [userInfo, setUserInfo] = useState({});
    const [reloadData, setReloadData]= useState(false);
    const toastRef=useRef();
    const [isLoading, setIsLoading]=useState(false);
    const [textLoading, setTextLoading]=useState("");


    useEffect (() => {
        (async () => {
            const user = await firebase.auth().currentUser;
            setUserInfo(user.providerData[0]);
        })();
        setReloadData(false);
    }, [reloadData]);



    return (
        <View style={styles.viewUserInfo}>
            <InfoUser 
            userInfo={userInfo} 
            toastRef={toastRef} 
            setIsLoading={setIsLoading} 
            setTextLoading={setTextLoading} 
            setReloadData={setReloadData}
            toastRef={toastRef}
            />
            <AccountOptions 
            userInfo={userInfo} 
            setReloadData={setReloadData}
            toastRef={toastRef}
            />
            <Button
                title="Cerrar sesion"
                buttonStyle={styles.btncerrar}
                titleStyle={styles.btnCloseSeccionText}
                onPress={()=> firebase.auth().signOut()}
            />
            <Toast ref={toastRef} position="center" opacity={0.5} />
            <Loading text={textLoading} isVisible={isLoading}/>
        </View>
    );
}


const styles=StyleSheet.create({
    viewUserInfo: {
        minHeight: "100%",
        backgroundColor: "#E5E7E9"
    },
    btncerrar: {
        marginTop: 30,
        borderRadius: 10,
        backgroundColor: "#f1f1f1",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        padding: 10,
        paddingBottom: 10,
    },
    btnCloseSeccionText: {
        color: "#00a680"
    }
});
