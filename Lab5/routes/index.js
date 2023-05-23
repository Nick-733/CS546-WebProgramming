import routes from './routes.js';

const constructorMethod = (app) => {
  app.use('/', routes);

  app.use('*', (req, res) => {
    res.status(404).json('404 : Not found');
  });
};

export default constructorMethod;
