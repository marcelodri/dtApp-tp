import React from 'react';
import {Icon} from 'react-native-elements';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';


import JugadoresScreenStack from "../navigations/JugadoresStacks"
import ConvocadosScreenStack from "../navigations/ConvocadosStarks"
import EquiposScreenStack from "../navigations/EquiposStacks"
import MiCuentaScreenStack from "../navigations/MiCuentaStacks"


const NavigationStacks = createBottomTabNavigator({
    Jugadores: {
        screen: JugadoresScreenStack,
        navigationOptions: () => ({
            tabBarLabel: "Jugadores",
            tabBarIcon: ({tintColor}) => (
                <Icon 
                    type="material-community"
                    name="account"
                    size={40}
                    color= {tintColor}
                />
            )
        })
    },
    Convocados: {
        screen: ConvocadosScreenStack,
        navigationOptions: () => ({
            tabBarLabel: "Convocados",
            tabBarIcon: ({tintColor}) => (
                <Icon 
                    type="material-community"
                    name="account-switch"
                    size={40}
                    color= {tintColor}
                />
            )
        })
    },
    Equipos: {
        screen: EquiposScreenStack,
        navigationOptions: () => ({
            tabBarLabel: "Equipos",
            tabBarIcon: ({tintColor}) => (
                <Icon 
                    type="material-community"
                    name="account-group"
                    size={40}
                    color= {tintColor}
                />
            )
        })
    },
    MiCuenta: {
        screen: MiCuentaScreenStack,
        navigationOptions: () => ({
            tabBarLabel: "Mi Cuenta",
            tabBarIcon: ({tintColor}) => (
                <Icon 
                    type="material-community"
                    name="account-circle"
                    size={40}
                    color= {tintColor}
                />
            )
        })
    }
},
{
    initialRouteName: "MiCuenta",
    order: ["MiCuenta", "Jugadores", "Convocados", "Equipos"],
    tabBarOptions: {
        inactiveTintColor: "#646464", 
        activeTintColor: "#00a680"
    }
}
);


export default createAppContainer(NavigationStacks);
