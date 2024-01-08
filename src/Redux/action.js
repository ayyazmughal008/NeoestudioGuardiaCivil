import React, {Component} from 'react';
import {Alert} from 'react-native';
import Dialog from '../Component/DailogBox';
import NavigationService from '../navigator/navigationService';
export const LOGIN = 'LOGIN';
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_DIALOG = 'AUTH_DIALOG';
export const ERROR_MESSAGE = 'ERROR_MESSAGE';
export const LOG_OUT = 'LOG_OUT';
export const GET_TOPICS = 'GET_TOPICS';
export const GET_AUDIO_FILE = 'GET_AUDIO_FILE';
export const GET_VIDEO_FILE = 'GET_VIDEO_FILE';
export const GET_PDF_FILE = 'GET_PDF_FILE';
export const GET_PDF_FOLDER = 'GET_PDF_FOLDER';
export const GET_DOWNLOAD_FOLDER = 'GET_DOWNLOAD_FOLDER';
export const GET_DOWNLOAD_FILES = 'GET_DOWNLOAD_FILES';
export const GET_UPLOAD_FOLDER = 'GET_UPLOAD_FOLDER';
export const EMAIL_SUBSCRIPTION = 'EMAIL_SUBSCRIPTION';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const GET_ALL_EXAMS = 'GET_ALL_EXAMS';
export const EXAM_START = 'EXAM_START';
export const REVIEW_EXAM = 'REVIEW_EXAM';
export const CLEAR_STATES = 'CLEAR_STATES';
export const PERSONALITY_EXAM = 'PERSONALITY_EXAM';
export const REVIEW_EXAM_LIST = 'REVIEW_EXAM_LIST';
export const NEWS_COUNT = 'NEWS_COUNT';
export const NEWS_ITEMS = 'NEWS_ITEMS';
export const SURVEY_LIST = 'SURVEY_LIST';
export const SURVEY_QUESTIONS = 'SURVEY_QUESTIONS';
export const GET_ALL_CHAT = 'GET_ALL_CHAT';
export const CHAT_COUNT = 'CHAT_COUNT';
export const VERTICAL_RANKING = 'VERTICAL_RANKING';
export const REVIEW_RANKING = 'REVIEW_RANKING';
export const AUDIO = 'AUDIO';
export const OBJECTIVE = 'OBJECTIVE';
export const REVIEW_DRAWER = 'REVIEW_DRAWER';
export const ALL_NOTIFICATIONS = 'ALL_NOTIFICATIONS';
export const OBJECTIVE_RANKING = 'OBJECTIVE_RANKING';
export const CALENDAR_DATES = 'CALENDAR_DATES';
export const ORIENTATION_CHECK = 'ORIENTATION_CHECK';
export const TOKEN = 'TOKEN';
export const ACTIVITY_ID = 'ACTIVITY_ID';
export const RANK_AVATAR = 'RANK_AVATAR';
export const BATTLE_QUESTION = 'BATTLE_QUESTION';
export const TOAST = 'TOAST';
export const REJECT_RESON = 'REJECT_RESON';

// ===================================== //

