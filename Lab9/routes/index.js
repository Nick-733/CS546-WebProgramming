import textAnalyzerRoutes from './textanalyzer.js';

const constructorMethod = (app) => {
    app.use('/', textAnalyzerRoutes);
    app.use('*', (req, res) => {
        res.status(404).json('404 : Not found');
    });
};

export default constructorMethod;