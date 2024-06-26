import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Auth/Home";
import Login from "./screens/Auth/Login";
import Register from "./screens/Auth/Register";
import HomeApp from "./screens/App/HomeApp";
import Reservation from "./screens/App/Reservation";
import Directions from "./screens/App/Directions";
import Occuppied from "./screens/App/Occupied";
import CheckOut from "./screens/App/CheckOut";

const LoginStack = createStackNavigator();
function StackLogin() {
  return (
    <LoginStack.Navigator initialRouteName="Home">
      <LoginStack.Screen
        name="Inicio"
        component={Home}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <LoginStack.Screen
        name="Registrarse"
        component={Register}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
}

const AppStack = createStackNavigator();
function StackApp() {
  return (
    <AppStack.Navigator initialRouteName="HomeApps">
      <AppStack.Screen name="HomeApp" component={HomeApp} options={{headerShown:false}} />
      <AppStack.Screen name="Reservar" component={Reservation} options={{headerShown:false}} />
      <AppStack.Screen name="Direcciones" component={Directions} options={{headerShown:false}} />
      <AppStack.Screen name="Ocupado" component={Occuppied}  options={{headerShown:false}}/>
      <AppStack.Screen name="Check-Out" component={CheckOut}  options={{headerShown:false}}/>

    </AppStack.Navigator>
  );
}

const RootStack = createStackNavigator();
function RootNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Auth" component={StackLogin} />
        <RootStack.Screen name="AppStack" component={StackApp} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
