const { Markup } = require('telegraf');
const userDB = require('../classes/User.js');
const context = require('../classes/Context.js');

async function createUser(bot) {
  bot.command('start',(ctx) => {
   
    const id = ctx.update.message.from.id
    context.addContext(ctx.chat.id, id, 'createUser')
    const user = userDB.getUserById(id)

      if(user) {
        const message = `Welcome back, <b>${user.name || 'there'}</b>!\nYour personal daily assistant is ready ! \nHow can I help you today ?`
        ctx.reply(message,  {  parse_mode: 'HTML' })
            context.updateContext(ctx.chat.id, null)
          return 
      }

      const message = `Welcome, <b>${ctx.from.first_name || 'there'}</b>!\nI'm Boddy your personal daily assistant ! \n I noticed that you are new, lets create your profile to be more easier to assist you!\n\n
      How can I call you ?`
      ctx.reply(message, {
          parse_mode: 'HTML'
      })

  });


}

function listCommand (bot) {
  bot.command('commands', (ctx) =>  {
        let message = `/start - <b> Restar the bot </b>\n/commands -  <b>  Show this list of commands  </b>\n/help -  <b>  Get more information  </b>\n/about -  <b>  Learn about this bot </b>\n/modules -  <b>  List available modules  </b>\n/free_talk -  <b>  Free talk with  </b>`;
        ctx.reply(message, {parse_mode: 'HTML'})
    });
}


module.exports = { createUser, listCommand };