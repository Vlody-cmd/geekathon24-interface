
require('dotenv').config();

const userDB = require('../classes/User.js');
const context = require('../classes/Context.js');

function freeTalk(bot) {
    bot.command('free_talk', (ctx) => {

        const id = ctx.update.message.from.id
        
        const user = userDB.getUserById(id)
 
        if(!user) {
            ctx.reply('Please make a registration first to see all options!', { parse_mode: 'HTML' })
            return 
        }

        const chatId = ctx.chat.id;
        ctx.reply('Ask me everything that you want ! Or type <b> exit </b> to finish our chat', { parse_mode: 'HTML' })
        context.addContext(ctx.chat.id, id, 'freeTalk')

    });

}


module.exports = { freeTalk };