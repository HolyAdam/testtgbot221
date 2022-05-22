const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()

const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply(`Hello, ${ctx.message.from.first_name || 'User'}`))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('course', async ctx => {
    try {
        await ctx.replyWithHTML('<b>Курсы</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2')],
                [Markup.button.callback('Дополнительно', 'btn_3')]
            ]
        ))
    } catch(e) {
        console.error(e)
    }
    
})

function addAction(name, src, text, options) {
    bot.action(name, async ctx => {
        try {
            await ctx.answerCbQuery()
            if (src) {
                await ctx.replyWithPhoto({
                    source: src
                })
            }
            await ctx.replyWithHTML(text, options)
        } catch(e) {
    
        }
    })
}

addAction('btn_1', '', text.texts.text1, Markup.inlineKeyboard(
    [
        [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2')],
        [Markup.button.callback('Дополнительно', 'btn_3')]
    ]
))

addAction('btn_2', '', text.texts.text2, Markup.inlineKeyboard(
    [
        [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2')],
        [Markup.button.callback('Дополнительно', 'btn_3')]
    ]
))

addAction('btn_3', './img/1.jpg', text.texts.text1, Markup.inlineKeyboard(
    [
        [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2')],
        [Markup.button.callback('Дополнительно', 'btn_3')]
    ]
))


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))