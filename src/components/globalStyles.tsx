import {StyleSheet} from 'react-native';

export const primaryColor = '#34AE73';
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
    color: '#F5F5F5',
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
  error: {color: '#E53935', marginTop: 10, textAlign: 'center'},
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
});

export default globalStyles;
