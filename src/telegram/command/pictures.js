
require('dotenv').config();

const axios = require('axios')
require('dotenv').config();
const { API_URL } = process.env

const userDB = require('../classes/User.js');
const context = require('../classes/Context.js');

function askMyImage (bot) {
    bot.command('readimage', async (ctx) => {

        const id = ctx.update.message.from.id
        
        const user = userDB.getUserById(id)
 
        if(!user) {
            ctx.reply('Please make a registration first to performe this action!', { parse_mode: 'HTML' })
            return 
        }

        const chatId = ctx.chat.id;
        await ctx.reply('Upload a image that you want ...', { parse_mode: 'HTML' })
        context.addContext(chatId, id, 'readImage')

    });


    bot.command('readimag', async (ctx) => {

        const id = ctx.update.message.from.id
        
        const user = userDB.getUserById(id)
 
        if(!user) {
            ctx.reply('Please make a registration first to performe this action!', { parse_mode: 'HTML' })
            return 
        }

        const chatId = ctx.chat.id;
        await ctx.reply('Upload a image that you want ...', { parse_mode: 'HTML' })
        context.addContext(chatId, id, 'readImageGeek')

    });



}


module.exports = { askMyImage };