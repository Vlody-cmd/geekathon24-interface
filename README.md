# Geekathon24-interface


## Project description
This project is an AI-powered application designed to tackle everyday challenges with intelligent, tailored solutions. Leveraging the power of artificial intelligence, the application responds directly to user needs through a modular API structure. Each module specializes in a specific domain, offering precise and effective assistance.

Users can interact with the system via a user-friendly Telegram bot, where the real magic happens. Each module is guided by a specialized prompt that leads users through a series of relevant questions. Based on their responses, the AI generates a customized solution that precisely addresses their requirements. This streamlined process ensures a seamless and highly personalized experience, making complex problem-solving accessible and efficient for everyone.


## General description of repository
- A project with isolated Lambda functions to handle connections from various messaging platforms, such as Telegram, WhatsApp, Discord, Ryacast, etc.
- Integration with an LLM (Large Language Model) to process and resolve user requests.
- This solution allows the implementation of isolated, serverless functions tailored to each platform.


## How to sart
- Before run this project, check the readme on geekathon24-modules, and make it working

-  ### Telegram
    Inside src/telegram crate .env file and request the API keys to run it local
-   Clone the project from the repo https://github.com/Vlody-cmd/geekathon24-interface.git
    ```bash
     git clone https://github.com/Vlody-cmd/geekathon24-interface.git

     cd geekathon24-iinterface/src/telegram
    ```

- Install package modules and run 
     ```bash
     npm i

     npm run telegram
    ```
- After success run, open https://t.me/bonny252_bot, this is a link to the telegram bot that will hellp you test our endpoints 

## Available enpoints 
- ### Online
    - We use unique link to performance the webhooks from telegram bot and parse the command request 

- ### Local
    - Start a function the make a bot still listing for interactions
   -  https://8kb1qzbfr7.execute-api.us-west-2.amazonaws.com/Prod/webhook



## Available commands on telegram
- /start
    - Display Welcome Message 
- /user
    - Check your user if not exist will ask you couple questions to create it 
- /commands 
    - List available commands 
- /freetalk
    - Just talk about everything with the bot
- /financial 
    - After ask you couple questions will give you some advice about    financial state of you current location
-  /readimage 
    - Give answer to your question about a image that you submit 