// Base Url with respective end points
var baseUrl = 'https://neoestudio.net/api/';
//var baseUrl = "https://neoestudioguardiaciviloposiciones.es/api/";
//var baseUrl = "http://95.179.208.227/acadmy/public/api/";
//var baseUrl = "https://95.179.208.227/acadmy/public/api/";
var login = 'loginStudent',
  logoutStd = 'logoutStudent',
  mobileOTP = 'MobileOTP',
  verifyOTP = 'verifyOTP',
  feedback = 'user/feedback',
  GetTopis = 'getTopics',
  GetAudio = 'getAudioFiles',
  GetVideo = 'getVideoFiles',
  GetPdf = 'getPdfFiles',
  getDownloadFolder = 'getDownloadFolders',
  getDownloadFiles = 'getDownloadFiles',
  getUploadFolders = 'getUploadFolders',
  emailSubscription = 'emailSubscription',
  uploadFile = 'uploadFile',
  getAllExams = 'getAllExam',
  startExam = 'startExam',
  pauseAnswer = 'pauseAnswer',
  endExam = 'endExam',
  getAllPersonalityExams = 'getAllPersonalityExams',
  getAllReviewExams = 'getAllReviewExams',
  newsUnseenCount = 'newsUnseenCount',
  allNews = 'allNews',
  surveyList = 'surveyList',
  getSurveyQuestions = 'getSurveyQuestions',
  getSurveyTest = 'getSurveyTest',
  storeChatStudent = 'storeChatStudent',
  getChat = 'getChat',
  chatCount = 'chatCount',
  audios = 'audios',
  reviewDrawr = 'reviewDrawr',
  estudioTemario = 'estudioTemario',
  repasoTemario = 'repasoTemario',
  getObjectives = 'getObjectives',
  objectiveRanking = 'objectiveRanking',
  user = 'user',
  getTopicCourseVerticalRanking = 'getTopicCourseVerticalRanking',
  checkNotifications = 'checkNotifications',
  onExam = 'onExam',
  getCourseVerticalRanking = 'getCourseVerticalRanking',
  getDates = 'getDates',
  endReview = 'endReview',
  endVideo = 'videos',
  pdfCounter = 'pdfCounter',
  getDownloadPdfFolders = 'getDownloadPdfFolders',
  getDownloadPdfFiles = 'getDownloadPdfFiles',
  deviceKey = 'device-key',
  fetchVideos = 'fetch-videos',
  getAllPrograms = 'getAllPrograms',
  getProgramActivities = 'getProgramActivities',
  completeActivity = 'completeActivity',
  removeActivity = 'removeActivity',
  getRankAvatar = 'getRankAvatar',
  store = 'avatar/store',
  rankUpdate = 'rank-image-update',
  saveExperience = 'saveExperience',
  updateProfile = 'updateProfile',
  updateExperience = 'updateExperience',
  reasons = 'Reasons',
  videoLike = 'videoLike',
  videoComment = 'videoComment',
  videoSharing = 'videoSharing',
  getComment = 'GetVideoComments?videoId=',
  editComments = 'editComments',
  deleteComments = 'deleteComments',
  videoDownload = 'videoDownload',
  loginTime = 'loginTime',
  logoutTime = 'logoutTime',
  ActiveBattles = 'battle/ActiveBattles',
  createBattle = 'battle/allTestTypes',
  battleStart = 'battle/createbattle',
  joinBattle = 'battle/startbattle',
  highScore = 'battle/higestscore',
  sendNotification = 'battle/send-web-notification-battle',
  leaveBattle = 'battle/leavebattle',
  rescheduleExamAll = 'rescheduleExamAll',
  resetprogram = 'resetprogram',
  resetallactivites = 'resetallactivites',
  rejectionoptions = 'rejectionoptions',
  questionqueries = 'questionqueries',
  blocked = 'blocked',
  success = 'success',
  reviewExam = 'reviewExam',
  updatebaremo = 'updatebaremo',
  deleteuser = 'deleteuser';
// ====================//

