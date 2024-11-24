
const userDB = require('../classes/User.js');
const context = require('../classes/Context.js');

async function createUser(bot) {
  bot.command('user',(ctx) => {
   
    const id = ctx.update.message.from.id
    context.addContext(ctx.chat.id, id, 'createUser')
    const user = userDB.getUserById(id)

      if(user) {
        const message = `Welcome back, <b>${user.name || 'there'}</b>!\nYour personal daily assistant is ready ! \nHow can I help you today ?`
        ctx.reply(message,  {  parse_mode: 'HTML' })
            context.updateContext(ctx.chat.id, null)
          return 
      }

      const message = `I noticed that you are new, lets create your profile to be more easier to assist you!\n\n
      How can I call you ?`
      ctx.reply(message, {
          parse_mode: 'HTML'
      })

  });


}

function listCommand (bot) {
  bot.command('commands', (ctx) =>  {
        let message = `/start - <b> Welcome Message </b>\n/user -  <b> Check User Data  </b>\n/commands -  <b> List Available Commands  </b>\n/freetalk -  <b>  Just free talk with IA </b>\n/financial -  <b>  Advice about your financial live today </b>\n/readimage -  <b> Send a image and ask-me! </b>`;
        ctx.reply(message, {parse_mode: 'HTML'})
    });
}


module.exports = { createUser, listCommand };