import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Alert,
  FlatList,
  PermissionsAndroid,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import Share from 'react-native-share';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faPlus,
  faHeart,
  faCommentDots,
  faPlay,
  faThumbsUp,
  faThumbsDown,
  faShare,
  faArrowLeft,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import {showHUD, hideHUD} from '../../Component/Loader';
import RNFetchBlob from 'react-native-blob-util';
import {
  tiktokLikeCount,
  tiktokShareCount,
  tiktokDownloadCount,
  getTiktokComment,
  postTiktokComment,
  deleteTiktokComment,
  editTiktokComment,
} from '../../Redux/action';
import {mainStyles} from './mainStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Input} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Item from './CommentItems';

import {
  styles,
  NewsByFollowing,
  NewsByFollowingText,
  NewsByFollowingTextBold,
  ContentRight,
  ArrowLeft,
  ArrowIcon,
  ContentRightUser,
  ContentRightUserImage,
  ContentRightUserPlus,
  ContentRightHeart,
  ContentRightComment,
  ContentRightWhatsApp,
  ContentRightWhatsAppImage,
  ContentRightText,
  ContentLeftBottom,
  ContentLeftBottomNameUser,
  ContentLeftBottomNameUserText,
  ContentLeftBottomDescription,
  ContentLeftBottomMusic,
  ContentRightShare,
} from './styles';
import {widthPercentageToDP} from '../../Component/MakeMeResponsive';

