import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBoard: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    zIndex: 2,
    flex: 1,
  },
  blurBoard: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 15,
    padding: 10,
  },
  input: {
    height: 42,
    width: '95%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  durationInput: {
    height: 42,
    width: 128,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    marginBottom: 20,
  },
  title: {
    marginTop: 40,
    marginLeft: 20,
  },
  indicator: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  resultItem: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
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
  slider: {
    width: 172,
    height: 32,
    marginRight: 20,
  },
});

export default styles;
