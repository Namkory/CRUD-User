import express from 'express';
import homeController from '../controller/homeController';

let router = express.Router();

const initWebRoute = (app) => {
    // app.METHOD(PATH, HANDLER)

    router.get('/', homeController.getHomePage);
    router.get('/detail/user/:id', homeController.getDetailPage);

    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.editUser);
    router.post('/update-user', homeController.updateUser);

    router.get('/view', homeController.getViewPage);

    return app.use('/', router);
};

module.exports = initWebRoute;
