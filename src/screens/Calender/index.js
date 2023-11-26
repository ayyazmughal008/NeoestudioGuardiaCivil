// import React from 'react';
// import {
//   Alert,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   ActivityIndicator,
//   Platform,
// } from 'react-native';
// import {connect} from 'react-redux';
// import {getCalendarDates} from '../../Redux/action';
// import {styles} from './styles';
// import FastImage from 'react-native-fast-image';
// import Header from '../../Component/Header';
// import {LocaleConfig, CalendarList} from 'react-native-calendars';
// import Dialog from './Dialog';
// import Orientation from 'react-native-orientation-locker';
// import {widthPercentageToDP} from '../../Component/MakeMeResponsive';
// const testIDs = require('./testIDs');
// import {fonts} from '../../utils';

// LocaleConfig.locales['fr'] = {
//   monthNames: [
//     'Enero',
//     'Febrero',
//     'Marzo',
//     'Abril',
//     'Mayo',
//     'Junio',
//     'Julio',
//     'Agosto',
//     'Septiembre',
//     'Octubre',
//     'Noviembre',
//     'Diciembre',
//   ],
//   monthNamesShort: [
//     'Ene.',
//     'Feb.',
//     'Mar',
//     'Abr',
//     'May',
//     'Jun',
//     'Jul',
//     'Ago',
//     'Sept',
//     'Oct',
//     'Nov.',
//     'Dici',
//   ],
//   dayNames: [
//     'lunes ',
//     'martes ',
//     'miércoles ',
//     'Mercredi',
//     'Jeudi',
//     'Vendredi',
//     'Samedi',
//   ],
//   dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
//   //dayNamesShort: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',],
//   today: "Aujourd'hui",
// };
// LocaleConfig.defaultLocale = 'fr';
// // https://webversion.neoestudio.net/calendario?id=4771

// class Calender extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       marked: null,
//       currentDate: '',
//       isOpen: false,
//       descr: '',
//     };
//     this.getData();
//   }

//   _onLayout = e => {
//     console.log(e.nativeEvent.layout.height);
//     let width = e.nativeEvent.layout.width;
//     let height = e.nativeEvent.layout.height;
//     this.setState({
//       height: height,
//       width: width,
//     });
//   };
//   componentDidMount() {
//     this.anotherFunc();
//     this.focusListener = this.props.navigation.addListener('didFocus', () => {
//       const locked = Orientation.isLocked();
//       if (!locked) {
//         Orientation.lockToPortrait();
//       }
//     });
//   }

//   getData = () => {
//     const {login} = this.props.user;
//     this.props.getCalendarDates(login.data.type);
//   };

//   anotherFunc = () => {
//     const {getCalender} = this.props.user;
//     let temObject = {};
//     getCalender.data.forEach((item, index) => {
//       temObject[item.date] = {
//         selected: true,
//         customStyles: {
//           container: {
//             backgroundColor: item.bgColor,
//             // opacity:0.9,
//             borderColor: item.color,
//             borderWidth: 2,
//           },
//           text: {
//             color: item.color,
//           },
//         },
//       };
//     });
//     this.setState({marked: temObject});
//   };

//   onDateClick = day => {
//     const {getCalender} = this.props.user;
//     for (var i = 0; i < getCalender.data.length; i++) {
//       if (day.dateString === getCalender.data[i].date) {
//         // alert(getCalender.data[i].description)
//         this.setState({descr: getCalender.data[i].description}, () => {
//           this.setState({isOpen: true});
//         });
//       }
//     }
//   };

//   render() {
//     const {AuthLoading, getCalender} = this.props.user;
//     //console.log(this.state.marked)
//     return (
//       <FastImage
//         source={require('../../Images/bg.png')}
//         resizeMode={FastImage.resizeMode.stretch}
//         style={styles.container}
//         onLayout={e => {
//           this._onLayout(e);
//         }}>
//         <FastImage
//           style={styles.logo}
//           source={
//             Platform.OS === 'android'
//               ? require('../../Images/veoestudio.png')
//               : require('../../Images/ios_logo.png')
//           }
//           resizeMode={FastImage.resizeMode.stretch}
//         />
//         <Header
//           iconName="left"
//           leftClick={() => this.props.navigation.goBack()}
//           title={'Calendario'}
//         />
//         <View style={styles.directoryView}>
//           <CalendarList
//             // Date marking style [simple/period/multi-dot/single]. Default = 'simple'
//             markingType={'custom'}
//             firstDay={1}
//             showScrollIndicator={true}
//             onDayPress={day => this.onDateClick(day)}
//             markedDates={this.state.marked}
//             pastScrollRange={12}
//             futureScrollRange={12}
//             theme={{
//               calendarBackground: 'transparent',
//               dayTextColor: '#000',
//               textDayFontFamily: fonts.novaRegular,
//               monthTextColor: '#007EBA',
//               todayTextColor: 'red',
//               textDayHeaderFontSize: 14,
//               textMonthFontSize: 25,
//               textMonthFontFamily: fonts.novaBold,
//               textDayHeaderFontFamily: fonts.novaBold,
//             }}
//           />
//         </View>
//         {AuthLoading && (
//           <ActivityIndicator style={styles.loading} size="large" color="#000" />
//         )}
//         {this.state.isOpen && (
//           <Dialog
//             isDialogOpen={this.state.isOpen}
//             onClickMe={() => this.setState({isOpen: false})}
//             description={this.state.descr}
//           />
//         )}
//       </FastImage>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   user: state.user,
// });
// export default connect(mapStateToProps, {getCalendarDates})(Calender);

import React from 'react';
import {View, BackHandler, ActivityIndicator, Platform} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import Webview from 'react-native-webview';
import Header from '../../Component/Header';
const URL = 'https://webversion.neoestudio.net/calendario?id=';

class Calender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return Orientation.unlockAllOrientations(), false;
  }

  ActivityIndicatorLoadingView() {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator color="#009688" size="large" style={styles.loading} />
    );
  }

  render() {
    const scalesPageToFit = Platform.OS === 'android';
    const {login} = this.props.user;
    return (
      <View style={{flex: 1, backgroundColor:"white"}}>
        <FastImage
          style={styles.logo}
          source={
            Platform.OS === 'android'
              ? require('../../Images/veoestudio.png')
              : require('../../Images/ios_logo.png')
          }
          resizeMode={FastImage.resizeMode.stretch}
        />
        <Header
          iconName="left"
          leftClick={() => this.props.navigation.goBack()}
          title={'Calendario'}
        />
        <Webview
          style={styles.WebViewStyle}
          source={{
            uri: `${URL}` + login.data.id,
            //uri: 'http://95.179.208.227/acadmy/public/googleChart',
            //html: '<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">',
            // method: 'GET'
          }}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //View to show while loading the webpage
          renderLoading={this.ActivityIndicatorLoadingView}
          //Want to show the view or not
          startInLoadingState={true}
          scalesPageToFit={scalesPageToFit}
          bounces={false}
          scrollEnabled={false}></Webview>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(Calender);
