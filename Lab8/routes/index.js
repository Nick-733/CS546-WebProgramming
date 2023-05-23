import venueRoutes from './venues.js';

const constructorMethod = (app) => {
    app.use('/', venueRoutes);
    app.use('*', (req, res) => {
        res.status(404).json('404 : Not found');
    });
};

export default constructorMethod;