require('dotenv').config()

String.prototype.replaceAll = function replaceAll (search, replace) {
  return this.split(search).join(replace)
}

const licenseUrl =
  'https://ojuba.org/waqf-2.0:%D8%B1%D8%AE%D8%B5%D8%A9_%D9%88%D9%82%D9%81_%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9'
const { eat, drink, word } = require('./src/lists')

const adminID = '635096382'

const { Telegraf, Markup } = require('telegraf')

const {
  checker,
  drinkReplay,
  eatReplay,
  replace,
  replayId,
  Supporter
} = require('./src/lib')

const bot = new Telegraf(process.env.BOT_TOKEN || getApi())
const about = `بوت عبود هو بوت للتسلية داخل المجموعات 
البوت مجاني تماما و مفتوح المصدر

لذالك نروج منك دعمنا حتى نستمر ب تجربة بوت خالي تماما من الاعلانات
`
const back = Markup.inlineKeyboard([Markup.button.callback('رجوع', 'about')])
const buttons = Markup.inlineKeyboard([
  [
    Markup.button.url('المطور', 'https://t.me/salemkode'),
    Markup.button.url('الرخصة', licenseUrl)
  ],
  [
    Markup.button.callback('ادعمنا', 'supportMe'),
    Markup.button.callback('الداعمين', 'Supporter')
  ],
  [Markup.button.callback('بوتات اخرى من صنعنا', 'myBots')],
  [Markup.button.callback('قائمة عبود', 'menu')]
])

bot.telegram.getMe().then(async (botInfo) => {
  bot.options.username = botInfo.username
  await bot.launch()
  start()
})

bot.command('about', (ctx) => {
  if (ctx.message.chat.type !== 'supergroup') {
    ctx.reply(about, buttons)
  } else {
    ctx.reply(
      'لاتعمل الرساله في المجموعات تواصل معي خاص' + ' @' + bot.botInfo.username
    )
  }
})

bot.action('myBots', (ctx) => {
  const keyBord = Markup.inlineKeyboard([
    [Markup.button.url('بوت مذكر', 'https://t.me/muzakerBot')],
    [
      Markup.button.callback('ادعمنا', 'supportMe'),
      Markup.button.callback('رجوع', 'about')
    ]
  ])
  action(
    ctx,
    'البوتات الاخرى التي تم صنعناها وهي من تطوير @salemkode',
    keyBord
  )
})

bot.action('Supporter', (ctx) => {
  const keyBord = Markup.inlineKeyboard([
    [
      Markup.button.callback('ادعمنا', 'supportMe'),
      Markup.button.callback('رجوع', 'about')
    ]
  ])
  action(
    ctx,
    'الداعمين هم السبب الرائيسي في عمل البوت الخاص بنا وهم' +
      '\n\n' +
      Supporter(),
    keyBord
  )
})

bot.action('menu', (ctx) => {
  const { to } = require('./src/lists').word
  action(ctx, to[2], back)
})

bot.action('supportMe', (ctx) => {
  action(
    ctx,
    'اذا كنت ترغب بدعمنا نرجو منك التواصل مع مطور البوت لمعرفة التفاضيل الازمة \n مطور البوت : @salemkode',
    back
  )
})

bot.action('about', (ctx) => {
  action(ctx, about, buttons)
})

bot.on('text', (ctx) => {
  let text = ctx.message.text
  if (['عبود', 'ياعبود', 'عبودي', 'ياعبودي'].includes(text)) {
    ctx.reply('معك معلم')
  }
  if (text === 'تسلم') {
    if (
      ctx.message.reply_to_message &&
      ctx.message.reply_to_message.from.username === bot.botInfo.username
    ) {
      replayId(ctx, 'لا شكر على واجب')
    }
  }
  text = replace(text)

  const wordIndex = word.from.indexOf(text)

  if (wordIndex !== -1) {
    replayId(ctx, word.to[wordIndex])
  } else if (checker(text)) {
    text = text.replace('عبود', '')

    let replay

    if (drink.ls1.indexOf(text) !== -1) {
      replay = drinkReplay(drink.ls1.indexOf(text))

      replayId(ctx, replay)
    } else if (eat.ls1.indexOf(text) !== -1) {
      replay = eatReplay(eat.ls1.indexOf(text))

      replayId(ctx, replay)
    }
  }
})

function start () {
  sendMessage(adminID, 'اشتغل بوت' + '\n @' + bot.botInfo.username, {})
  console.debug('project run')
}

function stop (stop) {
  if (stop) bot.stop(stop)
  sendMessage(adminID, 'تقفل بوت' + '\n @' + bot.botInfo.username)
}

process.once('SIGINT', () => stop('SIGINT'))

process.once('SIGTERM', () => stop('SIGTERM'))

function deleteMessage (chat_id, message_id) {
  bot.telegram.deleteMessage(chat_id, message_id)
}

function sendMessage (chatId, text, extra = {}) {
  bot.telegram.sendMessage(chatId, text, extra)
}

function action (ctx, message, extra = {}) {
  const chat = ctx.update.callback_query.message.chat.id
  const messageId = ctx.update.callback_query.message.message_id
  deleteMessage(chat, messageId)
  sendMessage(chat, message, extra)
}

function getApi () {
  const prompt = require('prompt-sync')()

  const fs = require('fs')

  const api = prompt('What is your api bot? => ')

  const content = 'BOT_TOKEN=' + api

  fs.writeFile('./.env', content, (err) => {})

  return api
}
