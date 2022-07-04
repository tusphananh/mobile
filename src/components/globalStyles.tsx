import {StyleSheet} from 'react-native';

export const primaryColor = '#34AE73';
export const successColor = '#34AE73';
export const failedColor = '#F44336';
export const pendingColor = '#FFC107';
export const inProgressColor = '#2196F3';
export const txtColor = '#F5F5F5';
export const placeHolderColor = '#9E9E9E';
export const lineColor = 'rgba(100,100,100,0.3)';
export const primaryLowOpacity = 'rgba(52, 174, 115, 0.3)';
export const darkLowOpacity = 'rgba(30, 30, 30, 0.3)';
export const darkMediumOpacity = 'rgba(30, 30, 30, 0.5)';
const globalStyles = StyleSheet.create({
  centerHorizontal: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  centerVertical: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  h1: {
    fontSize: 30,
    color: '#fff',
    margin: 10,
  },
  h2: {
    fontSize: 28,
    color: '#fff',
    margin: 10,
  },
  h3: {
    fontSize: 26,
    color: '#fff',
    margin: 10,
  },
  h4: {
    fontSize: 24,
    color: '#fff',
    margin: 10,
  },
  h5: {
    fontSize: 22,
    color: '#fff',
    margin: 10,
  },
  h6: {
    fontSize: 20,
    color: '#fff',
    margin: 10,
  },
  h7: {
    fontSize: 18,
    color: '#fff',
    margin: 10,
  },
  h8: {
    fontSize: 16,
    color: '#fff',
    margin: 10,
  },
  h9: {
    fontSize: 14,
    color: '#fff',
    margin: 10,
  },
  h10: {
    fontSize: 12,
    color: '#fff',
    margin: 10,
  },
  m0: {
    margin: 0,
  },
  ml0: {
    marginLeft: 0,
  },
  ml5: {
    marginLeft: 5,
  },
  ml10: {
    marginLeft: 10,
  },
  ml15: {
    marginLeft: 15,
  },
  ml20: {
    marginLeft: 20,
  },
  mr5: {
    marginRight: 5,
  },
  mr10: {
    marginRight: 10,
  },
  mr15: {
    marginRight: 15,
  },
  mr20: {
    marginRight: 20,
  },
  mtat: {
    marginTop: 'auto',
  },
  mt5: {
    marginTop: 5,
  },
  mt10: {
    marginTop: 10,
  },
  mt15: {
    marginTop: 15,
  },
  mt20: {
    marginTop: 20,
  },
  mt80: {
    marginTop: 80,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
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
  flex1: {
    flex: 1,
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
    color: failedColor,
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
  flexRowSpaceEvenly: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  flexRowCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexColCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexColCenterVertical: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  flexColCenterHorizontal: {
    display: 'flex',
    flexDirection: 'column',
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
  darkBackground: {
    backgroundColor: 'rgba(30,30,30,0.2)',
  },
  primaryBorder: {
    borderWidth: 1,
    borderColor: primaryLowOpacity,
  },
  darkMediumOpacity: {
    backgroundColor: darkMediumOpacity,
  },
  safeView: {
    paddingLeft: 32,
    paddingRight: 32,
    flex: 1,
  },
  touchableCard: {
    backgroundColor: 'rgba(30,30,30,0.2)',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(50,50,50,0.5)',
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 30,
    color: primaryColor,
    fontWeight: '600',
  },
  pd20: {
    padding: 20,
  },
});

export default globalStyles;
