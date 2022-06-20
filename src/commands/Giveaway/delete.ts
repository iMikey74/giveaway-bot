import { ApplyOptions } from '@sapphire/decorators';
import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework';
import { getGuildIds } from '../../lib/structures/util/utils';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'Delete a giveaway',
	preconditions: ['StaffOnly']
})
export class UserCommand extends Command {

    public override registerApplicationCommands(...[registry]: Parameters<ChatInputCommand['registerApplicationCommands']>) {
		registry.registerChatInputCommand(
			(builder) =>
				builder //
					.setName(this.name)
					.setDescription(this.description)
					.addStringOption((option) =>
						option //
							.setName('message-id')
							.setDescription('Giveaway message id')
							.setRequired(true)
					),
			{
				guildIds: getGuildIds(),
				idHints: [],
				behaviorWhenNotIdentical: RegisterBehavior.Overwrite
			}
		);
	}
    
	public override async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		await interaction.deferReply({ ephemeral: true });
		const messageId = interaction.options.getString("message-id", true);
        await this.container.giveawayManager.delete(messageId);
		return interaction.editReply({
			content: `Success!`
		});
	}
}
