var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var validateSession = require('../middleware/validate-session')
var User = sequelize.import('../models/user.js');
var ProjectModel = sequelize.import('../models/project.js');


router.post('/', validateSession, function (req, res) {

    ProjectModel.create({
            projectTitle: req.body.project.projectTitle, 
            projectDescription: req.body.project.projectDescription,
            itemTitleMain: req.body.project.itemTitleMain,
            itemGroupHeader: req.body.project.itemGroupHeader,
            item: req.body.project.item,
            member: req.user.id
        })
        .then(
            function createSuccess(project) {
                res.json({
                    project: project
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
    })


router.get('/', validateSession, function (req, res) {

    ProjectModel
        .findAll({
            where: { member: req.user.id }
        })
        .then(
            function findAllSuccess(project) {
                res.json(project);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
})



router.get('/:id', validateSession, function (req, res) {

    ProjectModel
        .findOne({
            where: { id: req.params.id, member: req.user.id }
        })
        .then(
            function findOneSuccess(project) {
                res.json(project);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
})



router.put('/:id', validateSession, function (req, res) {

    ProjectModel
        .update({
            projectTitle: req.body.project.projectTitle,
            projectDescription: req.body.project.projectDescription,
            itemTitleMain: req.body.project.itemTitleMain,
            itemGroupHeader: req.body.project.itemGroupHeader,
            item: req.body.project.item
        },
        { where: { id: req.params.id } }
        )
        .then(
            function updateSuccess(project) {
                res.json({
                    project: project
                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        );
})


router.delete('/:id', validateSession, function (req, res) {

    ProjectModel
        .destroy({
            where: { id: req.params.id, member: req.user.id }
        })
        .then(
            function deleteLogSuccess(project) {
                res.send("This Post Has Been Removed");
            },
            function deleteLogError(err){
                res.send(500, err.message);
            }
        );
})



module.exports = router;