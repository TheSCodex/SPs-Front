import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Auth/Home";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import HomeApp from "./screens/App/HomeApp";
import Reservation from "./screens/App/Reservation";
import Directions from "./screens/App/Directions";
import Occuppied from "./screens/App/Occupied";

const LoginStack = createStackNavigator()

function StackLogin(){
    return(
        <LoginStack.Navigator initialRouteName="Home">
            <LoginStack.Screen
            name="Inicio"
            component={Home}
            options={{
                headerShown: false
            }}>
            </LoginStack.Screen>
            <LoginStack.Screen
            name="Login"
            component={Login}
            options={{
                headerShown: false
            }}>
            </LoginStack.Screen>
            <LoginStack.Screen
            name="Registrarse"
            component={Register}
            options={{
                headerShown: false
            }}>
            </LoginStack.Screen>
        </LoginStack.Navigator>
    )
}

const AppStack = createStackNavigator()

function StackApp(){
    return(
        <AppStack.Navigator initialRouteName="Home">
            <AppStack.Screen
            name="Inicio"
            component={HomeApp}>
            </AppStack.Screen>
            <AppStack.Screen
            name="Reservar"
            component={Reservation}>  
            </AppStack.Screen>
            <AppStack.Screen
            name="Direcciones"
            component={Directions}>  
            </AppStack.Screen>
            <AppStack.Screen
            name="¡Lugar ocupado!"
            component={Occuppied}>  
            </AppStack.Screen>
        </AppStack.Navigator>
    )
}

const RootStack = createStackNavigator();

function RootNavigator(){
    return (
        <RootStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <RootStack.Screen
                name="Auth"
                component={StackLogin}>
            </RootStack.Screen>
            <RootStack.Screen
                name="AppStack"
                component={StackApp}>
            </RootStack.Screen>
        </RootStack.Navigator>
    )
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <RootNavigator/>
        </NavigationContainer>
    )
}