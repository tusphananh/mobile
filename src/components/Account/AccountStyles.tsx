import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -100,
  },
  header: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  backBtn: {
    position: 'absolute',
    top: 15,
    left: 0,
  },
});

export default styles;
