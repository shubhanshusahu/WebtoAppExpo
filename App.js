import  React, {useState,useEffect,useRef} from 'react';
import { WebView } from 'react-native-webview';
import { Button, StyleSheet,View,Text, BackHandler } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { ActivityIndicator } from 'react-native-web';
// const Loading = ()=><ActivityIndicator
//  style={styles.container,styles.loading}
//  color ="blue"
// />
const AppStack = createStackNavigator();
const Homescreen = ()=>{
  return(
   <View>
     <Text>
       Welcome to Playmersiv
     </Text>
     <Button title="goto playmersive"/>
   </View>
  )
}
const Playmersiv = ({navigation})=>{
  const webviewref = useRef(null);
  const [canGoBack, setcanGoBack] = useState(false)
  const [canGoForward, setcanGoForward] = useState(true)
  const [CurrentUrl, setCurrentUrl] = useState('https://www.playmersiv.live/sgsilat/')

  const backAction =()=>{
    if (canGoBack){
      webviewref.current.goBack()
       
    }
    else{
      navigation.goBack()
    }
    return true;
  }
  useEffect(() => {
  BackHandler.addEventListener("hardwareBackPress",backAction);
  ()=>    BackHandler.removeEventListener("hardwareBackPress", backAction)
  
  }, [canGoBack])
  
  return(
    <WebView 
    ref={webviewref}
    style={styles.container}
    source={{ uri: CurrentUrl }}
    javaScriptEnabled={true}
    allowsFullscreenVideo={true}
    // startInLoadingState
    // renderLoading={Loading}
    onNavigationStateChange={navstate=>{
      setcanGoBack(navstate.canGoBack)
      setcanGoForward(navstate.canGoForward)
      setCurrentUrl(navstate.url)
    }}
  />
  )
}

export default function App() {
  return (
   <NavigationContainer>
 <AppStack.Navigator screenOptions={{ headerShown: false }} >
 {/* <AppStack.Screen name="home" component={Homescreen}/> */}
       <AppStack.Screen name="Play" component={Playmersiv}/>
    </AppStack.Navigator>
     </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    // height: undefined, 
    // aspectRatio: 16 / 9
  },
  loading:{
    flex: 1,
    position:'absolute',
    width: '100%',
    height:'100%'
  }
});
