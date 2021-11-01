const router = require('express').Router();
const { Project, User,Comments  } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all users
router.get('/', (req, res) => {
  console.log('getting users');
  Project.findAll({
      attributes: [
          'id',
          'name',
          // 'date_created',
          'description'
      ],
    // order: [['date_created', 'DESC']],
    include: [
      {
        model: Comments,
        attributes: ['id', 'comments_text', 'project_id', 'user_id',],
      },
      {
        model: User,
        attributes: ['name']
      },
    ]
  })
    .then(projectData => res.json(projectData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Project.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'name',
      'date_created',
      'description',
      'user_id',
    ],
    include: [
      {
        model: User,
        as:"user",
        attributes: ['name']
      },
    ],
    include: [
      {
        model: Comments,
        as: "comments",
        attributes: ["id", "comments_text", "user_id"],
      },
    ],
  })
    .then(projectData => {
      if (!projectData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(projectData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
