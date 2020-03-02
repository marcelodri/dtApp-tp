import {createStackNavigator} from 'react-navigation-stack';
import JugadoresScreen from '../screens/JugadoresCarp/Jugadores';
import AJugadorScreen from '../screens/JugadoresCarp/Agregar';


const JugadoresScreenStack = createStackNavigator({
    Jugadores: {
        screen: JugadoresScreen,
        navigationOptions: () => ({
            title: "Jugadores"
        })
    }, 
    Agregar: {
        screen: AJugadorScreen, 
        navigationOptions: () => ({
            title: "Agregar Jugador"
        })
    }
});

export default JugadoresScreenStack;
