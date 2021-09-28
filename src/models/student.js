const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const StudentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    dob: {
      type:Date,
      required: true
    },
    course: {
      type: String,
      required: true
    },
    hours: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
StudentSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Student', StudentSchema)
