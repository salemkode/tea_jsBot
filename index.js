"use strict";

require('dotenv').config()

String.prototype.replaceAll = function replaceAll(search, replace) {
    return this.split(search).join(replace);
}

let {eat, drink, word} = require('./src/lists');

const adminID = "635096382";

const {Telegraf, Markup} = require("telegraf");

const {getApi, checker, drinkReplay, eatReplay, replace, replayId, Supporter} = require("./src/lib");

const bot = new Telegraf(process.env.BOT_TOKEN || getApi());

const buttons = Markup.inlineKeyboard([
    [
        Markup.button.url('المطور', 'https://t.me/suprtastorh'),
        Markup.button.callback("الداعمين", "Supporter")
    ],
    [Markup.button.callback("ادعمنا", "supportMe")],
    [Markup.button.callback("قائمة عبود", "menu")],
])

bot.command("about", ctx => {
    ctx.reply(`بوت عبود هو بوت للتسلية داخل المجموعات 
    البوت مجاني تماما و مفتوح المصدر
   
   لذالك نروج منك دعمنا حتى نستمر ب تجربة بوت خالي تماما من الاعلانات
    `, buttons);
})

bot.action("Supporter", ctx => {
    let chat = ctx.update.callback_query.message.chat.id;
    let message = ctx.update.callback_query.message.message_id;
    bot.telegram.deleteMessage(chat, message)
    bot.telegram.sendMessage(chat, "الداعمين هم السبب الرائيسي في عمل البوت الخاص بنا وهم" + "\n\n" + Supporter())
    return ctx.update.callback_query;
})

bot.action("menu", ctx => {
    let chat = ctx.update.callback_query.message.chat.id;
    let message = ctx.update.callback_query.message.message_id;
    bot.telegram.deleteMessage(chat, message)
    let {to} = require("./src/lists").word;
    bot.telegram.sendMessage(chat, to[2])
    return ctx.update.callback_query;
})

bot.action("supportMe", ctx => {
    let chat = ctx.update.callback_query.message.chat.id;
    let message = ctx.update.callback_query.message.message_id;
    bot.telegram.deleteMessage(chat, message)
    bot.telegram.sendMessage(chat, "اذا كنت ترغب بدعمنا نرجو منك التواصل مع مطور البوت لمعرفة التفاضيل الازمة \n مطور البوت : @superastorh")
    return ctx.update.callback_query;
})

bot.hears(['عبود', 'ياعبود', "عبودي", "ياعبودي"], (ctx) => ctx.reply('معك معلم'))

bot.hears('تسلم', (ctx) => {
    if (ctx.message.reply_to_message && ctx.message.reply_to_message.from.username === bot.botInfo.username) {
        replayId(ctx, "لا شكر على واجب")
    }
})

bot.on('text', (ctx) => {

    let txt = ctx.message.text

    txt = replace(txt);

    let wordIndex = word.from.indexOf(txt);


    if (-1 !== wordIndex) {
        replayId(ctx, word.to[wordIndex])

    } else if (!checker(txt)) {
        txt = txt.replace("عبود", "");

        let replay;

        if (-1 !== drink.ls1.indexOf(txt)) {

            replay = drinkReplay(drink.ls1.indexOf(txt));

            replayId(ctx, replay);

        } else if (-1 !== eat.ls1.indexOf(txt)) {

            replay = eatReplay(eat.ls1.indexOf(txt));

            replayId(ctx, replay);

        }

    }
})

bot.launch().then(() => start());

function start() {
    bot.telegram.sendMessage(adminID, "اشتغل بوت" + "\n @" + bot.botInfo.username, {});
}

function stop(stop) {
    if (stop) bot.stop(stop).then();
    bot.telegram.sendMessage(adminID, "تقفل بوت" + "\n @" + bot.botInfo.username);
}

process.once('SIGINT', () => stop('SIGINT'));

process.once('SIGTERM', () => stop('SIGTERM'));