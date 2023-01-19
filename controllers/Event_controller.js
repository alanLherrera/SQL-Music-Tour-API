const Events = require('express').Router()
const db = require('...models')
const { application } = require('express')
const { Band, MeetGreet, Event, Time } = db

const eventsController = require('./controllers/events_controller')
app.use('/event', events_controller) 

//find by name
Events.get('/:name', async (req, res) => {
  try{
    const foundEvent = await Event.findOne({
      where: { name: req.params }
    })
    res.status(200).json(foundEvent)
  } catch (error) {
    res.status(500).json(error)
  }
})


// find a specific event
Events.get('/:id', async (req, res) => {
  try{
    const foundEvent = await Event.findOne({
      where: { event_id: req.params.id},
      inculde: [
        {
          model: MeetGreet, 
          as: "meet_greets",
          include: { 
           model: Event, 
           as: "event",
           where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%`}}
           }
         }
      ]
    })
    res.status(200).json(foundEvent)
  } catch (error){
    res.status(500).json(error)
  }
})


//create event
Event.post('/', async (req, res) => {
  try{
    const newEvent = await Event.create(req.body)
    res.status(200).json({
      message : 'New Event added!',
      data: newEvent
    })
  } catch (error){
    res.status(500).json(err)
  }
})

//find all events
Events.get('/', async(req, res) => {
  try{
    const foundEvents = await Events.findAll({
      order: [ [ 'available_start_time', 'ASC' ]],
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%`}
      }
    })
    res.status(200).json(foundEvents)
  } catch (error){
    res.status(500).json(error)
  }
})

module.export = Events