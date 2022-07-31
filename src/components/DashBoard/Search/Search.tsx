/* eslint-disable react-native/no-inline-styles */
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {BlurView} from '@react-native-community/blur';
import Slider from '@react-native-community/slider';
import React, {Fragment, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import {clearResult, removeResult} from '../../../actions/searchActions';
import {SearchItem, SearchResult} from '../../../constants/SearchConstants';
import {useActivitiesContext} from '../../../contexts/activitiesContext';
import {useAuthContext} from '../../../contexts/authContext';
import {useSearchContext} from '../../../contexts/searchContext';
import {checkFloat} from '../../../utils/check';
import CollapsibleCard from '../../CollapsibleCard/CollapsibleCard';
import globalStyles, {
  lineColor,
  placeHolderColor,
  primaryColor,
} from '../../globalStyles';
import Map from '../../Map/Map';
import styles from './SearchStyles';

const SearchInput: React.FC<{
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  duration: string;
  setDuration: React.Dispatch<React.SetStateAction<string>>;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  radius: number;
  setRadius: React.Dispatch<React.SetStateAction<number>>;
  search: () => void;
}> = ({
  searchText,
  setSearchText,
  duration,
  setDuration,
  radius,
  setRadius,
  search,
}) => {
  return (
    <Fragment>
      <View style={[globalStyles.flexRowSpaceBetween, globalStyles.fullWidth]}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={placeHolderColor}
          style={[
            globalStyles.textInput,
            styles.input,
            globalStyles.primaryColor,
          ]}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View style={[globalStyles.flexRowSpaceBetween, globalStyles.fullWidth]}>
        <TextInput
          placeholder="Duration"
          placeholderTextColor={placeHolderColor}
          style={[
            globalStyles.textInput,
            styles.durationInput,
            globalStyles.primaryColor,
          ]}
          value={duration}
          onChangeText={setDuration}
        />
        <View>
          <Text
            style={[globalStyles.primaryColor]}>{`Radius: ${radius} km`}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={20}
            step={1}
            minimumTrackTintColor={primaryColor}
            maximumTrackTintColor={lineColor}
            thumbTintColor={primaryColor}
            value={radius}
            onValueChange={setRadius}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[globalStyles.confirmBtn, globalStyles.primaryBorder]}
        onPress={() => {
          search();
        }}>
        <Text style={[globalStyles.primaryColor, globalStyles.bold]}>
          Search
        </Text>
      </TouchableOpacity>
    </Fragment>
  );
};
const SearchResults: React.FC<{
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  results: SearchResult[];
  clearInput: () => void;
}> = ({setIsExpanded, results, clearInput}) => {
  const {searchDispatch, sendSearchCancel} = useSearchContext();
  const {approveResult} = useActivitiesContext();
  const approve = (result: SearchResult) => {
    approveResult(result);
    searchDispatch(clearResult());
    sendSearchCancel();
    setIsExpanded(false);
    clearInput();
  };
  return (
    <View style={globalStyles.fullWidthHeight}>
      <TouchableOpacity
        style={[globalStyles.flexRowCenter, styles.backBtn]}
        onPress={() => {
          setIsExpanded(false);
          sendSearchCancel();
        }}>
        <FontAwesomeIcon color={primaryColor} icon={faAngleLeft} />
        <Text style={[globalStyles.primaryColor]}>back</Text>
      </TouchableOpacity>
      <ActivityIndicator
        size="small"
        color={primaryColor}
        style={styles.indicator}
      />
      <Text style={[globalStyles.h4, globalStyles.bold, styles.title]}>
        Result
      </Text>
      <View style={[globalStyles.divider]} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {results?.map(item => (
          <CollapsibleCard
            key={item.id}
            style={[styles.resultItem]}
            header={[
              {title: 'Name', content: item.itemName},
              {title: 'Distance', content: item.distance.toString() + ' km'},
              {title: 'Price', content: item.itemPrice.toString() + ' $/h'},
            ]}
            content={[
              {title: 'Total', content: item.totalPrice.toString() + ' $'},
              {title: 'Duration', content: item.duration.toString() + ' h'},
              {
                title: 'Real Value',
                content: item.itemRealValue.toString() + ' $',
              },
            ]}>
            <View style={globalStyles.flexRowSpaceBetween}>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  searchDispatch(removeResult(item.id));
                }}>
                <Text style={[globalStyles.cancelTxt]}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={(globalStyles.confirmBtn, styles.btn)}
                onPress={() => {
                  approve(item);
                }}>
                <Text style={[globalStyles.confirmTxt]}>Approve</Text>
              </TouchableOpacity>
            </View>
          </CollapsibleCard>
        ))}
      </ScrollView>
    </View>
  );
};
const Search: React.FC<{}> = ({}) => {
  const [progress] = useState(new Animated.Value(570));
  const [keyboardProgress] = useState(new Animated.Value(0));
  const [keyboardHeight, setKeyboardHeight] = useState(70);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [duration, setDuration] = useState('');
  const [radius, setRadius] = useState(1);
  const {searchState, sendSearch} = useSearchContext();
  const {authState} = useAuthContext();
  const clearInput = () => {
    setSearchText('');
    setDuration('');
    setRadius(1);
  };
  const search = () => {
    if (checkFloat(duration) && searchText && checkFloat(radius.toString())) {
      const searchItem: SearchItem = {
        name: searchText,
        radius: radius * 1000,
        duration: parseInt(duration, 10),
        id: uuid.v4().toString(),
        lat: searchState.curPos!.lat,
        lng: searchState.curPos!.lng,
        socketId: searchState.searchSocket!.id,
        userId: authState.user!.id,
      };
      sendSearch(searchItem);
      setIsExpanded(prev => !prev);
    }
  };
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(70);
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isExpanded) {
      Animated.timing(progress, {
        toValue: 130,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 570,
        useNativeDriver: false,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  useEffect(() => {
    if (keyboardStatus) {
      Animated.timing(keyboardProgress, {
        toValue: keyboardHeight - 20,
        useNativeDriver: false,
        duration: 300,
      }).start();
    } else {
      Animated.timing(keyboardProgress, {
        toValue: 80,
        useNativeDriver: false,
        duration: 300,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboardStatus, keyboardHeight]);

  return (
    <TouchableNativeFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Map curPos={searchState.curPos}>
          <Animated.View
            style={[
              styles.searchBoard,
              {
                top: progress,
              },
            ]}>
            <SafeAreaView>
              <Animated.View
                style={[
                  {
                    bottom: keyboardProgress,
                  },
                ]}>
                <BlurView
                  style={[styles.blurBoard]}
                  blurType="dark"
                  blurAmount={5}
                  blurRadius={5}
                  overlayColor="transparent">
                  {isExpanded ? (
                    <SearchResults
                      setIsExpanded={setIsExpanded}
                      results={searchState.results}
                      clearInput={clearInput}
                    />
                  ) : (
                    <SearchInput
                      searchText={searchText}
                      setSearchText={setSearchText}
                      duration={duration}
                      setDuration={setDuration}
                      setIsExpanded={setIsExpanded}
                      radius={radius}
                      setRadius={setRadius}
                      search={search}
                    />
                  )}
                </BlurView>
              </Animated.View>
            </SafeAreaView>
          </Animated.View>
        </Map>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Search;
