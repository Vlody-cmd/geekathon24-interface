const { Markup } = require('telegraf');
 
 function  startCommand (bot)  {
    bot.start((ctx) =>  {
        const message = `Welcome back, <b>${ctx.from.first_name || 'there'}</b>!\n Your personal daily assistant is ready ! \nHow can I help you today ?`
        ctx.reply(message,  { 
           ...Markup.inlineKeyboard([
                Markup.button.callback('Available Commands', 'LIST_AVAILABLE_COMMANDS'),
              ]),
            parse_mode: 'HTML' })
    });
}

function list_commands (bot) {
    bot.action('LIST_AVAILABLE_COMMANDS', (ctx) =>  {
        const commands = `/start - <b> Restar the bot </b>\n/commands -  <b>  Show this list of commands  </b>\n/help -  <b>  Get more information  </b>\n/about -  <b>  Learn about this bot </b>\n/modules -  <b>  List available modules  </b>\n/free_talk -  <b>  Free talk with  </b>`;
        ctx.reply(commands, {parse_mode: 'HTML'})
});
}

module.exports = { startCommand, list_commands };