import { useFonts } from 'expo-font';

import { Main } from './src/Main';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [isFontLoaded] = useFonts({
    'GeneralSans-400': require('../app/src/assets/fonts/GeneralSans-Regular.otf'),
    'GeneralSans-600': require('../app/src/assets/fonts/GeneralSans-Semibold.otf'),
    'GeneralSans-700': require('../app/src/assets/fonts/GeneralSans-Bold.otf'),
  });

  if (!isFontLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Main />
    </>
  );
}
