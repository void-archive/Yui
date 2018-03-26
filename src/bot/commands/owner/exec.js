const { exec } = require('child_process');
const Command = require('../../structures/BaseCommand');

module.exports = class ExecCommand extends Command {
	constructor(bot) {
		super(bot, {
			name: 'exec',
			desc: 'Execute bash commands in a terminal.',
			usage: 'exec [<code...:str>]',
			category: 'Owner',
			isOwner: true,
			aliases: ['sh', 'bash'],
			enabled: false
		});
	}

	async run(msg, args) {
		if (!args[0]) {
			return msg.channel.createMessage(`:hehe: \`|\` Usage: \`${this.options.usage}\``);
		} else {
			await exec(args.join(" "), (stderr, stdout, err) => {
				let result = stdout || err;

				if (err) {
					return msg.channel.createMessage(this.bot.utils.codeblock(null, stderr));
				} else if (stdout.length > 1990 && err.length > 1990) {
					this.bot._snek
						.post(`https://h.mayo.pw/documents`)
						.send(stdout || stderr)
					 	.then(res => msg.channel.createMessage(':hehe: `|` Hastebin: `https://h.mayo.pw/' + res.body.key));
				} else {
					return msg.channel.createMessage(this.bot.utils.codeblock(null, stdout));
				}
			});
		}
	}
}