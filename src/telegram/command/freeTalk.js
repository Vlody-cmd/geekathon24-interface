const axios = require('axios')
require('dotenv').config();
const { API_URL } = process.env

const sessionFreeTalk = {}

function freeTalk(bot) {
    bot.command('free_talk', (ctx) => {
        const chatId = ctx.chat.id;
        ctx.reply('Ask me everything that you want ! Or type <b> exit </b> to finish our chat', { parse_mode: 'HTML' })

        sessionFreeTalk[chatId] = true
    });


    bot.on('text', async (ctx) => {

        const chatId = ctx.chat.id;

        if(ctx.message.text.toLowerCase() === 'exit') {
            ctx.reply(`Thanks Have a good day!`);
            delete sessionFreeTalk[chatId]
        }

        if (!sessionFreeTalk[chatId]) {
            return
        }

        const body = {"question": ctx.message.text }

        await axios.post(`${API_URL}/api/chat`, body, {
           
        }).then(response => {
              
        ctx.reply(response.data.message,  { parse_mode: 'HTML' });
           
        }).catch(error => {
            console.log(error)
            ctx.reply("<b> Man sorry I'm tired ! I don't want work more today! Kiss",  { parse_mode: 'HTML' });
        })
    })
}


module.exports = { freeTalk };