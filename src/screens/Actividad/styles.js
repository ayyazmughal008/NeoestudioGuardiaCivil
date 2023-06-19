import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import { fonts } from '../../utils';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    right: '0%',
    top: Platform.OS === 'android' ?'0%': '5%',
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(9),
    // width: widthPercentageToDP(40),
    // height: heightPercentageToDP(9),
  },
  directoryView: {
    flex: 1,
    width: widthPercentageToDP(100),
    //height:"100%",
    //alignItems: "center",
    marginTop: heightPercentageToDP(0),
    //backgroundColor: "yellow"
  },
  VideoView: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(75),
    alignItems: 'center',
    marginBottom: heightPercentageToDP(5),
    //backgroundColor: "red"
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  myContainer: {
    flex: 1,
    backgroundColor: '#000',
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vector: {
    width: widthPercentageToDP(7),
    height: widthPercentageToDP(7),
  },
  leftBtn: {
    position: 'absolute',
    bottom: '70%',
    left: '2%',
    zIndex: 3,
  },
  rightBtn: {
    position: 'absolute',
    bottom: '70%',
    right: '2%',
    zIndex: 3,
  },
  backTextWhite: {
    color: '#FFF',
  },
  // rowFrontContainer: {
  //     overflow: 'hidden',
  // },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
  //
  leftItem: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
  },
  headerTop: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(7),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? heightPercentageToDP(5) :0
    //backgroundColor: 'red',
  },
  headerText: {
    fontSize: widthPercentageToDP(5.5),
    fontFamily: fonts.novaBold,
    color: '#000',
    //marginLeft: widthPercentageToDP(2),
  },
  headerBtn: {
    marginLeft: widthPercentageToDP(2),
  },
});
