import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WebView } from "react-native-webview";
// import { removeArrayDuplicates } from "tiledesk-web-widget";

function HomeScreen({ navigation }) {
  // const myNums = [1,2,3,1,4,1,2,5,3,4];
  // let uniqueNums = removeArrayDuplicates(myNums)
  // console.log(uniqueNums);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Chatta con un operatore"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
 
  const initTiledesk = () => {
      console.log('initTiledesk');
      return `
        window.Tiledesk('show');
        window.Tiledesk('open');
        true;  // note: this is required, or you'll sometimes get silent failures
    `;
  };

  const runFirst = `
    console.log('runFirst');
      // setTimeout(function() { 
      //   window.Tiledesk('show');
      //   window.Tiledesk('open');
      //   true;  // note: this is required, or you'll sometimes get silent failures
      // }, 1000);
      // true; // note: this is required, or you'll sometimes get silent failures
    `;

  const customHTML = `
      <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport">
      <meta name="viewport" content="width=device-width">
      <script type="application/javascript">
                window.tiledeskSettings= 
                {
                    projectid: "62d534f09492e8001a885ec4",
                    startHidden: false,
                    fullscreenMode: true,
                    hideHeaderCloseButton: true,
                    isOpen: true
                };
                (function(d, s, id) { 
                    var w=window; var d=document; var i=function(){i.c(arguments);};
                    i.q=[]; i.c=function(args){i.q.push(args);}; w.Tiledesk=i;                    
                    var js, fjs=d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) return;
                    js=d.createElement(s); 
                    js.id=id; js.async=true; js.src="https://widget.tiledesk.com/v5/launch.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document,'script','tiledesk-jssdk'));
      </script>`;

// setTimeout(() => { 
//   this.webref.injectJavaScript(initTiledesk());
// }, 3000);
  return (
    <WebView
    ref={(r) => (this.webref = r)}
    //source={{ html: customHTML }}
    source={{ uri: 'https://tiledesk.dariodepascalis.space/javascript/indexTiledesk.html' }}
    domStorageEnabled
    startInLoadingState={false}
    javaScriptEnabled={true}
    scrollEnabled={true}
    allowsFullscreenVideo={true}
    cacheEnabled={true}
    cacheMode={'LOAD_CACHE'}
    // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
    // injectedJavaScript={runFirst}
    // injectedJavaScriptBeforeContentLoaded={runFirst}
  />
  );
  
}


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
