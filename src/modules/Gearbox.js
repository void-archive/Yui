module.exports = {
    _report: (err, bot) => {
        bot.createMessage('422541605568905249', {
            embed: {
                title: "Yui Hirasawa — Gearbox Report",
                description: `\`\`\`js\n${err.stack}\`\`\``,
                color: bot.utils.colour
            }
        });
    }
}