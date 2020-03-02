import {createStackNavigator} from 'react-navigation-stack';
import ConvocadosScreen from "../screens/Convocados";

const ConvocadosScreenStack = createStackNavigator({
    Jugadores: {
        screen: ConvocadosScreen,
        navigationOptions: () => ({
            title: "Convocados"
        })
    }
});

export default ConvocadosScreenStack;