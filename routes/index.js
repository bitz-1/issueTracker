const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');


router.get('/',homeController.homeController);
router.get('/listproject',homeController.listprojectController);
router.post('/process-project',homeController.postProjectController);
router.get('/projectdetails',homeController.projectDetails);
router.get('/projectdetails/riseissue/:id',homeController.riseIssue);
router.post('/projectdetails/riseissue/:id/submit_issue',homeController.riseIssueADD)

router.get('/api/v1',homeController.getAllProjects);

router.get('api/v1',homeController.getAllProjects);

router.post('/projectdetails/search',homeController.searchProject);



console.log('Router Loaded');



    
module.exports = router;
