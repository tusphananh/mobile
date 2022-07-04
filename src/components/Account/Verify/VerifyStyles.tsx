import {StyleSheet} from 'react-native';
import {txtColor} from '../../globalStyles';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    top: 80,
    left: 30,
    right: 30,
    alignItems: 'center',
    position: 'absolute',
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  imgContainer: {
    borderRadius: 10,
    width: '90%',
    borderWidth: 1,
    borderColor: txtColor,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 16 / 9,
    marginBottom: 60,
    overflow: 'hidden',
  },
  imgID: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default styles;
