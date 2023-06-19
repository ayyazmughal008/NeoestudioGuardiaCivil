import {Platform} from 'react-native'

export const fonts = {
  novaRegular: Platform.OS === 'ios' ? 'Proxima Nova' : 'Proxima-Regular',
  novaBold: Platform.OS === 'ios' ? 'Proxima Nova Soft' : 'ProximaNovaSoftW03-Bold',
  elegance: Platform.OS === 'ios' ? 'Rounded Elegance' : 'RoundedElegance-Regular',
  agency: Platform.OS === 'ios' ? 'Agency FB' : 'AGENCYR-Regular',
};
