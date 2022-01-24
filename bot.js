const { Telegraf, Markup } = require('telegraf'); // importazione libreria telegraf

const bot = new Telegraf('5182637387:AAH0To1Xx3UTa9GlDBL81DYVnaB5Qdv4gmA') // collegamento al bot tramite token

const helpMessage = `
/start avvia il bot 
/play avvia la partita
/settings modifica le impostazioni della partita
/reset torna alle impostazioni di default`

let BestOf = 3;
let P_Score = 0;
let CPU_Score = 0;
let Player_Username = "Player"

bot.start((ctx) => {
    console.log(ctx.from, Date())
    ctx.reply('Ciao '+ ctx.message.from.first_name +'! sono il bot telegram del progetto. Digita /help per la lista dei comandi')
    let msg = 'Gioca a sasso carta forbice!';
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "Play",
                        callback_data: 'play'
                    },
                    {
                        text: "Impostazioni",
                        callback_data: 'settings'
                    }
                ],
            ]
        }
    }) 
})

bot.action('play', (ctx) => {
    let msg = `gioca a sasso carta forbice:`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "✊",
                        callback_data: 'rock'
                    },
                    {
                        text: "🖐",
                        callback_data: 'paper'
                    },
                    {
                        text: "✌️",
                        callback_data: 'scissors'
                    }
                ],
            ]
        }
    }) 
    bot.telegram.sendMessage(ctx.chat.id, `SCORE ATTUALE:\n` + Player_Username + `:\t`+ P_Score + `\nBot:\t` + CPU_Score)
})

bot.action('settings', (ctx) => {
    let msg = 'Modifica le impostazioni della partita:';
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "Modifica Username",
                        callback_data: 'user_data'
                    },
                    {
                        text: "Modifica round per vincere",
                        callback_data: 'BestOf'
                    },
                    {
                        text: "Torna indietro",
                        callback_data: 'go_back'
                    }
                ],
            ]
        }
    }) 
})

bot.hears(/help/i, ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, helpMessage)
})

bot.command('help', ctx => {
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, helpMessage)
})

bot.command('reset', ctx => {
    ctx.deleteMessage();
    BestOf = 0;
    Player_Username = "Player";
    bot.telegram.sendMessage(ctx.chat.id, "Le impostazioni sono tornate a quelle default.")
})

bot.command('settings', (ctx) => {
    let msg = 'Modifica le impostazioni della partita:';
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "Modifica Username",
                        callback_data: 'user_data'
                    },
                    {
                        text: "Modifica round per vincere",
                        callback_data: 'BestOf'
                    },
                    {
                        text: "Torna indietro",
                        callback_data: 'go_back'
                    }
                ],
            ]
        }
    }) 
})

bot.action('user_data', ctx => {
    ctx.telegram.sendMessage(ctx.chat.id, "scrivi '/setname nomeplayer' per cambiare nome")
})

bot.action('BestOf', ctx => {
    ctx.telegram.sendMessage(ctx.chat.id, "scrivi '/setround numeroround' per cambiare nome")
})

bot.action('go_back', ctx => {
    let msg = 'Gioca a sasso carta forbice!';
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "Play",
                        callback_data: 'play'
                    },
                    {
                        text: "Impostazioni",
                        callback_data: 'settings'
                    },
                    {
                        text: "About",
                        callback_data: 'about'
                    }
                ],
            ]
        }
    }) 
})

bot.command('setround', (ctx) => {
    const message = ctx.message.text.split(' ');
    message.shift();
        BestOf = message;
        ctx.telegram.sendMessage(ctx.chat.id, "Numero dei round aggiornato con successo.")
})

bot.command('setname', (ctx) => {
    const message = ctx.message.text.split(' ');
    	message.shift();
        Player_Username = message.join(' ');
        ctx.telegram.sendMessage(ctx.chat.id, "Nickname aggiornato con successo.")
})

