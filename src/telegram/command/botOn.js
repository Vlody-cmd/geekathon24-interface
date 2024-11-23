const axios = require('axios')
require('dotenv').config();
const { API_URL } = process.env

const context = require('../classes/Context.js');
const userDB = require('../classes/User.js');
const userState = {}

function botOn (bot) {

    bot.on('text',  (ctx) => {

        const chatId = ctx.chat.id;

        const contextData = context.getContextById(chatId)

        if(!contextData) return 

        switch(contextData.command) {
            case 'createUser': 
                registerUserData(ctx)
            break;

            case 'freeTalk': 
                talkFreeOpenIA(ctx)
            break;

            default: 
            ctx.reply('Please Select one of the options available!');
            console.log('Not recognise')
            break;
        }
        
     
        
    });

}

async function talkFreeOpenIA (ctx) {
    const chatId = ctx.chat.id;

    if(ctx.message.text.toLowerCase() === 'exit') {
        ctx.reply(`Thanks Have a good day!`);
        delete context.deleteContext(chatId)
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
}

function registerUserData (ctx) {
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






module.exports = { botOn  };