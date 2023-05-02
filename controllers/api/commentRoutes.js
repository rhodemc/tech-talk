const router = require('express').Router();
const { Comment } = require('../../models');

// POST new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update comment
// might not need this route
// might need to update code
// router.put('/:id', async (req, res) => {
//   try {
//     const updateComment = await Comment.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     });

//     if (!updateComment) {
//       res.status(404).json({ message: 'No comment found with this id!' });
//       return;
//     }

//     res.status(200).json(updateComment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// DELETE comment
// might not need this route
// might need to update code
// router.delete('/:id', async (req, res) => {
//   try {
//     const deleteComment = await Comment.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!deleteComment) {
//       res.status(404).json({ message: 'No comment found with this id!' });
//       return;
//     }

//     res.status(200).json(deleteComment);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
