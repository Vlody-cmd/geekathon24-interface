const axios = require('axios')
require('dotenv').config();
const { API_URL } = process.env
const { Markup } = require('telegraf');

const context = require('../classes/Context.js');
const userDB = require('../classes/User.js');
const userState = {}

function botOn(bot) {

    bot.on('text', (ctx) => {

        const chatId = ctx.chat.id;

        const contextData = context.getContextById(chatId)

        console.log(contextData)

        if (!contextData) return

        switch (contextData.command) {
            case 'createUser':
                registerUserData(ctx)
                break;

            case 'freeTalk':
                talkFreeOpenIA(ctx)
                break;

            case 'financialAdvice':
                financialAdviceData(ctx)
                break;

            default:
                ctx.reply('Please Select one of the options available!');
                console.log('Not recognise')
                break;
        }



    });

}

async function financialAdviceData(ctx) {
    const chatId = ctx.chat.id;

    if (!userState[chatId]) {
        userState[chatId] = { step: 'salary' }
    }

    const step = userState[chatId].step


    const response = ctx.message.text;

    //  {"salary": "1000", "rent": "500", "familyMembers": "1", "electricity": "50", "gas": "30", "water": "20", "internet": "20", "communications": "15"}
    switch (step) {
        case 'salary':

            if (isNaN(parseFloat(response))) {
                ctx.reply(`Please Provide a valid number !`);
                return
            }

            userState[chatId].salary = response
            userState[chatId].step = 'rent'
            ctx.reply(`How much you spend on rent ?`);
            break

        case 'rent':
            if (isNaN(parseFloat(response))) {
                ctx.reply(`Please Provide a valid number !`);
                return
            }

            userState[chatId].rent = response
            userState[chatId].step = 'familyMembers'
            ctx.reply(`How many members do your family have ?`);
            break

        case 'familyMembers':
            if (isNaN(parseFloat(response))) {
                ctx.reply(`Please Provide a valid number !`);
                return
            }

            userState[chatId].familyMembers = response
            userState[chatId].step = 'electricity'
            ctx.reply(`How much you pay for eletrecity ?`);
            break

        case 'electricity':
            if (isNaN(parseFloat(response))) {
                ctx.reply(`Please Provide a valid number !`);
                return
            }

            userState[chatId].electricity = response
            userState[chatId].step = 'gas'
            ctx.reply(`How much you pay for gas ?`);

            break

        case 'gas':

            if (isNaN(parseFloat(response))) {
                ctx.reply(`Please Provide a valid number !`);
                return
            }

            userState[chatId].gas = response
            userState[chatId].step = 'water'
            ctx.reply(`How much you pay for water ?`);
            break

        case 'water':
            if (isNaN(parseFloat(response))) {
                ctx.reply(`Please Provide a valid number !`);
                return
            }

            userState[chatId].water = response
            userState[chatId].step = 'internet'
            ctx.reply(`How much you pay for internet ?`);
            break


        case 'internet':
            if (isNaN(parseFloat(response))) {
                ctx.reply(`Please Provide a valid number !`);
                return
            }

            userState[chatId].internet = response
            userState[chatId].step = 'communications'
            ctx.reply(`How much you pay for communications ?`);
            break


        case 'communications':

            if (isNaN(parseFloat(response))) {
                ctx.reply(`Please Provide a valid number !`);
                return
            }

            userState[chatId].communications = response
            userState[chatId].step = 'communications'
            

            console.log(userState[chatId])
            await axios.post(`${API_URL}api/financeSecond`,  userState[chatId], {

            }).then(async (response) => {
        
                ctx.reply(response.data.message, { parse_mode: 'HTML' });

                userState[chatId].step = 'investmentMethod'
                ctx.reply(
                    'Choose Investment method!',
                    Markup.inlineKeyboard([
                      [Markup.button.callback('Crypto Coin', 'CRYPTO_COIN')],
                      [Markup.button.callback('Stocks', 'STOCKS')],
                      [Markup.button.callback('Real State', 'REAL_STATE')],
                      [Markup.button.callback('Bank Savings', 'BANK_SAVING')]
                    ])
                  );
        
                delete userState[chatId]
                delete context.deleteContext(chatId)
            }).catch(error => {
                console.log(error)
                ctx.reply("<b> Man sorry I'm tired ! I don't want work more today! Kiss", { parse_mode: 'HTML' });
            })

            break;

    }
}

async function talkFreeOpenIA(ctx) {
    const chatId = ctx.chat.id;

    if (ctx.message.text.toLowerCase() === 'exit') {
        ctx.reply(`Thanks Have a good day!`);
        delete context.deleteContext(chatId)
        return
    }

    const body = { "question": ctx.message.text }

    await axios.post(`${API_URL}api/chat`, body, {

    }).then(response => {

        ctx.reply(response.data.message, { parse_mode: 'HTML' });

    }).catch(error => {
        console.log(error)
        ctx.reply("<b> Man sorry I'm tired ! I don't want work more today! Kiss", { parse_mode: 'HTML' });
    })
}

function registerUserData(ctx) {
    const chatId = ctx.chat.id;

    if (!userState[chatId]) {
        userState[chatId] = {}
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
            `Thanks for the information!\n\nName: ${name}\nEmail: ${email}\Location: ${country}, ${city}\n Your account create success!`
        );

        const id = ctx.update.message.from.id
        userDB.addUser(id, name, email, country, city)
        delete userState[chatId];
        context.deleteContext(ctx.chat.id)
        return
    } else {
        ctx.reply('I didn’t understand that. Start by typing /start.');
    }

}






module.exports = { botOn };