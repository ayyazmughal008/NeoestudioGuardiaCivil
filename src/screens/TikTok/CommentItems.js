import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Component/MakeMeResponsive';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { fonts } from '../../utils';

const Items = props => {
  return (
    <View style={styles.container}>
      <FastImage
        source={{uri: props.image}}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.profileImage}
      />
      <View style={styles.commentView}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.comment}>{props.comment}</Text>
      </View>
      {props.isShow && (
        <View style={styles.endView}>
          <Feather
            name="edit"
            color="#000"
            size={15}
            //style={{ position: "absolute", top: "0%", zIndex: 3 }}
            onPress={props.editHandler}
          />
          <AntDesign
            name="delete"
            color="#000"
            size={15}
            //style={{ position: "absolute", bottom: "0%", zIndex: 3 }}
            onPress={props.deleteHandler}
          />
        </View>
      )}
      {props.isReport && (
        <View style={styles.endView}>
          <MaterialIcons
            name="report-problem"
            color="#000"
            size={15}
            //style={{ position: "absolute", bottom: "0%", zIndex: 3 }}
            onPress={props.resportHandler}
          />
        </View>
      )}
      {/* <Text style={styles.time}>
                {moment(props.date).format('MM/DD/YYYY')}
            </Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: widthPercentageToDP(90),
    flex: 0,
    flexDirection: 'row',
    //alignItems: "center",
    alignSelf: 'center',
    marginTop: heightPercentageToDP(1),
    marginBottom: heightPercentageToDP(1),
  },
  profileImage: {
    width: widthPercentageToDP(10),
    height: widthPercentageToDP(10),
    //borderRadius: widthPercentageToDP(4)
    borderRadius: widthPercentageToDP(10) / 2,
  },
  commentView: {
    width: widthPercentageToDP(68),
    flex: 0,
  },
  name: {
    paddingLeft: widthPercentageToDP(2),
    fontSize: widthPercentageToDP(4),
    fontFamily: fonts.novaBold,
    color: '#000',
  },
  comment: {
    paddingTop: heightPercentageToDP(0.5),
    fontSize: widthPercentageToDP(4),
    fontFamily: fonts.novaRegular,
    color: '#000',
    flexGrow: 1,
    flexShrink: 1,
    paddingLeft: widthPercentageToDP(2),
  },
  endView: {
    width: widthPercentageToDP(13),
    //backgroundColor:"red",
    //alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: widthPercentageToDP(3.5),
    fontFamily: fonts.novaBold,
    color: '#000',
    position: 'absolute',
    bottom: '0%',
    right: '2%',
  },
});

export default Items;
