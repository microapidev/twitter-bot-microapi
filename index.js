const Twit = require('twit')
const config = require('./config/config')

const T = new Twit(config)


const stream = T.stream('statuses/filter', { track: '@HNGi'||'HNG'||'#HNG' })//Track for mentions
stream.on('tweet', tweetEvent)


function tweetEvent(eventMsg, error) {
    T.post('statuses/retweet/:id', { id: eventMsg.id }, (err, data, response)=>{
        if (err){
            process.exit(0)
        }
        return data
    })
    
    if(error) {
        process.exit(0)
        throw new Error("encountered an error")
    }
}


module.exports = {
    tweetEvent
}
