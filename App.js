import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/Feather';
import { Provider } from 'react-redux';

//*Redux
import {store} from './sagas';

//*VIEWS
import HomeScreen from './views/Home';
import BookmarksScreen from './views/Bookmarks';
import SearchScreen from './views/Search';

const Tabs = AnimatedTabBarNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
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
            component={BookmarksScreen} 
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
