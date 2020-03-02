import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import {Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';


function UserGuest(props) {
    const {navigation}=props;


    return (
        <ScrollView style={styles.viewBody} centerContent={true}>
            <Image
                source={require("../../../assets/sport-2822768_1280.png")}
                style={styles.image}
                resizeMode="contain"
            />
            <Text style={styles.title}>
                Logueate y conectate con tus Amigos
            </Text>
            <Text style={styles.descriptions}>
                Forma parte del equipo de futbol de tus amigos. 
                Una vez logueado recibiras convocatorias, notificaciones 
                y sabras quienes fueron las figuras del ultimo encuentro.
            </Text>
            <View style={styles.viewBtn}>
                <Button
                    buttonStyle={styles.btnstyle}
                    containerStyle={styles.btnContainer}
                    title="Ver tu perfil"
                    onPress={() => navigation.navigate("Login")}
                    raised={true}
                />
            </View>
        </ScrollView>

    );
}


export default withNavigation(UserGuest);

const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginBottom: 30
    },

    image:{
        height: 250,
        width: "100%",
        marginBottom: 40,
    },
    title:{
        fontSize: 19,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
        marginRight: 30
    },
    descriptions: {
        //textAlign: "center",
        justifyContent: "center",
        marginBottom: 20,
        marginRight: 30
    },
    viewBtn: {
        flex: 1,
        alignItems: "center"
    },
    btnstyle: {
        backgroundColor: "#00a680",
    },
    btnContainer: {
        width: "70%",
        marginRight: 30
    }


});
