"use strict";

require('dotenv').config()

String.prototype.replaceAll = function replaceAll(search, replace) {
    return this.split(search).join(replace);
}

const licenseUrl = "https://ojuba.org/waqf-2.0:%D8%B1%D8%AE%D8%B5%D8%A9_%D9%88%D9%82%D9%81_%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9";
let {eat, drink, word} = require('./src/lists');

const adminID = "635096382";

const {Telegraf, Markup} = require("telegraf");

const {getApi, checker, drinkReplay, eatReplay, replace, replayId, Supporter} = require("./src/lib");

const bot = new Telegraf(process.env.BOT_TOKEN || getApi());

const buttons = Markup.inlineKeyboard([
    [
        Markup.button.url('المطور', 'https://t.me/suprtastorh'),
        Markup.button.url("الرخصة", licenseUrl)
    ],
    [
        Markup.button.callback("ادعمنا", "supportMe"),
        Markup.button.callback("الداعمين", "Supporter")
    ],
    [Markup.button.callback("قائمة عبود", "menu")],
])

bot.launch().then(() => start());

bot.command("about", ctx => {
    if (ctx.message.chat.type !== 'supergroup') {
        ctx.reply(`بوت عبود هو بوت للتسلية داخل المجموعات 
البوت مجاني تماما و مفتوح المصدر

لذالك نروج منك دعمنا حتى نستمر ب تجربة بوت خالي تماما من الاعلانات
    `, buttons);
    } else {
        ctx.reply("لاتعمل الرساله في المجموعات تواصل معي خاص" + " @" + bot.botInfo.username)
    }
})

bot.action("Supporter", ctx => {
    let keyBord = Markup.inlineKeyboard([
        [Markup.button.callback("ادعمنا", "supportMe")]
    ]);
    action(ctx, "الداعمين هم السبب الرائيسي في عمل البوت الخاص بنا وهم" + "\n\n" + Supporter(), keyBord)
})

bot.action("menu", ctx => {
    let {to} = require("./src/lists").word;
    action(ctx, to[2])
})

bot.action("supportMe", ctx => {
    action(ctx, "اذا كنت ترغب بدعمنا نرجو منك التواصل مع مطور البوت لمعرفة التفاضيل الازمة \n مطور البوت : @superastorh")
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

    } else if (checker(txt)) {
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

function start() {
    sendMessage(adminID, "اشتغل بوت" + "\n @" + bot.botInfo.username, {});
}

function stop(stop) {
    if (stop) bot.stop(stop).then();
    sendMessage(adminID, "تقفل بوت" + "\n @" + bot.botInfo.username);
}

process.once('SIGINT', () => stop('SIGINT'));

process.once('SIGTERM', () => stop('SIGTERM'));

function deleteMessage(chat_id, message_id) {
    bot.telegram.deleteMessage(chat_id, message_id).then()
}

function sendMessage(chatId , text , extra = {} ) {
    bot.telegram.sendMessage(chatId, text, extra).then()
}

function action(ctx , message , extra = {}){
    let chat = ctx.update.callback_query.message.chat.id;
    let messageId = ctx.update.callback_query.message.message_id;
    deleteMessage(chat, messageId)
    sendMessage(chat, message , extra)
}