import {StyleSheet} from 'react-native';
import {lineColor, placeHolderColor, txtColor} from '../../globalStyles';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 82,
    width: '100%',
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  messagePreview: {
    width: '100%',
    height: 82,
    borderBottomWidth: 0.5,
    borderBottomColor: lineColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
  messagePreviewLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '70%',
    height: '100%',
  },
  messagePreviewTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: txtColor,
  },
  messagePreviewText: {
    fontSize: 14,
    color: placeHolderColor,
    overflow: 'hidden',
    marginTop: 5,
  },
  messagePreviewRight: {
    maxWidth: '70%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  messagePreviewDate: {
    fontSize: 14,
    color: placeHolderColor,
  },
});

export default styles;
