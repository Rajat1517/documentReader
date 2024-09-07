import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export function useSwipe(onSwipeLeft, onSwipeRight, rangeOffset = 6) {

    let firstTouch = 0;
    
    function onTouchStart(e) {
        firstTouch = e.nativeEvent.pageX;
    }

    function onTouchEnd(e){

        const positionX = e.nativeEvent.pageX;
        const range = windowWidth / rangeOffset;
        if(positionX - firstTouch > range){
            onSwipeRight();
        }
        else if(firstTouch - positionX > range){
            onSwipeLeft();
        }
    }

    return {onTouchStart, onTouchEnd};
}