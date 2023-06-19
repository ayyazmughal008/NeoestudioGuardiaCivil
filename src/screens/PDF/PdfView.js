import React, {useEffect} from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  AppState,
} from 'react-native';
import PDF from 'react-native-pdf';
import {connect} from 'react-redux';
import {pdfState} from '../../Redux/action';
import Orientation from 'react-native-orientation-locker';
import {styles} from './styles';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from '../../Component/MakeMeResponsive';

class PdfView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setOrientation: 'PORTRAIT',
    };
  }
  _handleAppStateChange = nextAppState => {
    const {login} = this.props.user;
    this.setState({appState: nextAppState}, () => {
      if (nextAppState === 'background') {
        this.props.pdfState(login.data.id, 'end');
      }
    });
  };

  handleBackButton = () => {
    const {login} = this.props.user;
    this.props.pdfState(login.data.id, 'end');
    Orientation.unlockAllOrientations();
    return false;
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this._handleAppStateChange,
    );
    StatusBar.setHidden(true);
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToLandscape();
      }
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.appStateSubscription.remove();
  }
  render() {
    const url = this.props.navigation.getParam('url', 'dkkbb');
    var res = encodeURI(url);
    const {AuthLoading, login} = this.props.user;
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View
          style={{
            margin: heightPercentageToDP(1),
            width: '98%',
            height: '98%',
            // flex: 1,
            // marginLeft: widthPercentageToDP(2),
            // marginTop: widthPercentageToDP(2),
            // marginRight: widthPercentageToDP(2),
            // marginBottom: widthPercentageToDP(2),
            // alignItems:"center",
            // justifyContent:"center"
          }}>
          <PDF
            trustAllCerts={false}
            source={{uri: res}}
            onLoadComplete={(numberOfPages, filePath) => {
              this.props.pdfState(login.data.id, 'start');
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link presse: ${uri}`);
            }}
            style={{
              width: '98%',
              height: '98%',
              //backgroundColor: "red"
              // width: widthPercentageToDP(98)
              // position: "absolute",
              // top: 0,
              // right: 0,
              // bottom: 0,
              // alignItems: 'center',
              // justifyContent: 'center'
              // width: heightPercentageToDP(95),
              // height: widthPercentageToDP(98)
            }}
            horizontal={true}
          />
        </View>
        {/* {AuthLoading &&
                    <ActivityIndicator
                        size="large"
                        color="#000"
                        style={styles.loading}
                    />
                } */}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  pdfState,
})(PdfView);

// import React, { useEffect, useState } from 'react'
// import { View, StatusBar, Dimensions } from 'react-native'
// import PDF from 'react-native-pdf'
// import { useDeviceOrientation } from '@react-native-community/hooks'
// //import Orientation from 'react-native-orientation';
// import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'

// const PdfView = (props) => {
//     const url = props.navigation.getParam('url', "dkkbb")
//     //const { width, height } = Dimensions.get("window");
//     const { width, setWidth } = useState(0)
//     const { height, setHeight } = useState(0)
//     const [myOrientation, setOrientation] = useState('PORTRAIT')
//     const orientation = useDeviceOrientation()

//     useEffect(() => {
//         //console.log("my width and heigth", width, height)
//         StatusBar.setHidden(true)
//         Dimensions.addEventListener('change', ({ window: { width, height } }) => {
//             if (width < height) {
//                 setOrientation("PORTRAIT")
//             } else {
//                 setOrientation("LANDSCAPE")
//             }
//         })
//     }, [width, height])

//     const _onLayout = (e) => {
//         console.log("************", e.nativeEvent.layout.height)
//         let width = e.nativeEvent.layout.width
//         let height = e.nativeEvent.layout.height
//         //setWidth(width)
//         //setHeight(height)
//         // this.setState({
//         //     height: height,
//         //     width: width
//         // })
//     }

//     return (
//         <View style={{ flex: 1, alignItems: "center" }}>
//             <View style={{
//                 marginTop: heightPercentageToDP(1),
//                 width: width - 10,
//                 height: height - 20,
//             }}
//                 onLayout={(e) => { _onLayout(e); }}
//             >
//                 <PDF
//                     source={{ uri: url }}
//                     onLoadComplete={(numberOfPages, filePath) => {
//                         console.log(`number of pages: ${numberOfPages}`);
//                     }}
//                     onPageChanged={(page, numberOfPages) => {
//                         console.log(`current page: ${page}`);
//                     }}
//                     onError={(error) => {
//                         console.log(error);
//                     }}
//                     onPressLink={(uri) => {
//                         console.log(`Link presse: ${uri}`)
//                     }}
//                     style={{
//                         flex: 1,
//                         // width: widthPercentageToDP(98)
//                     }}
//                     horizontal={myOrientation === "PORTRAIT" ? false : true}
//                 />
//             </View>
//         </View>
//     )
// }

// export default PdfView;
