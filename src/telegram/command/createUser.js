const { saveNewUser } = require('../requests/user.js')
const { Markup } = require('telegraf');

const userState = {}

async function createUser(bot) {
    bot.start((ctx) => {
        userState[ctx.chat.id] = { step: 'askName' };
        const message = `Welcome, <b>${ctx.from.first_name || 'there'}</b>!\nI'm Boddy your personal daily assistant ! \n I noticed that you are new, lets create your profile to be more easier to assist you!\n\n
        How can I call you ?`
        ctx.reply(message, {
            parse_mode: 'HTML'
        })
    });

    let finishData = false
    //! MISSING VALIDATIONS ON INPUT DATA
    bot.on('text', async (ctx) => {

        if (finishData) {
            ctx.reply('Thank you! Your use already created. Provide you email to login!');
            return
        }

        const chatId = ctx.chat.id;

        if (userState[chatId]?.step === 'askName') {
            userState[chatId].name = ctx.message.text;
            userState[chatId].step = 'askEmail';
            ctx.reply('Great! Now, can you share your email address?');
        } else if (userState[chatId]?.step === 'askEmail') {
            userState[chatId].email = ctx.message.text;
            userState[chatId].step = 'askCountry';
            ctx.reply('Thanks! Please provide on which country do live now');
        } else if (userState[chatId]?.step === 'askCountry') {
            userState[chatId].country = ctx.message.text;
            userState[chatId].step = 'askCity';
            ctx.reply('Thanks! Please provide on which city');
        } else if (userState[chatId]?.step === 'askCity') {
            userState[chatId].city = ctx.message.text;
            userState[chatId].step = 'askCity';
            const { name, email, country, city } = userState[chatId];

            // Clear state and confirm details
            ctx.reply(
                `Thanks for the information!\n\nName: ${name}\nEmail: ${email}\Location: ${country}, ${city}`
            );

            await saveNewUser(userState[chatId])

            delete userState[chatId];
  
            finishData = true
        } else {
            ctx.reply('I didn’t understand that. Start by typing /start.');
        }

    });

}


module.exports = { createUser };