bot.command('play', (ctx) => {
    let msg = `gioca a sasso carta forbice:`;
    bot.telegram.sendMessage(ctx.chat.id, msg, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "✊",
                        callback_data: 'rock'
                    },
                    {
                        text: "🖐",
                        callback_data: 'paper'
                    },
                    {
                        text: "✌️",
                        callback_data: 'scissors'
                    }
                ],
            ]
        }
    }) 
    bot.telegram.sendMessage(ctx.chat.id, `SCORE ATTUALE:\n` + Player_Username + `:\t`+ P_Score + `\nBot:\t` + CPU_Score)
})

function random(min, max) {  
    return Math.floor(
      Math.random() * (max - min + 1) + min
    )
}


bot.action('rock', ctx => {
    ctx.reply('La tua scelta è stata ✊')
    switch(random(0,2)) {
        case 0: 
        ctx.telegram.sendMessage(ctx.chat.id, 'la scelta del bot è stata ✊').then
        ctx.telegram.sendMessage(ctx.chat.id, 'round finito in parità.').then
        ctx.telegram.sendMessage(ctx.chat.id, `SCORE ATTUALE:\n` + Player_Username + `:\t`+ P_Score + `\nBot:\t` + CPU_Score)
        break;

        case 1: 
        ctx.telegram.sendMessage(ctx.chat.id, 'la scelta del bot è stata 🖐').then
        ctx.telegram.sendMessage(ctx.chat.id, 'round finito con la vittoria del bot.').then
        CPU_Score++;
        ctx.telegram.sendMessage(ctx.chat.id, `SCORE ATTUALE:\n` + Player_Username + `:t`+ P_Score + `\nBot:\t` + CPU_Score)
        break;

        case 2: 
        ctx.telegram.sendMessage(ctx.chat.id, 'la scelta del bot è stata ✌️').then
        ctx.telegram.sendMessage(ctx.chat.id, 'round finito con la vittoria del player').then
        P_Score++;
        ctx.telegram.sendMessage(ctx.chat.id, `SCORE ATTUALE:\n` + Player_Username + `:\t`+ P_Score + `\nBot:\t` + CPU_Score)
        break;
    }
    if(P_Score==BestOf)
    {
        ctx.telegram.sendMessage(ctx.chat.id, `PARTITA TERMINATA: vittoria per ` + Player_Username + `\n`)
        ctx.telegram.sendPhoto(ctx.chat.id, {source: "happy.png"}, {caption: "Hai vinto, " + Player_Username + "! premi /play per giocare ancora o /settings per cambiare le impostazioni"})
        CPU_Score=0;
        P_Score=0;
    }
    else if(CPU_Score==BestOf)
    {
        ctx.telegram.sendMessage(ctx.chat.id, `PARTITA TERMINATA: vittoria per il bot\n`)
        ctx.telegram.sendPhoto(ctx.chat.id, {source: "sad.png"}, {caption: "Hai perso " + Player_Username + "... premi /play per giocare ancora o /settings per cambiare le impostazioni"})
        CPU_Score=0;
        P_Score=0;
    }
})

