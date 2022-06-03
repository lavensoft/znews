import React, {useEffect} from 'react';
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import Actions from '../sagas/actions';

//*QUICK SETUP VIEWS
import QuickStart from '../views/QuickStart';

//*VIEWS
import HomeScreen from '../views/Home';
import BookmarksScreen from '../views/Bookmarks';
import SearchScreen from '../views/Search';
import SettingsScreen from '../views/Settings';

const Tabs = AnimatedTabBarNavigator();

const RootStack = ({}) => {
    const dispatch = useDispatch();
    const settings = useSelector(state => state.settings.data);

    useEffect(() => {
        dispatch({
            type: Actions.settings.FETCH_SETTINGS
        });
    }, [settings]);

    if(!settings.configured) return <QuickStart/>

    return(
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
    )
}

export default RootStack;