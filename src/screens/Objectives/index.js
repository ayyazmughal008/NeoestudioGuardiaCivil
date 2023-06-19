import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getEstudioTemario,
  getRepasoTemario,
  getObjectiveStates,
  getObjectiveRanking,
} from '../../Redux/action';
import FastImage from 'react-native-fast-image';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/dist/Feather';
import Ranking from '../../Component/Ranking';
import Orientation from 'react-native-orientation-locker';
import Icon2 from 'react-native-vector-icons/dist/AntDesign';
import Header from '../../Component/Header';

class Objectives extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
    this.getData();
  }
  handleModalOpen = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };
  getData = () => {
    const {login} = this.props.user;
    this.props.getObjectiveStates(login.data.id);
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
    const {objectiveRanking, login, AuthLoading, objectiveState} =
      this.props.user;
    //console.log("my objective", objectiveRanking)
    return (
      <FastImage
        style={styles.container}
        source={require('../../Images/bg.png')}
        resizeMode={FastImage.resizeMode.stretch}>
        <View style={styles.headerView}>
          <TouchableOpacity
            onPress={() => this.handleModalOpen()}
            style={styles.menu}>
            <Icon name="menu" color="#000" size={30} />
          </TouchableOpacity>
          <FastImage
            source={
              Platform.OS === 'android'
                ? require('../../Images/veoestudio.png')
                : require('../../Images/ios_logo.png')
            }
            style={styles.logo}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <Text style={styles.screenTitle}>{'Objetivos'}</Text>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.rankView}>
              <Ranking
                subject={'Objeivo mín. diario'}
                getPoints={objectiveState.ti}
                totalPoints={objectiveState.tTotal + ' h'}
                minLength={Math.round(objectiveState.percentage2)}
                maxLength={100 - Math.round(objectiveState.percentage2)}
                obtainPercentage={objectiveState.percentage}
                drawer={false}
              />
            </View>
            <Text style={styles.courseName}>{'Conocimientos'}</Text>
            <View style={styles.mainView}>
              <View style={styles.itemTimeView}>
                <Text style={styles.itemText}>{'Estudio temario'}</Text>
                <Text style={styles.itemMin}>
                  {objectiveState.data[0].Estudio_temario === 0
                    ? '0'
                    : objectiveState.data[0].Estudio_temario}
                  {' min'}
                </Text>
              </View>
              <View style={styles.counterView}>
                <TouchableOpacity
                  disabled={
                    objectiveState.data[0].Estudio_temario === 0 ? true : false
                  }
                  onPress={() =>
                    this.props.getEstudioTemario(login.data.id, 'minus')
                  }>
                  <FastImage
                    source={require('../../Images/minus.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.plusMinus}
                  />
                </TouchableOpacity>
                <Text style={styles.counterText}>
                  {parseInt(objectiveState.data[0].Estudio_temario) / 30}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.getEstudioTemario(login.data.id, 'plus')
                  }>
                  <FastImage
                    source={require('../../Images/plus.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.plusMinus}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.mainView}>
              <View style={styles.itemTimeView}>
                <Text style={styles.itemText}>{'Repaso temario'}</Text>
                <Text style={styles.itemMin}>
                  {objectiveState.data[0].Repaso_temario === 0
                    ? '0'
                    : objectiveState.data[0].Repaso_temario}
                  {' min'}
                </Text>
              </View>
              <View style={styles.counterView}>
                <TouchableOpacity
                  disabled={
                    objectiveState.data[0].Repaso_temario === 0 ? true : false
                  }
                  onPress={() =>
                    this.props.getRepasoTemario(login.data.id, 'minus')
                  }>
                  <FastImage
                    source={require('../../Images/minus.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.plusMinus}
                  />
                </TouchableOpacity>
                <Text style={styles.counterText}>
                  {parseInt(objectiveState.data[0].Repaso_temario) / 10}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.getRepasoTemario(login.data.id, 'plus')
                  }>
                  <FastImage
                    source={require('../../Images/plus.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.plusMinus}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                styles.mainView,
                {
                  marginTop: 6,
                },
              ]}>
              <View style={styles.itemTimeView}>
                <Text style={styles.itemText}>{'Audiolibro'}</Text>
                <Text style={styles.itemMin}>
                  {objectiveState.data[0].Audiolibro} {' min'}
                </Text>
              </View>
            </View>
            <View style={styles.mainView}>
              <View style={styles.itemTimeView}>
                <Text style={styles.itemText}>{'Clases'}</Text>
                <Text style={styles.itemMin}>
                  {objectiveState.data[0].clases}
                  {' min'}
                </Text>
              </View>
            </View>
            <View style={styles.mainView}>
              <View style={styles.itemTimeView}>
                <Text style={styles.itemText}>{'Examen y repaso'}</Text>
                <Text style={styles.itemMin}>
                  {objectiveState.data[0].Examen_y_repaso}
                  {' min'}
                </Text>
              </View>
            </View>
            <Text style={styles.courseName}>{'Inglés'}</Text>
            <View style={styles.mainView}>
              <View style={styles.itemTimeView}>
                <Text style={styles.itemText}>{'Examen y repaso'}</Text>
                <Text style={styles.itemMin}>
                  {objectiveState.data[1].Examen_y_repaso}
                  {' min'}
                </Text>
              </View>
            </View>
            <Text style={styles.courseName}>{'Psicotécnicos'}</Text>
            <View style={styles.mainView}>
              <View style={styles.itemTimeView}>
                <Text style={styles.itemText}>{'Examen y repaso'}</Text>
                <Text style={styles.itemMin}>
                  {objectiveState.data[2].Examen_y_repaso}
                  {' min'}
                </Text>
              </View>
            </View>
            <Text style={styles.courseName}>{'Ortografía'}</Text>
            <View style={styles.mainView}>
              <View style={styles.itemTimeView}>
                <Text style={styles.itemText}>{'Examen y repaso'}</Text>
                <Text style={styles.itemMin}>
                  {objectiveState.data[3].Examen_y_repaso}
                  {' min'}
                </Text>
              </View>
            </View>
            {/* ===================== */}
          </ScrollView>
        </View>
        {AuthLoading && (
          <ActivityIndicator
            size="large"
            color="black"
            style={styles.loading}
          />
        )}

        {this.state.modalVisible && (
          <Modal
            transparent={true}
            visible={this.state.modalVisible}
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={() => {
              console.log('alert close');
            }}>
            <View style={styles.modalMain}>
              <View style={styles.innerModal}>
                <FastImage
                  source={require('../../Images/navigationSlider.png')}
                  resizeMode={FastImage.resizeMode.stretch}
                  style={styles.navigation}>
                  <View style={styles.topModal}>
                    <Text style={styles.topTitle}>
                      {!objectiveRanking.username
                        ? login.data.email
                        : objectiveRanking.username}
                    </Text>
                    <View style={styles.navigationHeader}>
                      <TouchableOpacity
                        //style = {styles.}
                        onPress={() =>
                          this.props.getObjectiveRanking(
                            login.data.id,
                            login.data.type,
                          )
                        }>
                        <FastImage
                          style={styles.loaderStyle}
                          resizeMode={FastImage.resizeMode.contain}
                          source={require('../../Images/loader.png')}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        //style = {styles.}
                        onPress={() => this.handleModalOpen()}>
                        <Icon2 name="close" color="#ffff" size={30} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.modalTitle}>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                      }}>
                      <View style={styles.modalTileView}>
                        <Text style={styles.ModalTitleText}>{'Usuario:'}</Text>
                        <Text style={styles.ModalTitleText}>{'Baremo:'}</Text>
                        <Text style={styles.ModalTitleText}>
                          {'Nº alumnos ranking:'}
                        </Text>
                      </View>
                      <View style={styles.modalTitleDetail}>
                        <Text style={styles.ModalTitleText3}>
                          {login.data.studentCode}
                        </Text>
                        <Text style={styles.ModalTitleText3}>
                          {login.data.baremo}
                        </Text>
                        <Text style={styles.ModalTitleText3}>
                          {objectiveRanking.numberOfStudents}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.pragsonTitle}>
                    {'Progresión de objetivos'}
                  </Text>
                  <Ranking
                    subject={'Objetivo mín. semanal'}
                    //subject={"Rank. Tema 1 - Derecho penal con baremo"}
                    getPoints={objectiveRanking.studentWeeklyTime}
                    totalPoints={'18 h'}
                    minLength={objectiveRanking.studentWeeklyPercentage}
                    maxLength={100 - objectiveRanking.studentWeeklyPercentage}
                    obtainPercentage={objectiveRanking.studentWeeklyPercentage}
                    drawer={true}
                  />
                  <Ranking
                    subject={'Objetivo mín. curso'}
                    //subject={"Rank. Tema 1 - Derecho penal con baremo"}
                    getPoints={objectiveRanking.studentYearlyTime}
                    totalPoints={'700 h'}
                    minLength={objectiveRanking.studentYearlyPercentage}
                    maxLength={100 - objectiveRanking.studentYearlyPercentage}
                    obtainPercentage={objectiveRanking.studentYearlyPercentage}
                    drawer={true}
                  />
                  <Text style={styles.yearlyTitle}>
                    {'Ranking de objetivos'}
                  </Text>
                  <Ranking
                    subject={'Ranking obj. mín. semanal'}
                    //subject={"Rank. Tema 1 - Derecho penal con baremo"}
                    getPoints={objectiveRanking.studentWeeklyTime}
                    totalPoints={'18 h'}
                    minLength={objectiveRanking.weeklyRankPercentage}
                    maxLength={100 - objectiveRanking.weeklyRankPercentage}
                    obtainPercentage={objectiveRanking.weeklyRankPercentage}
                    drawer={true}
                  />
                  <Ranking
                    subject={'Ranking obj. mín. curso'}
                    //subject={"Rank. Tema 1 - Derecho penal con baremo"}
                    getPoints={objectiveRanking.studentYearlyTime}
                    totalPoints={'700 h'}
                    minLength={objectiveRanking.yearlyRankPercentage}
                    maxLength={100 - objectiveRanking.yearlyRankPercentage}
                    obtainPercentage={objectiveRanking.yearlyRankPercentage}
                    drawer={true}
                  />
                </FastImage>
              </View>
            </View>
            {AuthLoading && (
              <ActivityIndicator
                size="large"
                color="#000"
                style={styles.loading}
              />
            )}
          </Modal>
        )}
      </FastImage>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, {
  getEstudioTemario,
  getRepasoTemario,
  getObjectiveStates,
  getObjectiveRanking,
})(Objectives);
