import {combineReducers} from 'redux';
import {
  LOGIN,
  AUTH_LOADING,
  GET_TOPICS,
  GET_AUDIO_FILE,
  GET_VIDEO_FILE,
  GET_PDF_FILE,
  GET_DOWNLOAD_FOLDER,
  GET_DOWNLOAD_FILES,
  GET_UPLOAD_FOLDER,
  LOG_OUT,
  EMAIL_SUBSCRIPTION,
  UPLOAD_FILE,
  GET_ALL_EXAMS,
  EXAM_START,
  REVIEW_EXAM,
  CLEAR_STATES,
  PERSONALITY_EXAM,
  REVIEW_EXAM_LIST,
  NEWS_COUNT,
  NEWS_ITEMS,
  SURVEY_LIST,
  SURVEY_QUESTIONS,
  GET_ALL_CHAT,
  CHAT_COUNT,
  VERTICAL_RANKING,
  REVIEW_RANKING,
  OBJECTIVE,
  OBJECTIVE_RANKING,
  REVIEW_DRAWER,
  ALL_NOTIFICATIONS,
  AUTH_DIALOG,
  ERROR_MESSAGE,
  CALENDAR_DATES,
  ORIENTATION_CHECK,
  GET_PDF_FOLDER,
  TOKEN,
  ACTIVITY_ID,
  RANK_AVATAR,
  TOAST,
  BATTLE_QUESTION,
  REJECT_RESON,
} from './action';

const initialUserState = {
  login: '',
  topics: '',
  AuthLoading: false,
  isDialogOpen: false,
  audio: '',
  video: '',
  pdfFolders: '',
  pdf: '',
  download: '',
  downloadFiles: '',
  uploadFolder: '',
  emailSubscribed: '',
  uploadStatus: '',
  examsData: '',
  examStartData: '',
  reviewAll: '',
  personalityList: '',
  reviewList: '',
  newsCount: '',
  newsItem: '',
  surveyItems: '',
  surveyQuestion: '',
  getChats: '',
  chatCount: '',
  verticalRanking: '',
  reviewRanking: '',
  objectiveState: '',
  objectiveRanking: '',
  reviewDrawer: '',
  allNotifications: '',
  errorMessage: '',
  getCalender: '',
  orientation: false,
  userBlock: false,
  userDelete: false,
  token: '',
  activityId: '',
  activityName: '',
  RV_Images: '',
  showToast: false,
  battaleQues: '',
  rejectReason: [],
};

