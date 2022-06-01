import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { useFCM } from './hooks';

//*Redux
import {store} from './sagas';

import RootStack from './navigation/RootStack';

const config = {
  screens: {
    Home: {
      screens: {
        Feed: 'feed',
        Article: {
          path: 'article/:_id',
        }
      },
      path: "Home",
    },
    Bookmarks: 'bookmarks',
    Search: 'search',
    Settings: 'settings',
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
        //console.log('device_token----->', device_token);
      })
      .catch(e => console.log('error get token firebase ----->', e));
  }, [fcm]);

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <RootStack/>
      </NavigationContainer>
    </Provider>
  );
}
