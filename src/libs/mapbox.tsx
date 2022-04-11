import axios from 'axios';
import env from '../config/env';
import {Position} from '../constants/DashBoardConstants';
import {SearchAddress} from '../constants/SearchConstants';

export const getReverseGeocoding = async (
  position: Position,
): Promise<string> => {
  const {data} = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.lng},${position.lat}.json?access_token=${env.MAPBOX_TOKEN}`,
  );
  if (data.features.length > 0) {
    return data.features[0].place_name;
  }
  return '';
};

export const getGeocoding = async (
  searchAddress: string,
): Promise<Position> => {
  /**
   * Convert searchAddress to URL-encoded UTF-8 string.
   */
  const encodedSearchAddress = encodeURIComponent(searchAddress);
  const {data} = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSearchAddress}.json?access_token=${env.MAPBOX_TOKEN}`,
  );
  if (data.features.length > 0) {
    return {
      lat: data.features[0].center[1],
      lng: data.features[0].center[0],
    };
  }
  return {
    lat: 0,
    lng: 0,
  };
};

/**
 * Get geocoding by address in Vietnam.
 */
export const getGeocodings = async (
  searchAddress: string,
  curPos: Position,
): Promise<SearchAddress[]> => {
  /**
   * Convert searchAddress to URL-encoded UTF-8 string.
   */
  const encodedSearchAddress = encodeURIComponent(searchAddress);
  // console.log(encodedSearchAddress);
  const result: SearchAddress[] = [];
  const {data} = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSearchAddress}.json?country=VN&limit=10&types=district,place,locality,address,poi&proximity=${curPos.lng},${curPos.lat}&access_token=${env.MAPBOX_TOKEN}`,
  );
  if (data.features.length > 0) {
    // console.log(data);
    data.features.forEach(
      (features: {
        id: any;
        place_name: any;
        properties: any;
        center: any[];
      }) => {
        const address = features.place_name;
        address &&
          result.push({
            id: features.id,
            address: address,
            position: {
              lat: features.center[1],
              lng: features.center[0],
            },
          });
      },
    );
  }
  // console.log(result);
  return result;
};

/**
 * Get navigation distance and duration between two position.
 */
export const getDistance_and_Duration = async (
  pos1: Position,
  pos2: Position,
): Promise<{
  distance: number;
  duration: number;
}> => {
  const {data} = await axios.get(
    `https://api.mapbox.com/directions/v5/mapbox/driving/${pos1.lng},${pos1.lat};${pos2.lng},${pos2.lat}.json?geometries=geojson&access_token=${env.MAPBOX_TOKEN}`,
  );
  if (data.routes.length > 0) {
    return {
      distance: data.routes[0].distance,
      duration: data.routes[0].duration,
    };
  }
  return {
    distance: 0,
    duration: 0,
  };
};
