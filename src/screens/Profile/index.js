import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  TextInput,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Header from '../../Component/Header';
import ProfileBox from '../../Component/ProfileBox';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {fonts} from '../../utils';

const Profile = props => {
  const dispatch = useDispatch();
  const login = useSelector(state => state.user.login);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [loadingExtraData, setLoadingExtraData] = useState(false);
  const [randomUserData, setRandomUserData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetRecord();
  }, []);

  useEffect(() => {
    if (page) {
      fetRecord();
    }
  }, [page]);

  const fetRecord = () => {
    setLoading(true);
    fetch(`https://neoestudio.net/api/getUser?page=` + page)
      .then(res => res.json())
      .then(json => {
        console.log(JSON.stringify(json));
        setLoading(false);
        if (json.status_code == 200) {
          setRandomUserData([...randomUserData, ...json.user.data]);
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  };
  const searchRecord = name => {
    setLoading(true);
    console.log(name);
    fetch(`https://neoestudio.net/api/findUser/?name=` + name)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        setLoading(false);
        if (json.status_code == 200) {
          setSearchData(json.user.data);
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('response error ===>', error);
      });
  };
  const loadMoreData = () => {
    setPage(page + 1);
  };

  return (
    <FastImage
      style={styles.container}
      resizeMode={FastImage.resizeMode.stretch}
      source={require('../../Images/bg.png')}>
      <FastImage
        source={
          Platform.OS === 'android'
            ? require('../../Images/veoestudio.png')
            : require('../../Images/ios_logo.png')
        }
        resizeMode={FastImage.resizeMode.contain}
        style={styles.logo}
      />
      <Header
        iconName="left"
        leftClick={() => props.navigation.goBack()}
        title={'Alumno'}
      />
      {/* <LinearGradient
                colors={["#cacaca", "#e9e9e9"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    padding: 10,
                    alignItems: 'center',
                    flexDirection: "row",
                    width: widthPercentageToDP(95),
                    height: heightPercentageToDP(9),
                    alignSelf: "center",
                    borderRadius: widthPercentageToDP(10),
                    borderColor: '#333',
                    justifyContent: "space-around"
                }}>
                <TextInput
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={text => setSearch(text)}
                    status='info'
                    placeholder='Search'
                    placeholderTextColor='#333'
                    style={{
                        //backgroundColor: 'red',
                        width: "80%",
                        height: "100%"
                    }}
                    textStyle={{
                        color: '#000',
                        fontSize: widthPercentageToDP(4.5),
                        fontFamily: "pnsb",
                    }}
                />
                <AntDesign
                    name='search1'
                    color="#333"
                    size={30}
                    onPress={() => searchRecord(search)}
                />
            </LinearGradient> */}
      {!search ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: heightPercentageToDP(1),
          }}>
          {!randomUserData || !randomUserData.length ? (
            <View />
          ) : (
            <FlatList
              data={randomUserData}
              keyExtractor={(item, index) => 'unique' + index}
              onEndReachedThreshold={0.2}
              onEndReached={() => loadMoreData()}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <ProfileBox
                    profileImage={item.photo}
                    username={item.userName}
                    experience={parseFloat(item?.time).toFixed(2)}
                    aptos={item.aptos}
                    puntos={item.points}
                    percentage={item.percentage}
                    rankImage={item.rank_image}
                    rankName={item.rank_name}
                  />
                );
              }}
            />
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: heightPercentageToDP(1),
          }}>
          {!searchData || !searchData.length ? (
            <View />
          ) : (
            <FlatList
              data={searchData}
              keyExtractor={(item, index) => 'unique' + index}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <ProfileBox
                    profileImage={item.photo}
                    username={item.userName}
                    experience={item.experience}
                    aptos={item.aptos}
                    puntos={item.points}
                    percentage={item.percentage}
                    rankImage={item.rank_image}
                    rankName={item.rank_name}
                  />
                );
              }}
            />
          )}
        </View>
      )}

      {loading && (
        <ActivityIndicator size="large" color="#000" style={styles.loading} />
      )}
    </FastImage>
  );
};

export default Profile;
