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
import {View, BackHandler, ActivityIndicator, Platform,StyleSheet, TouchableOpacity,Text, Alert, Image} from 'react-native';
import {connect} from 'react-redux';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Orientation from 'react-native-orientation-locker';
import {Agenda, DateData, AgendaEntry, AgendaSchedule} from 'react-native-calendars';
import testIDs from './testIDs';
import {nextDay} from './data'
import Webview from 'react-native-webview';
import Header from '../../Component/Header';
const URL = 'https://webversion.neoestudio.net/calendario?id=';

interface State {
  items?: AgendaSchedule;
}

class Calender extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }
  state: State = {
    items: undefined
  };

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
    const {items} = this.state
    console.log(items);
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
        <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={'2017-05-16'}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        // renderDay={this.renderDay}
        // hideExtraDays={false}
        // showOnlySelectedDayItems
        // reservationsKeyExtractor={this.reservationsKeyExtractor}
      />
        {/* <Webview
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
          scrollEnabled={false}></Webview> */}
      </View>
    );
  }


  loadItems = (day: DateData) => {
    const items = this.state.items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];
          
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }
      
      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  };

  renderDay = (day) => {
    if (day) {
      return <Text style={stylesNew.customDay}>{day.getDay()}</Text>;
    }
    return <View style={stylesNew.dayItem}/>;
  };

  renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[stylesNew.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{fontSize, color}}>{reservation.name}</Text>
        <Image
          source={require('../../Images/veoestudio2.png')}
          resizeMode= 'contain'
          style={{
            width: '40%',
            height: '40%'
          }}
        />
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={stylesNew.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const stylesNew = StyleSheet.create({
item: {
  backgroundColor: 'white',
  flex: 1,
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  marginTop: 17
},
emptyDate: {
  height: 15,
  flex: 1,
  paddingTop: 30
},
customDay: {
  margin: 10,
  fontSize: 24,
  color: 'green'
},
dayItem: {
  marginLeft: 34
}
});

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps)(Calender);
