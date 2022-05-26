import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// eslint-disable-next-line react/prefer-stateless-function
class Readmore extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    const {
      onReadMore,
      title
    } = this.props;

    return (
      <TouchableOpacity onPress={onReadMore} style={styles.readMoreWrapper}>
        <Text style={styles.readText}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  readMore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
  },
  readText: {
    fontSize: 25,
    fontWeight: '600',
    marginLeft: 12,
    color: 'white',
    marginTop: 8,
  },
  readMoreWrapper: {
    position: 'absolute',
    bottom: 56,
    width: '93%',
    justifyContent: 'space-between',
  },
});

export default Readmore;