export const saveActivityId = (value, name) => {
  return dispatch => {
    dispatch({
      type: ACTIVITY_ID,
      payload: {
        activityId: value,
        activityName: name,
      },
    });
  };
};
export const saveToken = value => {
  return dispatch => {
    dispatch({
      type: TOKEN,
      payload: {
        token: value,
      },
    });
  };
};
export const updateOrientation = value => {
  return dispatch => {
    dispatch({
      type: ORIENTATION_CHECK,
      payload: {
        orientation: value,
      },
    });
  };
};
export const dispatchFunc = () => {
  return dispatch => {
    dispatch({type: AUTH_DIALOG, payload: false});
  };
};
export const showToastFunc = () => {
  return dispatch => {
    dispatch({type: TOAST, payload: true});
  };
};
export const hideToastFunc = () => {
  return dispatch => {
    dispatch({type: TOAST, payload: false});
  };
};
export const dispatchFuncOn = () => {
  return dispatch => {
    dispatch({type: AUTH_DIALOG, payload: true});
  };
};
export const dispatchText = () => {
  return dispatch => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: 'El documento se ha ' + '\n' + 'descargado con éxito',
    });
  };
};
export const dispatchAudioText = () => {
  return dispatch => {
    dispatch({
      type: ERROR_MESSAGE,
      payload: 'Por favor seleccione cualquier clase de la lista',
    });
  };
};
export const dispatchExamText = () => {
  return dispatch => {
    dispatch({type: ERROR_MESSAGE, payload: 'Elija cualquier examen'});
  };
};
export const logout = () => {
  return dispatch => {
    dispatch({type: LOG_OUT});
  };
};
export const clearStates = () => {
  return dispatch => {
    dispatch({type: CLEAR_STATES});
  };
};
export const userLogin = (type, param1, param2, reason) => {
  if (type === 'false') {
    return dispatch => {
      dispatch({type: AUTH_LOADING, payload: true});
      fetch(baseUrl + login, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          telephone: param1,
          email: param2,
          // ipAddress: ipAddress,
          // isLogin: "yes",
          reason: reason,
        }),
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          dispatch({type: AUTH_LOADING, payload: false});
          if (json.status === 'Sucessfull') {
            if (!json.is_verified || json.is_verified === 'No') {
              NavigationService.navigate('OTP', {
                data: json,
                type: type,
              });
            } else {
              dispatch({
                type: LOGIN,
                payload: {
                  login: json,
                },
              });
              dispatch(getRankAvatarImages());
              NavigationService.navigate('HomeScreen', {
                isSubscribe: 'ok',
              });
            }
          } else if (json.status === 'Unsucessfull') {
            dispatch({type: ERROR_MESSAGE, payload: json.message});
            dispatch({type: AUTH_DIALOG, payload: true});
          } else {
            dispatch({
              type: ERROR_MESSAGE,
              payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
            });
            dispatch({type: AUTH_DIALOG, payload: true});
          }
        })
        .catch(error => {
          console.log('exception error is =>', error);
          dispatch({type: AUTH_LOADING, payload: false});
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        });
    };
  } else {
    return dispatch => {
      dispatch({type: AUTH_LOADING, payload: true});
      fetch(baseUrl + login, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          studentCode: param1,
          password: param2,
          //ipAddress: ipAddress,
          isLogin: 'yes',
        }),
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          dispatch({type: AUTH_LOADING, payload: false});
          if (json.status === 'Sucessfull') {
            // if (json.data.isLogin === "yes") {
            //   dispatch({ type: ERROR_MESSAGE, payload: "Ya estás iniciando sesión en otro dispositivo. Cierre la sesión desde allí y vuelva a iniciar sesión." })
            //   dispatch({ type: AUTH_DIALOG, payload: true })
            // } else {
            //   dispatch({
            //     type: LOGIN,
            //     payload: {
            //       login: json
            //     }
            //   });
            //   NavigationService.navigate('HomeScreen', {
            //     isSubscribe: "done"
            //   })
            // }
            dispatch({
              type: LOGIN,
              payload: {
                login: json,
              },
            });
            dispatch(getRankAvatarImages());
            NavigationService.navigate('HomeScreen', {
              isSubscribe: 'done',
            });
          } else if (json.status === 'Unsucessfull') {
            dispatch({type: ERROR_MESSAGE, payload: json.message});
            dispatch({type: AUTH_DIALOG, payload: true});
          } else {
            dispatch({
              type: ERROR_MESSAGE,
              payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
            });
            dispatch({type: AUTH_DIALOG, payload: true});
          }
        })
        .catch(error => {
          console.log('exception error is =>', error);
          dispatch({type: AUTH_LOADING, payload: false});
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        });
    };
  }
};
export const verifyMobileOTP = (userId, otp, data) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + verifyOTP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        mobileotp: otp,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status == 200) {
          dispatch({
            type: LOGIN,
            payload: {
              login: data,
            },
          });
          dispatch(getRankAvatarImages());
          NavigationService.navigate('HomeScreen', {
            isSubscribe: 'ok',
          });
        } else {
          Alert.alert(
            'No verificado',
            'Estimado estudiante, Tu OTP no coincide',
          );
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const logoutFromSystem = async studentId => {
  let api;
  try {
    api = await fetch(baseUrl + logoutStd, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const getTopics = (type, id, fileType) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + GetTopis, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: type,
        studentId: id,
        type: fileType,
      }),
    })
      .then(res => res.json())
      .then(json => {
        ////console.log(json);
        dispatch({
          type: GET_TOPICS,
          payload: {
            topics: json,
          },
        });
        dispatch({type: AUTH_LOADING, payload: false});
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
        //dispatch({ type: ERROR_MESSAGE, payload: "Algo salió mal. Por favor, vuelva a intentarlo.!" })
        //dispatch({ type: AUTH_DIALOG, payload: true })
      });
  };
};
export const getAudioFiles = (id, stdId) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + GetAudio, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: GET_AUDIO_FILE,
            payload: {
              audio: json,
            },
          });
          // if (json?.data.length) {
          //   NavigationService.navigate('AudioPlayer')
          // } else {
          //   Alert.alert('', "No Audio FIles available at the moment")
          // }
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getVIdeoFiles = (id, stdId) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + GetVideo, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: GET_VIDEO_FILE,
            payload: {
              video: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getPdfFolder = (studentType, id) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getDownloadPdfFolders, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: studentType,
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: GET_PDF_FOLDER,
            payload: {
              pdfFolders: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getPdfFiles = (id, stdId) => {
  console.log(id, stdId);
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getDownloadPdfFiles, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderId: id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.message === 'success') {
          console.log('=====> my pdf', json);
          dispatch({
            type: GET_PDF_FILE,
            payload: {
              pdf: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getDownload = (studentType, id) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getDownloadFolder, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: studentType,
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: GET_DOWNLOAD_FOLDER,
            payload: {
              download: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getDownloadFile = (Id, type, stdId) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getDownloadFiles, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        folderId: Id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.message === 'success') {
          dispatch({
            type: GET_DOWNLOAD_FILES,
            payload: {
              downloadFiles: json,
              studentType: type,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getUploadFolder = (studentType, id) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getUploadFolders, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: studentType,
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: GET_UPLOAD_FOLDER,
            payload: {
              uploadFolder: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getEmailSubscription = (id, emailSub) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + emailSubscription, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        emailSubscription: emailSub,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: LOGIN,
            payload: {
              login: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const uploadFiles = (id, stdId, type, allFile) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    const body = new FormData();
    body.append('folderId', id);
    body.append('studentId', stdId);
    body.append('studentType', type);
    body.append('file', allFile);

    fetch(baseUrl + uploadFile, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    })
      .then(response => response.json())
      .then(json => {
        //console.log(json)
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: UPLOAD_FILE,
            payload: {
              uploadStatus: json,
            },
          });
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Archivo cargado al servidor con éxito',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
        //console.log('uploadImage error:', error);
      });
  };
};
export const getExames = (id, isFirst, type) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getAllExams, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        studentType: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        ////console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          if (isFirst) {
            dispatch({
              type: GET_ALL_EXAMS,
              payload: {
                examsData: json,
              },
            });
            NavigationService.navigate('ExamScreen');
          } else {
            dispatch({
              type: GET_ALL_EXAMS,
              payload: {
                examsData: json,
              },
            });
            dispatch(getCurrentUser(id));
            dispatch(getAllAppNotification(id));
            dispatch(getUnseenNewsCount(id));
            dispatch(getChatCount(id));
            dispatch(getVerticalRanking(id));
            dispatch(getObjectiveStates(id));
            dispatch(getObjectiveRanking(id, type));
            dispatch(getReviewRanking(id));
          }
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getStartExamData = (
  id,
  stId,
  attemptID,
  stdAnswer,
  value,
  isRestart,
  Allowdescription,
  questionid,
) => {
  console.log('isRestart ==>', isRestart);
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + startExam, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        examId: id,
        studentId: stId,
        studentAttemptId: attemptID,
        studentAnswered: stdAnswer,
        tab: value,
        isRestart: isRestart,
        Allowdescription: Allowdescription,
        questionid: questionid,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: EXAM_START,
            payload: {
              examStartData: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const pauseExams = (id, pauseTime, stdID, type) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + pauseAnswer, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentExamRecordId: id,
        time: pauseTime,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch(clearStates());
          dispatch(getExames(stdID, false, type));
          NavigationService.navigate('HomeScreen');
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const endAllExams = (id, endTime, isPsico, type, isRepasoImage) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + endExam, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentExamRecordId: id,
        time: endTime,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          //console.log('my end exam api response', json);
          NavigationService.navigate('Result', {
            data: json,
            examID: id,
            image: isPsico,
            type: type,
            isRepasoImage: isRepasoImage,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const reviewAllExams = (recordId, value) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + reviewExam, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentExamRecordId: recordId,
        tab: value,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: REVIEW_EXAM,
            payload: {
              reviewAll: json,
            },
          });
          dispatch(getReviewDrawer(recordId));
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getPersonalityTestList = (id, type) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getAllPersonalityExams, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        studentType: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: PERSONALITY_EXAM,
            payload: {
              personalityList: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getReviewTestList = (id, type) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getAllReviewExams, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        studentType: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: REVIEW_EXAM_LIST,
            payload: {
              reviewList: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getUnseenNewsCount = id => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + newsUnseenCount, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: NEWS_COUNT,
            payload: {
              newsCount: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getAllNews = (id, value) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + allNews, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        tab: value,
      }),
    })
      .then(res => res.json())
      .then(json => {
        ////console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: NEWS_ITEMS,
            payload: {
              newsItem: json,
            },
          });
          dispatch(getUnseenNewsCount(id));
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getSurveyList = (type, stdId) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + surveyList, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: type,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: SURVEY_LIST,
            payload: {
              surveyItems: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getSurveyListQuestions = (id, isFirst, stdId) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getSurveyQuestions, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        surveyId: id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          if (isFirst) {
            dispatch({
              type: SURVEY_QUESTIONS,
              payload: {
                surveyQuestion: json,
              },
            });
            NavigationService.navigate('SurveyQuestion', {
              id: id,
            });
          } else {
            dispatch({
              type: SURVEY_QUESTIONS,
              payload: {
                surveyQuestion: json,
              },
            });
          }
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const submitSurvey = survey => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getSurveyTest, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(survey),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          //console.log(json);
          NavigationService.navigate('Survey'),
            dispatch({
              type: ERROR_MESSAGE,
              payload: 'Encuesta enviada con éxito .',
            });
          dispatch({type: AUTH_DIALOG, payload: true});
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const postChat = (stdID, message, file, isMessage, type) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    const body = new FormData();
    body.append('studentId', stdID);
    if (isMessage) {
      body.append('message', message);
    } else {
      body.append('file', file);
      body.append('type', type === 'audio/mpeg' ? 'audio' : 'file');
    }
    fetch(baseUrl + storeChatStudent, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    })
      .then(response => response.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        //console.log(json)
        if (json.status === 'Successfull') {
          ////console.log("hiiiiiiiiiiiii")
          dispatch(getAllChats(false, stdID));
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
        //console.log('error:', error);
      });
  };
};
export const getAllChats = (isFirst, id) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getChat, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          if (isFirst) {
            dispatch({
              type: GET_ALL_CHAT,
              payload: {
                getChats: json,
              },
            });
            NavigationService.navigate('Chat');
            dispatch(getChatCount(id));
          } else {
            dispatch({
              type: GET_ALL_CHAT,
              payload: {
                getChats: json,
              },
            });
            dispatch(getChatCount(id));
          }
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getChatCount = id => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + chatCount, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: CHAT_COUNT,
            payload: {
              chatCount: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getVerticalRanking = id => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getTopicCourseVerticalRanking, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        ////console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: VERTICAL_RANKING,
            payload: {
              verticalRanking: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getReviewRanking = id => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getCourseVerticalRanking, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: REVIEW_RANKING,
            payload: {
              reviewRanking: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const postAudioState = (id, state) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + audios, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        state: state,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        //Alert.alert("Connection Failed", "Check your internet connection and try again")
      });
  };
};
export const getEstudioTemario = (id, action) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + estudioTemario, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        action: action,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch(getObjectiveStates(id));
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        //Alert.alert("Connection Failed", "Check your internet connection and try again")
      });
  };
};
export const getRepasoTemario = (id, action) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + repasoTemario, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        action: action,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch(getObjectiveStates(id));
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        //Alert.alert("Connection Failed", "Check your internet connection and try again")
      });
  };
};
export const getObjectiveStates = id => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getObjectives, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: OBJECTIVE,
            payload: {
              objectiveState: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        //Alert.alert("Connection Failed", "Check your internet connection and try again")
      });
  };
};
export const getObjectiveRanking = (id, type) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + objectiveRanking, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        //"studentType": type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: OBJECTIVE_RANKING,
            payload: {
              objectiveRanking: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: ERROR_MESSAGE,
          payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
        });
        dispatch({type: AUTH_DIALOG, payload: true});
      });
  };
};
export const getReviewDrawer = id => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + reviewDrawr, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: REVIEW_DRAWER,
            payload: {
              reviewDrawer: json,
            },
          });
        } else {
          // dispatch({ type: ERROR_MESSAGE, payload: "Algo salió mal. Por favor, vuelva a intentarlo.!" })
          // dispatch({ type: AUTH_DIALOG, payload: true })
          console.log(json);
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
        //Alert.alert("Connection Failed", "Check your internet connection and try again")
      });
  };
};
export const getCurrentUser = (id, type) => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + user, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log('User data', json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: LOGIN,
            payload: {
              login: json,
            },
          });
          // dispatch(updateUserProfile(id))
          dispatch(getRankAvatarImages());
          dispatch(getAllAppNotification(id));
          dispatch(endExamNotification(id));
          dispatch(getCalendarDates(type));
          dispatch(getUnseenNewsCount(id));
          dispatch(getChatCount(id));
          dispatch(getVerticalRanking(id));
          dispatch(getObjectiveStates(id));
          dispatch(getObjectiveRanking(id, type));
          dispatch(getReviewRanking(id));
        } else {
          if (json.is_block == true) {
            dispatch({
              type: LOGIN,
              payload: {
                userBlock: json.is_block,
              },
            });
            dispatch({
              type: ERROR_MESSAGE,
              payload:
                'Tu cuenta ha sido bloqueada automáticamente. Por favor, inicia sesión en la página web y proceda al pago pendiente.',
            });
            dispatch({type: AUTH_DIALOG, payload: true});
          } else if (json.is_delete == true) {
            dispatch({
              type: LOGIN,
              payload: {
                userDelete: json.is_delete,
              },
            });
            dispatch({
              type: ERROR_MESSAGE,
              payload:
                '“Tu cuenta ha sido eliminada por facilitar datos incorrectos. Por favor, inicia sesión de nuevo con datos correctos.',
            });
            dispatch({type: AUTH_DIALOG, payload: true});
          }
          dispatch({
            type: ERROR_MESSAGE,
            payload:
              'Algo salió mal, por favor intente nuevamente o solicite ayuda a su operador.',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
      });
  };
};
export const updateUserProfile = id => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + updateProfile, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log("User data", json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: LOGIN,
            payload: {
              login: json,
            },
          });
        } else {
          if (json.is_block == true) {
            dispatch({
              type: LOGIN,
              payload: {
                userBlock: json.is_block,
              },
            });
            dispatch({
              type: ERROR_MESSAGE,
              payload:
                'Tu cuenta ha sido bloqueada automáticamente. Por favor, inicia sesión en la página web y proceda al pago pendiente.',
            });
            dispatch({type: AUTH_DIALOG, payload: true});
          } else if (json.is_delete == true) {
            dispatch({
              type: LOGIN,
              payload: {
                userDelete: json.is_delete,
              },
            });
            dispatch({
              type: ERROR_MESSAGE,
              payload:
                '“Tu cuenta ha sido eliminada por facilitar datos incorrectos. Por favor, inicia sesión de nuevo con datos correctos.',
            });
            dispatch({type: AUTH_DIALOG, payload: true});
          }
        }
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
      });
  };
};
export const getAllAppNotification = id => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + checkNotifications, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          dispatch({
            type: ALL_NOTIFICATIONS,
            payload: {
              allNotifications: json,
            },
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            payload: 'Algo salió mal. Por favor, vuelva a intentarlo.!',
          });
          dispatch({type: AUTH_DIALOG, payload: true});
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
      });
  };
};
export const endExamNotification = id => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + onExam, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
      });
  };
};
export const getCalendarDates = type => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getDates, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentType: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json);
        dispatch({type: AUTH_LOADING, payload: false});
        dispatch({
          type: CALENDAR_DATES,
          payload: {
            getCalender: json,
          },
        });
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
      });
  };
};
export const endReviewExam = recordId => {
  console.log('end exam api called', recordId);
  return dispatch => {
    //dispatch({ type: AUTH_LOADING, payload: true });
    fetch(baseUrl + endReview, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentExamRecordId: recordId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log("End review exam status", json);
        //dispatch({ type: AUTH_LOADING, payload: false });
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
      });
  };
};
export const postVideoState = (id, state) => {
  return dispatch => {
    fetch(baseUrl + endVideo, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        state: state,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        //console.log("Video state", responseJson)
      })
      .catch(error => {
        //console.error(error);
      });
  };
};
export const pdfState = (id, state) => {
  console.log('pdf state api called', id, state);
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + pdfCounter, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
        state: state,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        //console.log("Video state", json)
      })
      .catch(error => {
        dispatch({type: AUTH_LOADING, payload: false});
        //console.error(error);
      });
  };
};
export const saveUserToken = (id, token) => {
  //console.log('pdf state api called', id, token);
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + deviceKey, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        token: token,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        //console.log('token save', json);
        if (json.status === 'success') {
          //console.log('token save', json.message);
        }
      })
      .catch(error => {
        dispatch({type: AUTH_LOADING, payload: false});
        //console.error(error);
      });
  };
};
export const getUserVideos = async type => {
  console.log(type);
  let api;
  try {
    api = await fetch(baseUrl + fetchVideos, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        if (!json.length) {
          Alert.alert(
            '',
            'Hola, no hay ningún video disponible en este momento. Vuelve a verificar más tarde.',
          );
        } else {
          NavigationService.navigate('TikTok', {
            data: json,
          });
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const getUserPrograms = async type => {
  console.log(type);
  let api;
  try {
    api = await fetch(baseUrl + getAllPrograms, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentType: type,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log(json)
        if (json.status === 'Successfull') {
          return json;
        } else {
          Alert.alert('', JSON.stringify(json));
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const resetAllPrograms = async (studentId, programId) => {
  let api;
  try {
    api = await fetch(baseUrl + resetprogram, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        programId: programId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const getUserProgramsActivites = async (user_id, activityId, page) => {
  console.log('my page ==>', page);
  let api;
  try {
    api = await fetch(baseUrl + getProgramActivities + '?page=' + page, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        programId: activityId,
        studentId: user_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 'Successfull') {
          const newArray = [...json.data];
          for (var i = 0; i < newArray.length; i++) {
            newArray[i].key = i;
          }
          return newArray;
        } else {
          Alert.alert(
            '',
            'Algo salió mal. Por favor, cierre sesión y vuelva a iniciar sesión.',
          );
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const updateCompleteActivites = async (user_id, activityId) => {
  console.log(user_id, activityId);
  let api;
  try {
    api = await fetch(baseUrl + completeActivity, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        activityId: activityId,
        studentId: user_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.status === 'Successfull') {
          return json;
        } else {
          Alert.alert('', JSON.stringify(json));
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const removeUserActivites = async (user_id, activityId, actionType) => {
  console.log(user_id, activityId, actionType);
  let api;
  try {
    api = await fetch(baseUrl + removeActivity, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        activityId: activityId,
        studentId: user_id,
        actionType: actionType,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('remove response ==>', json);
        if (json.status === 'Success') {
          return json;
        } else {
          Alert.alert('', JSON.stringify(json));
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const getRankAvatarImages = () => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + getRankAvatar, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        //console.log('Rank  Images ========>', json);
        dispatch({
          type: RANK_AVATAR,
          payload: {
            RV_Images: json,
          },
        });
        dispatch({type: AUTH_LOADING, payload: false});
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
        //dispatch({ type: ERROR_MESSAGE, payload: "Algo salió mal. Por favor, vuelva a intentarlo.!" })
        //dispatch({ type: AUTH_DIALOG, payload: true })
      });
  };
};
export const storeGalleryImage = async (user_id, image) => {
  let api;
  const body = new FormData();
  body.append('user_id', user_id);
  body.append('type', 'avatar');
  body.append('image', image);
  try {
    api = await fetch(baseUrl + store, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: body,
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const storeAvatarImage = async (user_id, image) => {
  console.log(user_id, image);
  let api;
  try {
    api = await fetch(baseUrl + store, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        image: image,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const updateRank = async user_id => {
  let api;
  try {
    api = await fetch(baseUrl + rankUpdate, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log('Rank update data :-)', json)
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const saveUserRankPoint = async (
  active_state,
  is_special,
  special_type,
  user_id,
) => {
  let api;
  try {
    api = await fetch(baseUrl + saveExperience, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        active_state: active_state,
        is_special: is_special,
        special_type: special_type,
        user_id: user_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log('Rank save data ==>', json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const updateUserRankPoint = async (
  active_state,
  is_special,
  special_type,
  user_id,
) => {
  let api;
  try {
    api = await fetch(baseUrl + updateExperience, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        active_state: active_state,
        is_special: is_special,
        special_type: special_type,
        user_id: user_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('Rank update data==>', json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const getReasons = async () => {
  let api;
  try {
    api = await fetch(baseUrl + reasons, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log('reasone data==>', json);
        let tempArr = [];
        json.reason.forEach((item, index) => {
          tempArr.push({
            label: item.reasons,
            value: item.reasons,
          });
        });
        return tempArr;
      })
      .catch(error => {
        console.log('reasone error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const getOTPMobile = async (user_id, mobile) => {
  let api;
  try {
    api = await fetch(baseUrl + mobileOTP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        mobile: mobile,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('Rank update data==>', json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const updateUserFeedback = async (user_id, comment, rating) => {
  let api;
  try {
    api = await fetch(baseUrl + feedback, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        comment: comment,
        rating: rating,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('feedback data==>', json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const tiktokLikeCount = (studentId, videoId, like) => {
  return dispatch => {
    console.log('api call');
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + videoLike, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        videoId: videoId,
        like: like,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status == 200) {
          console.log(json);
        }
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
      });
  };
};
export const tiktokShareCount = (studentId, videoId) => {
  return dispatch => {
    console.log('api call', studentId, videoId);
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + videoSharing, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        videoId: videoId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(json);
        if (json.status == 200) {
          console.log(json);
        }
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
      });
  };
};
export const tiktokDownloadCount = (studentId, videoId) => {
  return dispatch => {
    console.log('api call', studentId, videoId);
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + videoDownload, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        videoId: videoId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(json);
        if (json.status == 200) {
          console.log(json);
        }
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
      });
  };
};
export const getTiktokComment = async videoId => {
  let api;
  console.log('api call', videoId);
  try {
    api = await fetch(baseUrl + getComment + videoId, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        console.log('comment data==>', json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const postTiktokComment = async (
  studentId,
  videoId,
  comment,
  ImgPath,
) => {
  let api;
  console.log('api call', videoId);
  try {
    api = await fetch(baseUrl + videoComment, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        videoId: videoId,
        comment: comment,
        ImgPath: ImgPath,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('comment data==>', json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const deleteTiktokComment = async (commentId, videoId) => {
  let api;
  console.log('api call', videoId);
  try {
    api = await fetch(baseUrl + deleteComments, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: commentId,
        videoId: videoId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('comment data==>', json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const editTiktokComment = async (comments, commentId, videoId) => {
  let api;
  console.log('api call', videoId);
  try {
    api = await fetch(baseUrl + editComments, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comments: comments,
        id: commentId,
        videoId: videoId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('comment data==>', json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const updateLoginTime = userId => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + loginTime, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(json);
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
        //Alert.alert("Connection Failed", "Check your internet connection and try again")
      });
  };
};
export const updateLogoutTime = userId => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + logoutTime, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log(json);
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
        //Alert.alert("Connection Failed", "Check your internet connection and try again")
      });
  };
};
export const getAllActiveBattle = async (studentId, studentType) => {
  let api;
  try {
    api = await fetch(baseUrl + ActiveBattles, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        studentType: studentType,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('comment data==>', json);
        if (json.status === 'Successfull') {
          return json;
        } else {
          return Alert.alert('', json.message);
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const createNewBattle = async (studentId, studentType) => {
  let api;
  try {
    api = await fetch(baseUrl + createBattle, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        studentType: studentType,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('create battale data==>', json);
        if (json.status === 'Successfull') {
          return json;
        } else {
          Alert.alert('', json.message);
          return json;
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const startNewBattle = async (
  studentId,
  studentType,
  exams_ids,
  sendNoti,
  NumberOfQuestions,
) => {
  let api;
  try {
    api = await fetch(baseUrl + battleStart, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        studentType: studentType,
        exams_ids: exams_ids,
        NumberOfQuestions: NumberOfQuestions,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('create battale data==>', json);
        if (json.status === 'Successfull') {
          if (sendNoti) {
            sendPushNotification(json.title, json.body);
          }
          return json;
        } else {
          Alert.alert('', json.message);
          return json;
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const sendPushNotification = async (title, body) => {
  let api;
  try {
    api = await fetch(baseUrl + sendNotification, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('comment data==>', json);
        if (json.status === 'Successfull') {
          return json;
        } else {
          return Alert.alert('', json.message);
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const joinMyBattle = (
  studentId,
  studentType,
  battle_id,
  qid,
  studentanswer,
  correctanswer,
) => {
  console.log('--->', studentanswer, correctanswer);
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + joinBattle, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        studentType: studentType,
        battle_id: battle_id,
        qid: qid,
        studentanswer: studentanswer,
        correctanswer: correctanswer,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        console.log('join battle response', json);
        if (json.status === 'Unsuccessfull') {
          //Alert.alert("", json?.message)
          console.log(json?.message);
        } else {
          dispatch({
            type: BATTLE_QUESTION,
            payload: {
              battaleQues: json,
            },
          });
          NavigationService.navigate('BattleTest', {
            battle_id: battle_id,
          });
        }
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
        //Alert.alert("Connection Failed", "Check your internet connection and try again")
      });
  };
};
export const getHighSccore = async battle_id => {
  let api;
  try {
    api = await fetch(baseUrl + highScore, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        battle_id: battle_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log('High Sccore data==>', json)
        if (json.status === 'Successfull') {
          return json;
        } else {
          return Alert.alert('', json.message);
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const leaveCurrentBattle = async (studentId, studentType, battle_id) => {
  let api;
  try {
    api = await fetch(baseUrl + leaveBattle, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        studentType: studentType,
        battle_id: battle_id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log('High Sccore data==>', json)
        if (json.status === 'Successfull') {
          return json;
        } else {
          return Alert.alert('', json.message);
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
export const getLatestAudioFile = async (id, stdId) => {
  let api;
  console.log(id, stdId);
  try {
    api = await fetch(baseUrl + GetAudio, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        studentId: stdId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        //console.log('audio data==>', json)
        if (json.status === 'Successfull') {
          if (!json.data.length) {
            Alert.alert('', 'No audio files at the moment');
          } else {
            return json;
          }
        } else {
          return Alert.alert('', json.message);
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
// export const endAllExams = async (id, endTime, isPsico, type) => {
//   let api;
//   try {
//     api = await fetch(baseUrl + endExam, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         studentExamRecordId: id,
//         time: endTime,
//       }),
//     })
//       .then(res => res.json())
//       .then(json => {
//         //console.log('audio data==>', json)
//         if (json.status === 'Successfull') {
//           return json;
//         } else {
//           return Alert.alert('', json.message);
//         }
//       })
//       .catch(error => {
//         console.log('response error ===>', error);
//       });
//   } catch (error) {
//     console.log('my error' + error.message);
//   }
//   return api;
// };
export const resetAllExams = id => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + rescheduleExamAll, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        if (json.status === 'Successfull') {
          Alert.alert('Exitosa', 'Todos los exámenes han sido reprogramados');
        } else {
          Alert.alert(
            'Fracasada',
            'Algo salió mal, inténtalo de nuevo más tarde.',
          );
        }
      })
      .catch(error => {
        //console.log("exception error is =>", error)
        dispatch({type: AUTH_LOADING, payload: false});
      });
  };
};
export const getRejectReason = () => {
  return dispatch => {
    dispatch({type: AUTH_LOADING, payload: true});
    fetch(baseUrl + rejectionoptions, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(json => {
        dispatch({type: AUTH_LOADING, payload: false});
        if (json?.status === 'Successfull') {
          dispatch({
            type: REJECT_RESON,
            payload: {
              rejectReason: json?.data,
            },
          });
        }
      })
      .catch(error => {
        console.log('exception error is =>', error);
        dispatch({type: AUTH_LOADING, payload: false});
      });
  };
};
export const updateRejectReason = async (
  description,
  studentId,
  qaId,
  selectedoption,
) => {
  let api;
  console.log(description, studentId, qaId, selectedoption);
  try {
    api = await fetch(baseUrl + questionqueries, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: description,
        studentId: studentId,
        qaId: qaId,
        selectedoption: selectedoption,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('reason data==>', json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};

export const checkPackageExpired = async (
  receipt,
  password,
  isEclude,
  isTest,
  userId,
) => {
  console.log(userId);
  let api;
  try {
    api = await fetch(baseUrl + blocked, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        'receipt-data': receipt,
        password: password,
        'exclude-old-transactions': isEclude,
        userId: userId,
        isTest: isTest,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('===>', json);
        if (json.status === 'Successfull') {
          if (json.is_block) {
            Alert.alert('', json.message);
          }
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};

export const updateSubscription = async (
  userId,
  amount,
  package_tenure,
  package_id,
  paymnet,
) => {
  console.log('data ==>', userId, amount, package_tenure, package_id, paymnet);
  let api;
  try {
    api = await fetch(baseUrl + success, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        amount: amount,
        package_tenure: package_tenure,
        package_id: package_id,
        payment: paymnet,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        if (json.status === 'Successfull') {
          NavigationService.navigate('HomeScreen');
        }
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};

export const deleteMyUser = async userId => {
  console.log('data ==>', userId);
  let api;
  try {
    api = await fetch(baseUrl + deleteuser, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentId: userId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};

export const resetAllActivities = async studentId => {
  let api;
  try {
    api = await fetch(baseUrl + resetallactivites, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};

export const updateUserBaremo = async (studentId, baremo) => {
  let api;
  try {
    api = await fetch(baseUrl + updatebaremo, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        studentId: studentId,
        baremo: baremo,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json?.status === 'Success') {
          Alert.alert('', 'Baremo se actualizó exitosamente.');
        }else {
          Alert.alert('Error', json?.message);
        }
        return json;
      })
      .catch(error => {
        console.log('response error ===>', error);
      });
  } catch (error) {
    console.log('my error' + error.message);
  }
  return api;
};
