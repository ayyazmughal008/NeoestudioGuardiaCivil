import React from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getSurveyList,
  getSurveyListQuestions,
  dispatchFunc,
} from '../../Redux/action';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Header from '../../Component/Header';
import Directory from '../../Component/Directory';
import Orientation from 'react-native-orientation-locker';
import DialogBox from '../../Component/DailogBox';

class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getData();
  }

  getData = () => {
    const {login} = this.props.user;
    this.props.getSurveyList(login.data.type, login.data.id);
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }

  render() {
    const {surveyItems, AuthLoading, login} = this.props.user;
    const {isDialogOpen, errorMessage} = this.props.dialog;
    return (
      <FastImage
        style={styles.container}
        source={require('../../Images/bg.png')}
        resizeMode={FastImage.resizeMode.stretch}>
        <FastImage
          style={styles.logo}
          source={
            Platform.OS === 'android'
              ? require('../../Images/veoestudio.png')
              : require('../../Images/ios_logo.png')
          }
          resizeMode={FastImage.resizeMode.contain}
        />
        <Header
          iconName="left"
          leftClick={() => this.props.navigation.goBack()}
          title={'Encuestas'}
        />
        <View style={styles.directoryView}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {!surveyItems ? (
              <View />
            ) : (
              surveyItems.data.map((item, index) => {
                return (
                  <Directory
                    key={'unique' + index}
                    img={require('../../Images/personality2.png')}
                    title={item.name}
                    isActive={item.isActive}
                    status="Habilitado"
                    clickHandler={() => (
                      Orientation.unlockAllOrientations(),
                      this.props.getSurveyListQuestions(
                        item.id,
                        true,
                        login.data.id,
                      )
                    )}
                  />
                );
              })
            )}
          </ScrollView>
        </View>
        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
        {/* {isDialogOpen &&
                    <DialogBox
                        errorMessage={errorMessage}
                        clickHandler={() => { this.props.dispatchFunc() }}
                    />
                } */}
      </FastImage>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  dialog: state.dialog,
});
export default connect(mapStateToProps, {
  getSurveyList,
  getSurveyListQuestions,
  dispatchFunc,
})(Survey);
