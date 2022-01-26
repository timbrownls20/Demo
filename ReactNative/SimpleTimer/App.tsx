import React, {useState} from 'react';
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
        <View style={styles.topContainer}>
          <View style={styles.timerContainer}>
            <Text style={styles.timer}>{count}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
