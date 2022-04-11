import {StyleSheet} from 'react-native';
import {primaryColor} from '../../globalStyles';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '90%',
    marginTop: 75,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  collapsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(30,30,30,0.2)',
    padding: 15,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(100,100,100,0.3)',
    // marginTop: 10,
  },
  txtPendingColor: {
    color: '#FFC107',
  },
  txtSuccessColor: {
    color: primaryColor,
  },
  txtFailedColor: {
    color: '#F44336',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  cancelBtn: {
    width: 172,
    height: 48,
    backgroundColor: 'rgba(30,30,30,0.2)',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  cancelTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F44336',
  },
});

export default styles;
