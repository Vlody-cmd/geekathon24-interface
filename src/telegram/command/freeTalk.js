function freeTalk(bot) {
    bot.command('free_talk', (ctx) => {
        ctx.reply('Ask me everything that you want ! Or type <b> exit </b> to finish our chat', { parse_mode: 'HTML' })

        bot.on('text', (ctx) => {

            if (ctx.message.text.toLowerCase() === 'exit') {
                ctx.reply(`Thanks Have a good day!`);
                return
            }

            const number = Math.floor(Math.random() * 25);

            // ! REQUEST IA TO GET THE RESPONSE
            ctx.reply(`${number}, anything else ?`);

        })

    });

}


module.exports = { freeTalk };