const userReducer = (state = initialUserState, action) => {
  if (action.type === LOG_OUT) {
    return {
      ...state,
      login: '',
      topics: '',
      AuthLoading: false,
      isDialogOpen: false,
      audio: '',
      video: '',
      pdfFolders: '',
      pdf: '',
      download: '',
      downloadFiles: '',
      uploadFolder: '',
      emailSubscribed: '',
      uploadStatus: '',
      examsData: '',
      examStartData: '',
      reviewAll: '',
      personalityList: '',
      reviewList: '',
      newsCount: '',
      newsItem: '',
      surveyItems: '',
      surveyQuestion: '',
      getChats: '',
      chatCount: '',
      verticalRanking: '',
      reviewRanking: '',
      objectiveState: '',
      objectiveRanking: '',
      reviewDrawer: '',
      allNotifications: '',
      errorMessage: '',
      getCalender: '',
      orientation: false,
      userBlock: false,
      userDelete: false,
      token: '',
      activityId: '',
      activityName: '',
      RV_Images: '',
      showToast: false,
      battaleQues: '',
      rejectReason: [],
    };
  }

  if (action.type === CLEAR_STATES) {
    return {
      ...state,
      //examsData:"",
      reviewAll: '',
      examStartData: '',
      //personalityList: "",
      //reviewList: "",
      surveyQuestion: '',
    };
  }

  if (action.type === AUTH_LOADING) {
    return {
      ...state,
      AuthLoading: action.payload,
    };
  }
  if (action.type === TOAST) {
    return {
      ...state,
      showToast: action.payload,
    };
  }

  if (action.type === LOGIN) {
    return {
      ...state,
      login: action.payload.login,
      userBlock: action.payload.userBlock,
      userDelete: action.payload.userDelete,
    };
  }

  if (action.type === GET_TOPICS) {
    return {
      ...state,
      topics: action.payload.topics,
    };
  }

  if (action.type === GET_AUDIO_FILE) {
    return {
      ...state,
      audio: action.payload.audio,
    };
  }

  if (action.type === GET_VIDEO_FILE) {
    return {
      ...state,
      video: action.payload.video,
    };
  }
  if (action.type === GET_PDF_FOLDER) {
    return {
      ...state,
      pdfFolders: action.payload.pdfFolders,
    };
  }
  if (action.type === GET_PDF_FILE) {
    return {
      ...state,
      pdf: action.payload.pdf,
    };
  }

  if (action.type === GET_DOWNLOAD_FOLDER) {
    return {
      ...state,
      download: action.payload.download,
    };
  }

  if (action.type === GET_DOWNLOAD_FILES) {
    return {
      ...state,
      downloadFiles: action.payload.downloadFiles,
    };
  }

  if (action.type === GET_UPLOAD_FOLDER) {
    return {
      ...state,
      uploadFolder: action.payload.uploadFolder,
    };
  }

  if (action.type === EMAIL_SUBSCRIPTION) {
    return {
      ...state,
      emailSubscribed: action.payload.emailSubscribed,
    };
  }

  if (action.type === UPLOAD_FILE) {
    return {
      ...state,
      uploadStatus: action.payload.uploadStatus,
    };
  }

  if (action.type === GET_ALL_EXAMS) {
    return {
      ...state,
      examsData: action.payload.examsData,
    };
  }

  if (action.type === EXAM_START) {
    return {
      ...state,
      examStartData: action.payload.examStartData,
    };
  }

  if (action.type === REVIEW_EXAM) {
    return {
      ...state,
      reviewAll: action.payload.reviewAll,
    };
  }

  if (action.type === PERSONALITY_EXAM) {
    return {
      ...state,
      personalityList: action.payload.personalityList,
    };
  }

  if (action.type === REVIEW_EXAM_LIST) {
    return {
      ...state,
      reviewList: action.payload.reviewList,
    };
  }

  if (action.type === NEWS_COUNT) {
    return {
      ...state,
      newsCount: action.payload.newsCount,
    };
  }

  if (action.type === NEWS_ITEMS) {
    return {
      ...state,
      newsItem: action.payload.newsItem,
    };
  }

  if (action.type === SURVEY_LIST) {
    return {
      ...state,
      surveyItems: action.payload.surveyItems,
    };
  }

  if (action.type === SURVEY_QUESTIONS) {
    return {
      ...state,
      surveyQuestion: action.payload.surveyQuestion,
    };
  }

  if (action.type === GET_ALL_CHAT) {
    return {
      ...state,
      getChats: action.payload.getChats,
    };
  }

  if (action.type === CHAT_COUNT) {
    return {
      ...state,
      chatCount: action.payload.chatCount,
    };
  }

  if (action.type === VERTICAL_RANKING) {
    return {
      ...state,
      verticalRanking: action.payload.verticalRanking,
    };
  }

  if (action.type === REVIEW_RANKING) {
    return {
      ...state,
      reviewRanking: action.payload.reviewRanking,
    };
  }

  if (action.type === OBJECTIVE) {
    return {
      ...state,
      objectiveState: action.payload.objectiveState,
    };
  }

  if (action.type === OBJECTIVE_RANKING) {
    return {
      ...state,
      objectiveRanking: action.payload.objectiveRanking,
    };
  }

  if (action.type === REVIEW_DRAWER) {
    return {
      ...state,
      reviewDrawer: action.payload.reviewDrawer,
    };
  }

  if (action.type === ALL_NOTIFICATIONS) {
    return {
      ...state,
      allNotifications: action.payload.allNotifications,
    };
  }

  if (action.type === CALENDAR_DATES) {
    return {
      ...state,
      getCalender: action.payload.getCalender,
    };
  }
  if (action.type === ORIENTATION_CHECK) {
    return {
      ...state,
      orientation: action.payload.orientation,
    };
  }
  if (action.type === TOKEN) {
    return {
      ...state,
      token: action.payload.token,
    };
  }
  if (action.type === ACTIVITY_ID) {
    return {
      ...state,
      activityId: action.payload.activityId,
      activityName: action.payload.activityName,
    };
  }
  if (action.type === RANK_AVATAR) {
    return {
      ...state,
      RV_Images: action.payload.RV_Images,
    };
  }
  if (action.type === BATTLE_QUESTION) {
    return {
      ...state,
      battaleQues: action.payload.battaleQues,
    };
  }
  if (action.type === REJECT_RESON) {
    return {
      ...state,
      rejectReason: action.payload.rejectReason,
    };
  }
  return state;
};

const DailogReducer = (state = initialUserState, action) => {
  if (action.type === AUTH_DIALOG) {
    return {
      ...state,
      isDialogOpen: action.payload,
    };
  }
  if (action.type === ERROR_MESSAGE) {
    return {
      ...state,
      errorMessage: action.payload,
    };
  }
  return state;
};

const reducer = combineReducers({
  user: userReducer,
  dialog: DailogReducer,
});
export default reducer;
