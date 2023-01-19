//Dependencies
const bands = require('express').Router()
const db = require('...models')
const { Band, MeetGreet, Event, Time } = db

//Controllers
const bandsController = require('./constrollers/bands_controller')
app.use('/bands', bandsController)




bands.get('/:name', async (req, res) => {
  try{
    const foundBand = await Band.findOne({
      where: { name: req.params.name }

    })
    res.status(200).json(foundBand)
  } catch (error) {
    res.status(500).json(error)
  }
})


// FIND A SPECIFIC BAND
bands.get('/:id', async (req, res) => {
  try {
      const foundBand = await Band.findOne({
          where: { band_id: req.params.id },
          include: [
            {
             model: MeetGreet, 
             as: "meet_greets",
             include: { 
              model: Event, 
              as: "event",
              where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
              }
            },
            {
              model: Time,
              as: "time",
              include: { 
                model: Event, 
                as: "event"},
                where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
            }
          ]
      })
      res.status(200).json(foundBand)
  } catch (error) {
      res.status(500).json(error)
  }
})

// CREATE A BAND
bands.post('/', async (req, res) => {
  try {
      const newBand = await Band.create(req.body)
      res.status(200).json({
          message: 'Successfully inserted a new band',
          data: newBand
      })
  } catch(err) {
      res.status(500).json(err)
  }
})
// FIND ALL BANDS
bands.get('/', async (req, res) => {
  try {
      const foundBands = await Band.findAll({
        order: [ [ 'available_start_time', 'ASC' ]],
        where: {
          name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
        }
      })
      res.status(200).json(foundBands)
  } catch (error) {
      res.status(500).json(error)
  }
})

//Export
module.export = bands