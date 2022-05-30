import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/Feather';
import { Provider } from 'react-redux';
import { useFCM } from './hooks';

//*Redux
import {store} from './sagas';

//*VIEWS
import HomeScreen from './views/Home';
import BookmarksScreen from './views/Bookmarks';
import SearchScreen from './views/Search';
import SettingsScreen from './views/Settings';

const Tabs = AnimatedTabBarNavigator();

const config = {
  screens: {
    // Home: {
    //   path: "articles/:id",
    //   parse: {
    //     id: (id) => `${id}`,
    //     data: "dadada"
    //   },
    // },
  },
};

const linking = {
  prefixes: [
    "news://",
    "https://news.lavenes.com/"
  ],
  config,
};

export default function App() {
  const fcm = useFCM();

  useEffect(() => {
    fcm.requestUserPermission();
    fcm
      .getDeviceToken()
      .then(device_token => {
        console.log('device_token----->', device_token);
      })
      .catch(e => console.log('error get token firebase ----->', e));
  }, [fcm]);

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Tabs.Navigator
          tabBarOptions={{
            activeTintColor: "#FFFFFF",
            inactiveTintColor: "#222222",
            activeBackgroundColor: "#222222",
          }}
        >
          <Tabs.Screen 
            name="Home" 
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                  <Icon
                      name="home"
                      size={size ? size : 24}
                      color={focused ? color : "#222222"}
                      focused={focused}
                  />
              )
            }} 
          />
          <Tabs.Screen 
            name="Bookmarks" 
            component={BookmarksScreen} 
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                  <Icon
                      name="bookmark"
                      size={size ? size : 24}
                      color={focused ? color : "#222222"}
                      focused={focused}
                  />
              )
            }} 
          />
          <Tabs.Screen 
            name="Search" 
            component={SearchScreen} 
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                  <Icon
                      name="search"
                      size={size ? size : 24}
                      color={focused ? color : "#222222"}
                      focused={focused}
                  />
              )
            }} 
          />
          <Tabs.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{
              tabBarIcon: ({ focused, color, size }) => (
                  <Icon
                      name="settings"
                      size={size ? size : 24}
                      color={focused ? color : "#222222"}
                      focused={focused}
                  />
              )
            }} 
          />
        </Tabs.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
