import { render } from './lib/render';
import Dashboard from './views/containers/dashboard';
//import Test from './views/Test';

import 'babel-polyfill';
import '../style/common.styl';

render(Dashboard(), document.getElementById('app'));
