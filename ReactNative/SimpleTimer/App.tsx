import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [count, setCount] = useState(0);
  const [timerOn, setTimerOn] = useState(true);

  let touchY: number;
  let touchX: number;

  useEffect(() => {
    console.log(`timer on ${timerOn}`);

    let handler: NodeJS.Timer;

    if (timerOn) {
      handler = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(handler);
      console.log('unmount');
    };
  }, [timerOn]);

  const styles = StyleSheet.create({
    topContainer: {
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    timerContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    timer: {
      fontSize: 128,
      fontWeight: '800',
    },
    backgroundStyle: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1,
    },
    scrollViewStyle: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      height: '100%',
    },
    contentControllerStyle: {
      flex: 1,
      backgroundColor: 'yellow',
    },
  });

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.contentControllerStyle}>
        <View
          style={styles.topContainer}
          onTouchStart={e => {
            touchX = e.nativeEvent.pageX;
            touchY = e.nativeEvent.pageY;
          }}
          onTouchEnd={e => {
            if (
              Math.abs(touchY - e.nativeEvent.pageY) > 20 ||
              Math.abs(touchX - e.nativeEvent.pageX) > 20
            ) {
              //swiped
              setCount(0);
              setTimerOn(false);
            } else {
              //touched
              setTimerOn(!timerOn);
            }
          }}>
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>{count}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
