import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 52,
    width: '100%',
    // backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    position: 'relative',
  },
  balanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 38,
    width: 38,
    borderRadius: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  textInfo: {
    margin: 2,
  },
});

export default styles;
