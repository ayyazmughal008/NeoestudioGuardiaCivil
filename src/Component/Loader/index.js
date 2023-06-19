import HUD, { LoadingHUD } from 'react-native-hud-hybrid';
const loadingHUD = new LoadingHUD();
export const showHUD = (text) => {
    loadingHUD.show(text);
}

export const hideHUD = () => {
    loadingHUD.hideAll();
}