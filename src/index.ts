import { Client } from 'tmi.js'
import consts from './utils/consts'
import variables from './utils/variables'
import isRussianMessage from './utils/isRussianMessage'

const client = Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: consts.username,
    password: variables.password
  },
  channels: [variables.channel]
})

client.connect()

client.on('message', (channel, tags, message, self) => {
  if (self) return
  if (isRussianMessage(message) && typeof tags.id === 'string') {
    client.deletemessage(channel, tags.id)
    client.say(channel, `Keep conversations in English, @${tags.username}`)
  }
})