import {createStackNavigator} from 'react-navigation-stack';
import MiCuentaScreen from "../screens/MiCuenta/MiCuenta";
import LoginScreen from "../screens/MiCuenta/Login";
import RegisterScreen from "../screens/MiCuenta/Register";

const MiCuentaScreenStack = createStackNavigator({
    MiCuenta: {
        screen: MiCuentaScreen,
        navigationOptions: () => ({
            title: "Mi Cuenta"
        })
    }, 
    Login: {
        screen: LoginScreen, 
        navigationOptions: () => ({
            title: "Login"
        })
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: () => ({
            title: "Registro"
        })
    }
});

export default MiCuentaScreenStack;