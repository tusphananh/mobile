import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '../../assets/images/background.png',
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    paddingLeft: 38,
    paddingRight: 38,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'rgba(30,30,30,0.5)',
  },
  card: {
    width: '90%',
    alignSelf: 'center',
  },
});

export default styles;
