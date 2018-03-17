module.exports = {
    load: (Eris) => {
        // Channel
        Object.defineProperties(Eris.TextChannel.prototype, {
            'dm': {
                get() {
                    return this.type === 1;
                }
            },
            'send': {
                value: (emoji = ':x:', content = "owo what's this?") => {
                    return this.createMessage(`${emoji} \`|\` ${content}`);
                }
            }
        });

        // Permission-wise
        // Credit: https://github.com/Devoxin/JukeBot-JS

        Object.defineProperty(Eris.GuildChannel.prototype, 'hasPermissions', {
            value(user, ...permissions) {
                let check = true;
                for (const permission of permissions) {
                    if (!this.permissionsOf(user).has(permission)) {
                        check = false;
                        break;
                    }
                }
                return check;
            }
        });

        // Add mutiple reactions
        // Credit: https://github.com/Devoxin/JukeBot-JS
        
        Object.defineProperty(Eris.Message.prototype, 'bulkReact', {
            value: async (reactions) => {
                for (const reaction of reactions) {
                    await this.addReaction(reaction);
                }
            }
        });

        const MessageCollector = this.MessageCollector;
        Object.defineProperty(Eris.Channel.prototype, 'awaitMessages', {
          value: function (client, filter, options) {
            const collector = new MessageCollector(bot, this, filter, options);
            return new Promise(resolve => {
              collector.on('end', (...args) => {
                resolve(args);
              });
            });
          }
        });

        return Eris;
    }
};