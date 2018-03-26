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
			return msg.channel.createMessage(`**[ArgumentError]**: Usage: \`${this.options.usage}\``);
		} else {
			await exec(args.join(" "), (stderr, stdout, err) => {
				if (err) return msg.channel.createMessage();
			});
		}
	}
}