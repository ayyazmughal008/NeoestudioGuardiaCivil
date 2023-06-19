import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getSurveyListQuestions,
  clearStates,
  submitSurvey,
} from '../../Redux/action';
import {styles} from './styles';
import FastImage from 'react-native-fast-image';
import Header from '../../Component/Header';
import SurveyItems from './SurveyItem';
import {data} from './data';
import Orientation from 'react-native-orientation-locker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class SurveyQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testArray: [],
    };

    this.getData();
  }

  getData = () => {
    const {login} = this.props.user;
    const id = this.props.navigation.getParam('id', '1');
    console.log('survey_id', id);
    this.props.getSurveyListQuestions(id, false, login.data.id);
  };

  componentDidMount() {
    this.updateArray();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      const locked = Orientation.isLocked();
      if (!locked) {
        Orientation.lockToPortrait();
      }
    });
  }

  updateArray = () => {
    const {surveyQuestion} = this.props.user;
    this.setState({testArray: surveyQuestion.data});
  };

  changeArray = (position, value) => {
    const {surveyQuestion} = this.props.user;
    const newArray = [...surveyQuestion.data];
    newArray[position].value = value;
    this.setState({testArray: newArray});
  };

  changeTextArray = (text, position) => {
    const {surveyQuestion} = this.props.user;
    const newArray = [...surveyQuestion.data];
    newArray[position].answer = text;
    this.setState({testArray: newArray});
  };

  makeCustomArray = () => {
    const id = this.props.navigation.getParam('id', '1');
    const {testArray} = this.state;
    const {login} = this.props.user;
    const tempArray = [];
    for (var i = 0; i < testArray.length; i++) {
      tempArray.push({
        id: testArray[i].id,
        answer: testArray[i].answer,
        value: testArray[i].value,
      });
    }
    const myArray = {
      surveyId: id,
      studentId: login.data.id,
      data: tempArray,
    };
    console.log(myArray);
    this.props.submitSurvey(myArray);
  };

  render() {
    const {AuthLoading, surveyQuestion} = this.props.user;
    const {testArray} = this.state;
    //console.log(testArray)
    return (
      <FastImage
        style={styles.container}
        source={require('../Exames/assets/back3.png')}
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
        />
        <View style={styles.topView}>
          <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
            <Text style={styles.title}>{surveyQuestion.title}</Text>
            <View style={styles.surveyView}>
              {!testArray.length ? (
                <View />
              ) : (
                testArray.map((item, index) => {
                  return (
                    <SurveyItems
                      key={'unique' + index}
                      isRating={item.star === 'si' ? true : false}
                      isComment={item.description === 'si' ? true : false}
                      question={item.question}
                      value={item.value}
                      onChangeTextHandler={text =>
                        this.changeTextArray(text, index)
                      }
                      networkText={item.answer === 'empty' ? '' : item.answer}
                      clickHandler1={() => this.changeArray(index, 1)}
                      clickHandler2={() => this.changeArray(index, 2)}
                      clickHandler3={() => this.changeArray(index, 3)}
                      clickHandler4={() => this.changeArray(index, 4)}
                      clickHandler5={() => this.changeArray(index, 5)}
                    />
                  );
                })
              )}
            </View>
            <TouchableOpacity
              style={styles.bottomBtn}
              onPress={() => this.makeCustomArray()}>
              <FastImage
                style={styles.btnBackground}
                source={require('../../Images/Guardar.png')}
                resizeMode={FastImage.resizeMode.contain}></FastImage>
            </TouchableOpacity>
            {/* <View style={styles.dummyView} /> */}
          </KeyboardAwareScrollView>
        </View>
        {/* <View style={styles.bottomView}>

                    </View> */}
        {AuthLoading && (
          <ActivityIndicator size="large" color="#000" style={styles.loading} />
        )}
      </FastImage>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  getSurveyListQuestions,
  clearStates,
  submitSurvey,
})(SurveyQuestion);
