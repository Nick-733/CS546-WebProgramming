import bandRoutes from './bands.js';
import albumRoutes from './albums.js';

const constructorMethod = (app) => {
    app.use('/bands', bandRoutes);
    app.use('/albums', albumRoutes);
    app.use('*', (req, res) => {
        res.status(404).json('404 : Not found');
    });
};

export default constructorMethod;