const Home = props => {
  const disptach = useDispatch();
  const login = useSelector(state => state.user.login);
  const AuthLoading = useSelector(state => state.user.AuthLoading);
  const videoPlayer = useRef(null);
  const inputref = useRef(null);
  const [paused, setPaused] = useState(false);
  const result = props.navigation.getParam('data', '123');
  const [activeIndex, setIndex] = useState(0);
  const [isLike, setLike] = useState(false);
  const [iscomment, setCommentpop] = useState(false);
  const [isdownload, setDownload] = useState(false);
  const [isShare, setShare] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [chatData, setChatData] = useState([]);
  const [myComment, setMycomment] = useState('');
  const [isupdate, setUpdate] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (iscomment) {
      getCommentApi();
    }
  }, [iscomment]);
  const convertVideoToBase64 = async (id, url, title) => {
    setLoading(true);
    let URL = encodeURI(url);
    console.log('==>', URL);
    const fs = RNFetchBlob.fs;
    let Path = null;
    await RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', URL)
      // the image is now dowloaded to device's storage
      .then(resp => {
        // the image path you can use it directly with Image component
        Path = resp.path();
        return resp.readFile('base64');
      })
      .then(base64Data => {
        // here's base64 encoded image
        setLoading(false);
        //shareImage(base64Data)
        shareLink(id, base64Data, title);
        //console.log("Image converted to base64");
        console.log(base64Data);
        // remove the file from storage
        return fs.unlink(Path);
      });
  };
  const shareLink = async (id, url, title) => {
    const shareOptions = {
      title: title,
      url: `data:video/mp4;base64,${url}`,
      failOnCancel: false,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(ShareResponse);
      if (ShareResponse.success) {
        setShare(isShared => !isShared);
        setShareCount(mycount => mycount + 1);
        disptach(tiktokShareCount(login.data.id, id));
      }
    } catch (error) {
      console.log('Error =>', error);
    }
  };
  const download = (fileUrl, id) => {
    setDownload(isDownloaded => !isDownloaded);
    setDownloadCount(myDownload => myDownload + 1);
    disptach(tiktokDownloadCount(login.data.id));
    var date = new Date();
    var url = fileUrl;
    var ext = extention(url);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let DownloadDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          DownloadDir +
          '/NeoeStudio_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'NeoeStudio',
      },
    };
    config(options)
      .fetch('GET', url)
      .then(res => {
        setDownload(isDownloaded => !isDownloaded);
        setDownloadCount(myDownload => myDownload + 1);
        disptach(tiktokDownloadCount(login.data.id));
      });
  };
  const iosDownload = async (fileUrl, id) => {
    setDownload(isDownloaded => !isDownloaded);
    setDownloadCount(myDownload => myDownload + 1);
    disptach(tiktokDownloadCount(login.data.id));
    var date = new Date();
    var url = fileUrl;
    var encoded = encodeURI(url);
    var ext = extention(url);
    ext = '.' + ext[0];
    let dirs =
      RNFetchBlob.fs.dirs.DCIMDir +
      '/NeoeStudio_' +
      Math.floor(date.getTime() + date.getSeconds() / 2) +
      ext;

    RNFetchBlob.config({
      // response data will be saved to this path if it has access right.
      fileCache: true,
      path: dirs
    })
      .fetch('GET', encoded, {
        //some headers ..
      })
      .then(res => {
        RNFetchBlob.fs.writeFile(dirs, res.data, 'base64');
        RNFetchBlob.ios.previewDocument(dirs);
        // the path should be dirs.DocumentDir + 'path-to-file.anything'
        // RNFetchBlob.ios.openDocument(resp.data);
        //FileViewer.open(resp.data, {showOpenWithDialog: true});
        setDownload(isDownloaded => !isDownloaded);
        setDownloadCount(myDownload => myDownload + 1);
        disptach(tiktokDownloadCount(login.data.id));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const extention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const requestPermission = async (url, id) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Neoestudio Application',
          message:
            'Neoestudio App needs access to your Storage ' +
            'so you can download and save any files.',
          //buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        download(url, id);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const onViewRef = React.useRef(viewableItems => {
    console.log('========>', viewableItems.changed[0].index);
    setCommentCount(0);
    setIndex(viewableItems.changed[0].index);
    setLike(false);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  const _seprator = () => {
    return (
      <View
        style={{
          width: widthPercentageToDP(80),
          height: widthPercentageToDP(0.1),
          backgroundColor: '#000',
          alignSelf: 'center',
        }}
      />
    );
  };
  const getCommentApi = async () => {
    setLoading(true);
    const result = await getTiktokComment(itemId);
    await setLoading(false);
    await setIsFetching(false);
    await setChatData(result);
    await setCommentCount(result.length);
  };
  const addCommentApi = async () => {
    setLoading(true);
    const result = await postTiktokComment(
      login.data.id,
      itemId,
      myComment,
      login.data.photo
        ? 'https://neoestudio.net/public/userImage/' + login.data.photo
        : 'https://neoestudio.net/gamification/1643410651.png',
    );
    await setLoading(false);
    if (result.status == 201) {
      setMycomment('');
      getCommentApi();
    }
  };
  const deleteCommentApi = async id => {
    setLoading(true);
    const result = await deleteTiktokComment(id, itemId);
    await setLoading(false);
    if (result.status == 200) {
      getCommentApi();
    }
  };
  const editCommentApi = async (comment, id) => {
    setLoading(true);
    const result = await editTiktokComment(comment, id, itemId);
    await setLoading(false);
    if (result.status == 200) {
      setUpdate(false);
      setMycomment('');
      getCommentApi();
    }
  };
  const onRefresh = () => {
    setIsFetching(isFetch => !isFetch);
    getCommentApi();
  };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      {paused && (
        <FontAwesomeIcon
          style={{
            zIndex: 999,
            opacity: 0.8,
            position: 'absolute',
            alignSelf: 'center',
            top: '40%',
            bottom: '40%',
            left: '40%',
            right: '40%',
          }}
          icon={faPlay}
          size={100}
          color="#E5E5E5"
        />
      )}
      <ArrowLeft>
        <ArrowIcon onPress={() => props.navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={35} color="#FFF" />
        </ArrowIcon>
      </ArrowLeft>
      <NewsByFollowing>
        <NewsByFollowingText>
          {''}
          {/* <NewsByFollowingTextBold>
                        For You
                    </NewsByFollowingTextBold> */}
        </NewsByFollowingText>
      </NewsByFollowing>
      <FlatList
        pagingEnabled={true}
        data={result}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => 'unique' + index}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flex: 1,
                height: Dimensions.get('window').height,
                backgroundColor: '#010101',
              }}>
              <Video
                ref={videoPlayer}
                style={styles.backgroundVideo}
                source={{uri: 'https://neoestudio.net/' + item.file}}
                resizeMode="contain"
                onLoad={() => setLoading(false)}
                onBuffer={({isBuffering}) =>
                  isBuffering ? setLoading(true) : setLoading(false)
                }
                onLoadStart={() => setLoading(true)}
                // onTouchStart={() => {
                //     if (activeIndex == index) {
                //         if (paused) {
                //             setPaused(false)
                //         } else {
                //             setPaused(true)
                //         }
                //     }
                // }}
                paused={activeIndex == index ? false : true}
                onError={error => {
                  setLoading(false);
                  Alert.alert(
                    'Error de video',
                    'Hay un problema en un video. Vuelve a intentarlo más tarde.',
                  );
                  //console.log(error)
                }}
                shouldPlay
                rate={1.0}
                bufferConfig={{
                  minBufferMs: 15000,
                  maxBufferMs: 50000,
                  bufferForPlaybackMs: 2500,
                  bufferForPlaybackAfterRebufferMs: 5000,
                }}
                selectedVideoTrack={{
                  type: 'auto',
                  //value:
                }}
                minLoadRetryCount={5}
                maxBitRate={2000000}
                ignoreSilentSwitch="ignore"
                repeat
              />
              <ContentRight>
                <ContentRightHeart
                  onPress={() => {
                    if (activeIndex == index) {
                      if (!isLike) {
                        disptach(tiktokLikeCount(login.data.id, item.id, 1));
                      } else {
                        disptach(tiktokLikeCount(login.data.id, item.id, 0));
                      }
                      setLike(isliked => !isliked);
                    }
                  }}>
                  <FontAwesomeIcon
                    icon={faHeart}
                    size={25}
                    color={activeIndex == index && !isLike ? '#ffffff' : 'red'}
                  />
                  <ContentRightText>
                    {activeIndex == index && !isLike
                      ? item.likeCount
                      : parseInt(item.likeCount) + 1}
                  </ContentRightText>
                </ContentRightHeart>
                <ContentRightComment
                  onPress={() => {
                    if (activeIndex == index) {
                      setItemId(item.id);
                      setCommentpop(true);
                    }
                  }}>
                  <FontAwesomeIcon
                    icon={faCommentDots}
                    size={25}
                    color="#FFF"
                  />
                  <ContentRightText>
                    {activeIndex == index && commentCount !== 0
                      ? commentCount
                      : parseInt(item.commentCount)}
                  </ContentRightText>
                </ContentRightComment>
                {item?.IsDownloadable === 'True' && (
                  <ContentRightWhatsApp
                    onPress={() => {
                      if (activeIndex == index) {
                        if (Platform.OS === 'android') {
                          requestPermission(
                            'https://neoestudio.net/' + item.file,
                            item.id,
                          );
                        } else {
                          iosDownload(
                            'https://neoestudio.net/' + item.file,
                            item.id,
                          );
                        }
                      }
                    }}>
                    <FontAwesomeIcon icon={faDownload} size={25} color="#FFF" />
                    <ContentRightText>
                      {activeIndex == index &&
                        parseInt(item.downloadCount) + downloadCount}
                    </ContentRightText>
                  </ContentRightWhatsApp>
                )}
                {item?.IsShareable === 'True' && (
                  <ContentRightShare
                    onPress={() => {
                      if (activeIndex == index) {
                        convertVideoToBase64(
                          item.id,
                          'https://neoestudio.net/' + item.file,
                          item.title,
                        );
                      }
                    }}>
                    <FontAwesomeIcon icon={faShare} size={25} color="#FFF" />
                    <ContentRightText>
                      {activeIndex == index &&
                        parseInt(item.shareCount) + shareCount}
                    </ContentRightText>
                  </ContentRightShare>
                )}
              </ContentRight>
              <ContentLeftBottom>
                <ContentLeftBottomNameUser
                  onPress={() => {
                    // navigation.navigate("User", {
                    //     user: {
                    //         image: video.user.image,
                    //         name: video.user.name,
                    //         following: video.user.following,
                    //         followers: video.user.followers,
                    //         likes: video.user.likes
                    //     }
                    // })
                  }}>
                  {/* <ContentLeftBottomNameUserText
                                        numberOfLines={1}>
                                        {item.title}
                                    </ContentLeftBottomNameUserText> */}
                </ContentLeftBottomNameUser>
              </ContentLeftBottom>
            </View>
          );
        }}
      />
      {isLoading && (
        <ActivityIndicator
          size={'large'}
          color="green"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
      {iscomment && (
        <Modal
          transparent={true}
          visible={iscomment}
          onRequestClose={() => console.log('close')}
          supportedOrientations={['portrait', 'landscape']}
          animationType="slide">
          <View style={mainStyles.container}>
            <View style={mainStyles.innerMainView}>
              <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={mainStyles.topHeader}>
                  <Icon
                    name="close"
                    color="#000"
                    size={25}
                    style={{position: 'absolute', right: '3%'}}
                    onPress={() => {
                      setCommentpop(false);
                    }}
                  />
                </View>
                <View style={mainStyles.flatlistView}>
                  {chatData.length ? (
                    <FlatList
                      data={chatData}
                      keyExtractor={(item, index) => 'unique' + index}
                      showsVerticalScrollIndicator={false}
                      ItemSeparatorComponent={_seprator}
                      onRefresh={() => onRefresh()}
                      refreshing={isFetching}
                      renderItem={({item, index}) => {
                        return (
                          <Item
                            date={item.created_at}
                            name={item.studentName}
                            image={item.ImgPath}
                            isShow={
                              item.studentId == login.data.id ? true : false
                            }
                            comment={item.comments}
                            editHandler={() => {
                              inputref?.current.focus(),
                                setMycomment(item.comments),
                                setUpdate(true),
                                setCommentId(item.id);
                            }}
                            isReport={
                              item.studentId == login.data.id ? false : true
                            }
                            resportHandler={() => {
                              Alert.alert(
                                'Reportar usuario',
                                `¿Seguro que quieres denunciar a este usuario?`,
                                [
                                  {
                                    text: 'no',
                                    onPress: () =>
                                      console.log('Cancel Pressed'),
                                    style: 'cancel',
                                  },
                                  {
                                    text: 'Sí',
                                    onPress: () =>
                                      Alert.alert(
                                        '',
                                        'Solicitud Enviar con éxito',
                                      ),
                                  },
                                ],
                                {cancelable: false},
                              );
                            }}
                            deleteHandler={() => {
                              deleteCommentApi(item.id);
                            }}
                          />
                        );
                      }}
                    />
                  ) : (
                    <View />
                  )}
                </View>
                <View style={mainStyles.bottomView}>
                  <Input
                    ref={inputref}
                    placeholder="Añadir comentario"
                    placeholderTextColor="#000"
                    containerStyle={mainStyles.containerStyle}
                    inputStyle={mainStyles.inputStyle}
                    inputContainerStyle={mainStyles.inputContainerStyle}
                    multiline={true}
                    value={myComment}
                    onChangeText={text => setMycomment(text)}
                    rightIcon={
                      <MaterialCommunityIcons
                        name="send"
                        color="#000"
                        size={25}
                        onPress={() => {
                          if (isupdate) {
                            editCommentApi(myComment, commentId);
                          } else {
                            addCommentApi();
                          }
                        }}
                      />
                    }
                  />
                </View>
              </KeyboardAwareScrollView>
            </View>
            {isLoading && (
              <ActivityIndicator
                size={'large'}
                color="green"
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Home;
