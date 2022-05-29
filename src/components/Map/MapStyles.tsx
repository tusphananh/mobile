import {StyleSheet} from 'react-native';
import {lineColor, primaryColor} from '../globalStyles';

const zoomBtnSize = 48;
const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    position: 'relative',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
    zIndex: -100,
  },
  marker__green: {
    backgroundColor: primaryColor,
  },
  marker__red: {
    backgroundColor: '#F44336',
  },
  marker: {
    width: 10,
    height: 10,
    borderRadius: 20,
  },
  marker_outter__green: {
    backgroundColor: 'rgba(52, 174, 115, 0.3)',
    borderColor: primaryColor,
  },
  marker_outter__red: {
    backgroundColor: 'rgba(	244, 67, 54, 0.3)',
    borderColor: '#F44336',
  },
  marker_outter: {
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderStyle: 'solid',
  },
  zoomContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,
    position: 'absolute',
    top: 60,
    right: 20,
  },

  zoomBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: lineColor,
    width: zoomBtnSize,
    height: zoomBtnSize,
    margin: 3,
    backgroundColor: 'transparent',
  },
});

export default styles;
