/* eslint-disable */
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CONFIG from '../../global/config';

class UserView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      props,
    } = this;

  const avatar = props.profile.indexOf('http') === 0 ? props.profile : (CONFIG.CDN_DOMAIN + props.profile);

    return (
      <View style={styles.userView}>
        <Image
          source={{ uri: avatar }}
          style={styles.image}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        <TouchableOpacity onPress={props.onClosePress}>
          <Icon
            name="close"
            color="white"
            size={23}
            style={{ marginRight: 8 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 46,
    height: 46,
    borderRadius: 25,
    marginLeft: 8,
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 72,
    width: '93%',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
});

export default UserView;
