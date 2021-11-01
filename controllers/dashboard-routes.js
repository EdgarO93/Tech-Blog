const router = require('express').Router();
const { Project, User, Comments } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', withAuth, (req, res) => {
    Project.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: [
                'id',
                'name',
                'date_created',
                'description',
                'user_id'
            ],
            include: [{
                    model: Comments,
                    attributes: ['id', 'comments_text', 'project_id', 'user_id',],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                },
                {
                    model: User,
                    attributes: ['name']
                }
            ]
        })
        .then(projectData => {
            const Project = projectData.map(project => project.get({ plain: true }));
            res.render('dashboard', { posts, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/edit/:id', withAuth, (req, res) => {
    Project.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
            'id',
            'name',
            'date_created',
            'description',
            'user_id'
            ],
            include: [{
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'project_id', 'user_id'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        })
        .then(projectData => {
            if (!projectData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }

            const project = projectData.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})
router.get('/new', (req, res) => {
    res.render('new-post');
});



module.exports = router;