import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';
import { fonts } from '../../utils';

export const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    zIndex: 1000,
    width: '100%',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    right: '0%',
    top: Platform.OS === 'android' ? '0%' : '5%',
    width: widthPercentageToDP(80),
    height: heightPercentageToDP(9),
  },
  mainContainer:{
    flex: 1,
    width: widthPercentageToDP(90),
    marginTop: heightPercentageToDP(5),
    alignSelf:"center"
    //backgroundColor:'red'
  },
  mainTitle:{
    fontSize: widthPercentageToDP(6),
    color:'#000',
    fontFamily: fonts.novaBold,
    textAlign:'center'
  },
  rowView:{
    marginTop: heightPercentageToDP(4),
    width: widthPercentageToDP(90),
    height: heightPercentageToDP(7),
    //alignSelf:"center",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between"
    //backgroundColor:"red"
  },
  itemTitle:{
    fontSize: widthPercentageToDP(4.5),
    color:'#000',
    fontFamily: fonts.novaBold,
  },
  btn:{
    width: widthPercentageToDP(30),
    height: widthPercentageToDP(10)
  },
  imgBtn:{
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    height:"100%"
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
});
