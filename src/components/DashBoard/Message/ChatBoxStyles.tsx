import {StyleSheet} from 'react-native';
import {placeHolderColor, txtColor} from '../../globalStyles';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '95%',
    height: '75%',
    position: 'relative',
    alignSelf: 'center',
  },
  header: {
    width: '100%',
    justifyContent: 'center',
  },
  backBtn: {
    position: 'absolute',
    left: 30,
    top: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    alignSelf: 'center',
    color: txtColor,
  },
  chatBox: {
    width: '100%',
    height: '90%',
    paddingBottom: 20,
    paddingTop: 20,
  },
  messageContainer__owner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 5,
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
  },
  message: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: '300',
    color: txtColor,
    padding: 5,
    backgroundColor: 'rgba(30,30,30,0.1)',
    borderRadius: 15,
    marginRight: 10,
    marginLeft: 10,
    flexWrap: 'wrap',
    flexShrink: 1,
    maxWidth: '80%',
    overflow: 'hidden',
  },
  time: {
    fontSize: 14,
    fontWeight: '500',
    color: placeHolderColor,
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 48,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: '100%',
    padding: 10,
  },
});

export default styles;
