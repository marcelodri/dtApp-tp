import {createStackNavigator} from 'react-navigation-stack';
import EquiposScreen from "../screens/Equipos";

const EquiposScreenStack = createStackNavigator({
    Equipos: {
        screen: EquiposScreen,
        navigationOptions: () => ({
            title: "Equipos"
        })
    }
});

export default EquiposScreenStack;