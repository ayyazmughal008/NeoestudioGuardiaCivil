import { createStackNavigator } from 'react-navigation-stack';
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
import Settings from '../../screens/Settings';

export default createStackNavigator(
  {
    HomeScreen: {
      screen: Home,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Actividad: {
      screen: Actividad,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Activity: {
      screen: Activity,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    AudioActivity: {
      screen: AudioActivity,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    OTP: {
      screen: OTP,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    AudioClass: {
      screen: AudioClass,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    AudioDetail: {
      screen: AudioDetail,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    VideoClass: {
      screen: VideoClass,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    VideoDetail: {
      screen: VideoDetail,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    VideoPlayer: {
      screen: VideoPlayer,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    DownUpload: {
      screen: DownUpload,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    FolderFiles: {
      screen: FolderFiles,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Upload: {
      screen: Upload,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    ExamScreen: {
      screen: ExamScreen,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Test: {
      screen: Test,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Result: {
      screen: Result,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Review: {
      screen: Review,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    FAQ: {
      screen: FAQ,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    FAQSDetail: {
      screen: FAQSDetail,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Personality: {
      screen: Personality,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    ReviewTest: {
      screen: ReviewTest,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    News: {
      screen: News,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Survey: {
      screen: Survey,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    SurveyQuestion: {
      screen: SurveyQuestion,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Chat: {
      screen: Chat,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Objectives: {
      screen: Objectives,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    GlobalRanking: {
      screen: GlobalRanking,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Payment: {
      screen: Payment,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Calender: {
      screen: Calender,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    TestVideo: {
      screen: TestVideo,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    PDF: {
      screen: PDF,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    PdfDetail: {
      screen: PdfDetail,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    PdfView: {
      screen: PdfView,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    PdfView2: {
      screen: PdfView2,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    ReviewTestExam: {
      screen: ReviewTestExam,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    ExamFile: {
      screen: ExamFile,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    TikTok: {
      screen: TikTok,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Clases: {
      screen: Clases,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    VideoDetail2: {
      screen: VideoDetail2,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    TestVideo2: {
      screen: TestVideo2,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Battle: {
      screen: Battle,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    CreateBatlle: {
      screen: CreateBatlle,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    ActiveBattle: {
      screen: ActiveBattle,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    BattleTest: {
      screen: BattleTest,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    TestScreen: {
      screen: TestScreen,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        gestureEnabled: false,
      },
    },
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
    defaultNavigationOptions: {
      gestureEnabled: false
    }
  },
);
