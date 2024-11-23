const userDB = require('../classes/User.js');
const context = require('../classes/Context.js');
const axios = require('axios')
require('dotenv').config();
const { API_URL } = process.env

function beginFinancialAdvide (bot) {

    bot.command('financial',async (ctx) => {
   
        const id = ctx.update.message.from.id
        const user = userDB.getUserById(id)
        
        if(!user) {
            const message = `To proccess you need to make login or registration`
            ctx.reply(message, {
                parse_mode: 'HTML'
            })
            return 
        }

        context.addContext(ctx.chat.id, id, 'financialAdvice')


        const body = {"name": user.name, "location":  `${user.city}, ${user.country}`}
        await axios.post(`${API_URL}api/financeFirst`, body, {
       
        }).then(response => {
              
        ctx.reply(response.data.message,  { parse_mode: 'HTML' });

        const message = `<b>What is you salary ? </b> `
        ctx.reply(message, {
            parse_mode: 'HTML'
        })
           
        }).catch(error => {
            console.log(error)
            ctx.reply("<b> Man sorry I'm tired ! I don't want work more today! Kiss",  { parse_mode: 'HTML' });
        })
    
      });



        bot.action('CRYPTO_COIN', (ctx) => requestInvestmentsData(ctx,'Crypto Coins'));
        bot.action('STOCKS', (ctx) => requestInvestmentsData(ctx,'Stocks'));
        bot.action('REAL_STATE', (ctx) => requestInvestmentsData(ctx,'Real State'));
        bot.action('BANK_SAVING', (ctx) => requestInvestmentsData(ctx,'Bank Savings'));

}


async function requestInvestmentsData (ctx, investmentMethodStratagy) {

    const body = {"strategy": investmentMethodStratagy}

    await axios.post(`${API_URL}api/financeInvest`, body, {

    }).then(response => {

        ctx.reply(response.data.message, { parse_mode: 'HTML' });

    }).catch(error => {
        console.log(error)
        ctx.reply("<b> Man sorry I'm tired ! I don't want work more today! Kiss", { parse_mode: 'HTML' });
    })
}


module.exports = { beginFinancialAdvide };