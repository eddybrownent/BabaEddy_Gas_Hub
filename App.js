// eslint-disable-next-line no-unused-vars
import { Provider } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import Navigation from './navigation';
import { store } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation/>
    </Provider>
  );
}
