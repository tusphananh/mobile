import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
  },
  avatarContainer: {
    position: 'absolute',
    top: 10,
    right: 30,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5,
  },
  infoContainer: {
    position: 'absolute',
    top: 50,
    width: '100%',
    height: '80%',
    // backgroundColor: 'white',
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default styles;
