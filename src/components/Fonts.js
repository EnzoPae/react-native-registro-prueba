import {useFonts} from 'expo-font';

export default function MyFonts() {
  const [fontsLoaded] = useFonts({
    roboto: require('../../assets/fonts/RobotoSlab-VariableFont_wght.ttf'),
  }) 
}
