import React from 'react';
import {Text, View} from 'react-native';
import Toast from 'react-native-easy-toast';
import { useRef, useState } from 'react';
import Loading from '../../componentes/Loading';
import { ScrollView } from 'react-native-gesture-handler';
import AgregarJugadorForm from '../../componentes/Jugadores/AgregarJugadorForm';




export default function AgregaJugador (props) {
    const {navigation} = props;
    const toastRef = useRef();
    const [isLoading, setIsLoading]=useState(false);



    return (
        <ScrollView>
        <View>
            <AgregarJugadorForm setIsLoading={setIsLoading} toastRef={toastRef} navigation={navigation}/> 
            <Toast ref={toastRef} position="center" opacity={0.5}/>
            <Loading isVisible={isLoading} text = "Creando Jugador"/>  
        </View>
        </ScrollView>
    );
}

