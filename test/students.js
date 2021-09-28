/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const Student = require('../src/models/student')
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const www = require('../bin/www')
// eslint-disable-next-line no-unused-vars
const should = chai.should()

const createdID = []
const firstName = faker.random.words();
const lastName = faker.random.words();
const dob = new Date().toISOString();
const course = faker.random.words();
const hours = faker.random.number();
const price = faker.random.number();
const newFirstName = faker.random.words()


chai.use(chaiHttp)

describe('*********** Students ***********', () => {

  describe('/GET students', () => {

    it('it should GET all the students', (done) => {
      chai
        .request(www)
        .get('/students/all')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('array')
          done()
        })
    })
  })

  describe('/POST student', () => {
    it('it should NOT POST a student without name', (done) => {
      const student = {}
      chai
        .request(www)
        .post('/students')
        .send(student)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a student ', (done) => {
      const student = {
        firstName,
        lastName,
        dob,
        course,
        price,
        hours
      }
      chai
        .request(www)
        .post('/students')
        .send(student)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'firstName')
          createdID.push(res.body._id)
          done()
        })
    })
  })

  describe('/PATCH/:id student', () => {
    it('it should UPDATE a student given the id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(www)
        .patch(`/students/${id}`)
        .send({
          firstName: newFirstName
        })
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('firstName').eql(newFirstName)
          done()
        })
    })
  })

  describe('/DELETE/:id student', () => {
    it('it should DELETE a student given the id', (done) => {
      const student = {
        firstName,
        lastName,
        dob,
        course,
        price,
        hours
      }
      chai
        .request(www)
        .post('/students')
        .send(student)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'firstName')
          res.body.should.have.property('firstName').eql(firstName)
          chai
            .request(www)
            .delete(`/students/${res.body._id}`)
            .end((error, result) => {
              result.should.have.status(200)
              result.body.should.be.a('object')
              result.body.should.have.property('msg').eql('DELETED')
              done()
            })
        })
    })
  })

  after(() => {
    createdID.forEach((id) => {
      Student.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
