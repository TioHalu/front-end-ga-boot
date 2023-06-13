import thunkMiddleware from 'redux-thunk'
const middleware: any[] = [];
if (process.env.NODE_ENV === 'development') {
  middleware.push(thunkMiddleware);
} else {
  middleware.push(thunkMiddleware);
}

export default middleware;
