import {createStackNavigator} from 'react-navigation-stack';
import Home from '../../screens/Home';
import Login from '../../screens/Login';
import OTP from '../../screens/Login/OTP';
import AudioClass from '../../screens/AudioClass';
import AudioDetail from '../../screens/AudioClass/AudioDetail';
import VideoClass from '../../screens/VideoClass';
import VideoDetail from '../../screens/VideoClass/VideoDetail';
import VideoDetail2 from '../../screens/Clases/VideoDetail2';
import VideoPlayer from '../../screens/VideoClass/VideoPlayer';
import TestVideo from '../../screens/VideoClass/Test';
import TestVideo2 from '../../screens/Clases/Test';
import DownUpload from '../../screens/Download';
import FolderFiles from '../../screens/Download/FolderFiles';
import Upload from '../../screens/Uploads';
import ExamScreen from '../../screens/Exames';
import ExamFile from '../../screens/Exames/ExamenFile';
import Test from '../../screens/Test';
import Result from '../../screens/Result';
import Review from '../../screens/ReviewExam';
import FAQ from '../../screens/FAQs';
import FAQSDetail from '../../screens/FAQs/FaqsDetail';
import Personality from '../../screens/PersonalityTest';
import ReviewTest from '../../screens/Review';
import ReviewTestExam from '../../screens/Review/Files';
import News from '../../screens/News';
import Chat from '../../screens/Chat';
import Survey from '../../screens/Survey';
import Objectives from '../../screens/Objectives';
import GlobalRanking from '../../screens/GlobalRanking';
import Payment from '../../screens/Payment';
import Calender from '../../screens/Calender';
import PDF from '../../screens/PDF';
import PdfDetail from '../../screens/PDF/PdfFiles';
import PdfView from '../../screens/PDF/PdfView';
import PdfView2 from '../../screens/PDF/PdfView2';
import TikTok from '../../screens/TikTok';
import SurveyQuestion from '../../screens/Survey/SurveyQuestion';
import Clases from '../../screens/Clases';
import Profile from '../../screens/Profile';
import Battle from '../../screens/Battle';
import CreateBatlle from '../../screens/Battle/CreateBatlle';
import ActiveBattle from '../../screens/Battle/ActiveBattle';
import Actividad from '../../screens/Actividad';
import Activity from '../../screens/Actividad/Activity';
import BattleTest from '../../screens/BattleTest';
import AudioActivity from '../../screens/Actividad/AudioActivity';
import TestScreen from '../../screens/TestScreen';

export default createStackNavigator(
  {
    HomeScreen: {
      screen: Home,
    },
    Actividad: {
      screen: Actividad,
    },
    Activity: {
      screen: Activity,
    },
    AudioActivity: {
      screen: AudioActivity,
    },
    Login: {
      screen: Login,
    },
    OTP: {
      screen: OTP,
    },
    AudioClass: {
      screen: AudioClass,
    },
    AudioDetail: {
      screen: AudioDetail,
    },
    VideoClass: {
      screen: VideoClass,
    },
    VideoDetail: {
      screen: VideoDetail,
    },
    VideoPlayer: {
      screen: VideoPlayer,
    },
    DownUpload: {
      screen: DownUpload,
    },
    FolderFiles: {
      screen: FolderFiles,
    },
    Upload: {
      screen: Upload,
    },
    ExamScreen: {
      screen: ExamScreen,
    },
    Test: {
      screen: Test,
    },
    Result: {
      screen: Result,
    },
    Review: {
      screen: Review,
    },
    FAQ: {
      screen: FAQ,
    },
    FAQSDetail: {
      screen: FAQSDetail,
    },
    Personality: {
      screen: Personality,
    },
    ReviewTest: {
      screen: ReviewTest,
    },
    News: {
      screen: News,
    },
    Survey: {
      screen: Survey,
    },
    SurveyQuestion: {
      screen: SurveyQuestion,
    },
    Chat: {
      screen: Chat,
    },
    Objectives: {
      screen: Objectives,
    },
    GlobalRanking: {
      screen: GlobalRanking,
    },
    Payment: {
      screen: Payment,
    },
    Calender: {
      screen: Calender,
    },
    TestVideo: {
      screen: TestVideo,
    },
    PDF: {
      screen: PDF,
    },
    PdfDetail: {
      screen: PdfDetail,
    },
    PdfView: {
      screen: PdfView,
    },
    PdfView2: {
      screen: PdfView2,
    },
    ReviewTestExam: {
      screen: ReviewTestExam,
    },
    ExamFile: {
      screen: ExamFile,
    },
    TikTok: {
      screen: TikTok,
    },
    Clases: {
      screen: Clases,
    },
    VideoDetail2: {
      screen: VideoDetail2,
    },
    TestVideo2: {
      screen: TestVideo2,
    },
    Profile: {
      screen: Profile,
    },
    Battle: {
      screen: Battle,
    },
    CreateBatlle: {
      screen: CreateBatlle,
    },
    ActiveBattle: {
      screen: ActiveBattle,
    },
    BattleTest: {
      screen: BattleTest,
    },
    TestScreen: {
      screen: TestScreen,
    },
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
  },
);
