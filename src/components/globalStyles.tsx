import {StyleSheet} from 'react-native';

export const primaryColor = '#34AE73';
export const successColor = '#34AE73';
export const failedColor = '#F44336';
export const pendingColor = '#FFC107';
export const txtColor = '#F5F5F5';
export const placeHolderColor = '#9E9E9E';
export const lineColor = 'rgba(100,100,100,0.3)';
const globalStyles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: '#fff',
    margin: 10,
  },
  subtitle: {fontSize: 16, color: '#fff', opacity: 0.9, margin: 10},
  bold: {
    fontWeight: 'bold',
  },
  divider: {
    height: 0.5,
    backgroundColor: '#fff',
    opacity: 0.3,
    margin: 20,
  },
  textInput: {
    width: '70%',
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    color: txtColor,
    padding: 20,
    margin: 10,
  },
  button: {
    width: 72,
    height: 52,
    borderRadius: 10,
    padding: 20,
    backgroundColor: primaryColor,
  },
  error: {color: failedColor, marginTop: 10, textAlign: 'center'},
  collapsItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  confirmBtn: {
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

  confirmTxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: primaryColor,
  },
  flexRowSpaceBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  fullWidthHeight: {
    width: '100%',
    height: '100%',
  },
  primaryColor: {
    color: primaryColor,
  },
});

export default globalStyles;
