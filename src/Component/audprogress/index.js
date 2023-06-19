import React, { useState } from 'react'
import { View, Text, Platform } from 'react-native'
import TrackPlayer, { getDuration } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
let handler = require('./handler_s.png');
import { useProgress } from 'react-native-track-player';
import { heightPercentageToDP, widthPercentageToDP } from '../MakeMeResponsive';

const ProgressBar = () => {
    const [isSeeking, setIsSeeking] = useState(false);
    const [seek, setSeek] = useState(0);

    const progress = useProgress();
    const { duration, position } = progress;
    // let duration = this.state.duration
    // let tot = this.formatTime(duration)

    function formatTime(position) {
        let cur = position
        let nmin = parseInt(cur / 60)
        let min = ("0" + parseInt(cur / 60)).slice(-2)
        let sec = ("0" + parseInt(cur - nmin * 60)).slice(-2)
        return min + ':' + sec
    }
    let tot = formatTime(duration)
    return (
        <View>
            <Text
                style={{
                    fontSize: widthPercentageToDP(4),
                    width: widthPercentageToDP(80),
                    textAlign: "right"
                }}>
                {formatTime(position)} /{tot}
            </Text>
            <Slider
                trackStyle={{
                    backgroundColor: "#6A6B6F",
                    height: heightPercentageToDP(10),
                    borderRadius: widthPercentageToDP(2),
                    borderBottomWidth: widthPercentageToDP(1),
                    borderBottomColor: "#ffffff"
                }}
                minimumValue={0}
                maximumValue={duration}
                minimumTrackTintColor="#007EBA"
                maximumTrackTintColor="#6A6B6F"
                thumbImage={handler}
                thumbStyle={{
                    width: widthPercentageToDP(65),
                    height: heightPercentageToDP(25),
                    backgroundColor: "transparent"
                }}
                value={position}
                onValueChange={(value) => {
                    //TrackPlayer.pause();
                    //setIsSeeking(true);
                    setSeek(value);
                }}
                onSlidingComplete={(value) => {
                    TrackPlayer.seekTo(value);
                    //TrackPlayer.play();
                }}
            />
        </View>

    );
};

export default ProgressBar;