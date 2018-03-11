import dva from 'dva';
import createLoading from 'dva-loading';
import models from './models';
import { browserHistory } from 'dva/router';
import { message } from 'antd';
import './index.css';

// 1. Initialize
const app = dva({
    history: browserHistory,
    onError(e) {
        message.error(e.message);
    }
});

// 2. Plugins
app.use(createLoading({ effects: true }));
// 3. Model
models.forEach((m) => {
    app.model(m);
  });

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
