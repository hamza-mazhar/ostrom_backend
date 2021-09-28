const controller = require('../../controllers/students')
const validate = require('../../controllers/students.validate')
const express = require('express')
const router = express.Router()
const trimRequest = require('trim-request')

/*
 * Students routes
 */

/*
 * Get all items route
 */
router.get('/all', controller.getAllItems)


/*
 * Create new item route
 */
router.post(
  '/',
  trimRequest.all,
  validate.createItem,
  controller.createItem
)


/*
 * Update item route
 */
router.patch(
  '/:id',
  trimRequest.all,
  validate.updateItem,
  controller.updateItem
)

/*
 * Delete item route
 */
router.delete(
  '/:id',
  trimRequest.all,
  validate.deleteItem,
  controller.deleteItem
)

module.exports = router