bot.action('paper', ctx => {
    ctx.reply('La tua scelta è stata 🖐')
    switch(random(0,2)) {
        case 0: 
        ctx.telegram.sendMessage(ctx.chat.id, 'la scelta del bot è stata ✊').then
        ctx.telegram.sendMessage(ctx.chat.id, 'round finito con la vittoria del player.').then
        P_Score++;
        ctx.telegram.sendMessage(ctx.chat.id, `SCORE ATTUALE:\n` + Player_Username + `:\t`+ P_Score + `\nBot:\t` + CPU_Score)
        break;

        case 1: 
        ctx.telegram.sendMessage(ctx.chat.id, 'la scelta del bot è stata 🖐').then
        ctx.telegram.sendMessage(ctx.chat.id, 'round finito in parità.').then
        ctx.telegram.sendMessage(ctx.chat.id, `SCORE ATTUALE:\n` + Player_Username + `:\t`+ P_Score + `\nBot:\t` + CPU_Score)
        break;

        case 2: 
        ctx.telegram.sendMessage(ctx.chat.id, 'la scelta del bot è stata ✌️').then
        ctx.telegram.sendMessage(ctx.chat.id, 'round finito con la vittoria del bot.').then
        CPU_Score++;
        ctx.telegram.sendMessage(ctx.chat.id, `SCORE ATTUALE:\n` + Player_Username + `:\t`+ P_Score + `\nBot:\t` + CPU_Score)
        break;
    }
    if(P_Score==BestOf)
    {
        ctx.telegram.sendMessage(ctx.chat.id, `PARTITA TERMINATA: vittoria per ` + Player_Username + `\n`)
        ctx.telegram.sendPhoto(ctx.chat.id, {source: "happy.png"}, {caption: "Hai vinto, " + Player_Username + "! premi /play per giocare ancora o /settings per cambiare le impostazioni"})
        CPU_Score=0;
        P_Score=0;
    }
    else if(CPU_Score==BestOf)
    {
        ctx.telegram.sendMessage(ctx.chat.id, `PARTITA TERMINATA: vittoria per il bot\n`)
        ctx.telegram.sendPhoto(ctx.chat.id, {source: "sad.png"}, {caption: "Hai perso " + Player_Username + "... premi /play per giocare ancora o /settings per cambiare le impostazioni"})
        CPU_Score=0;
        P_Score=0;
    }
})

bot.action('scissors', ctx => {
    ctx.reply('La tua scelta è stata ✌️')
    switch(random(0,2)) {
        case 0: 
        ctx.telegram.sendMessage(ctx.chat.id, 'la scelta del bot è stata ✊').then
        ctx.telegram.sendMessage(ctx.chat.id, 'round finito con la vittoria del bot.').then
        CPU_Score++;
        ctx.telegram.sendMessage(ctx.chat.id, `SCORE ATTUALE:\n` + Player_Username + `:\t`+ P_Score + `\nBot:\t` + CPU_Score)
        break;

        case 1: 
        ctx.telegram.sendMessage(ctx.chat.id, 'la scelta del bot è stata 🖐').then
        ctx.telegram.sendMessage(ctx.chat.id, 'round finito con la vittoria del player.').then
        P_Score++;
        ctx.telegram.sendMessage(ctx.chat.id, `SCORE ATTUALE:\n` + Player_Username + `:\t`+ P_Score + `\nBot:\t` + CPU_Score)
        break;

        case 2: 
        ctx.telegram.sendMessage(ctx.chat.id, 'la scelta del bot è stata ✌️').then
        ctx.telegram.sendMessage(ctx.chat.id, 'round finito in parità.').then
        ctx.telegram.sendMessage(ctx.chat.id, `SCORE ATTUALE:\n` + Player_Username + `:\t`+ P_Score + `\nBot:\t` + CPU_Score)
        break;
    }
    if(P_Score==BestOf)
    {
        ctx.telegram.sendMessage(ctx.chat.id, `PARTITA TERMINATA: vittoria per ` + Player_Username + `\n`)
        ctx.telegram.sendPhoto(ctx.chat.id, {source: "happy.png"}, {caption: "Hai vinto " + Player_Username + "! premi /play per giocare ancora o /settings per cambiare le impostazioni"})
        CPU_Score=0;
        P_Score=0;
    }
    else if(CPU_Score==BestOf)
    {
        ctx.telegram.sendMessage(ctx.chat.id, `PARTITA TERMINATA: vittoria per il bot\n`)
        ctx.telegram.sendPhoto(ctx.chat.id, {source: "sad.png"}, {caption: "Hai perso " + Player_Username + "... premi /play per giocare ancora o /settings per cambiare le impostazioni"})
        CPU_Score=0;
        P_Score=0;
    }
})

bot.use((ctx) => {
    ctx.reply('Non conosco questo comando. digita /help per la lista dei comandi disponibili 😁')
})

bot.launch();

