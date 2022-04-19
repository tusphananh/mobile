import {StyleSheet} from 'react-native';
import {primaryColor, txtColor} from '../../globalStyles';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchContainer: {
    width: '90%',
    height: 42,
    padding: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchBar: {
    width: '100%',
    height: '100%',
    color: txtColor,
    padding: 0,
  },
  searchIcon: {
    marginRight: 10,
    marginLeft: 20,
  },
  itemResultContainer: {
    width: '90%',
    height: '100%',
  },
  addItemTxt: {
    color: primaryColor,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default styles;
