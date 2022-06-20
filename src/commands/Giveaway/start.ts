import { ApplyOptions } from '@sapphire/decorators';
import { ChatInputCommand, Command, RegisterBehavior } from '@sapphire/framework';
import type { TextChannel } from 'discord.js';
import { getGuildIds } from '../../lib/structures/util/utils';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'Start a new giveaway',
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
							.setName('prize')
							.setDescription('Prize for the giveaway.')
							.setRequired(true)
					)
					.addNumberOption((option) =>
						option //
							.setName('winners')
							.setDescription('winners 3ad afhm ant ya 7mar.')
							.setRequired(true)
					)
					.addStringOption((option) =>
						option //
							.setName('duration')
							.setDescription('Duration.')
							.setRequired(true)
					)
                    .addRoleOption(option =>
                        option
                            .setName("required-role")
                            .setDescription("required role to participate in the giveaway")
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
		const prize = interaction.options.getString("prize", true);
		const winners = interaction.options.getNumber("winners", true);
		const duration = interaction.options.getString("duration", true);
        const requiredRoles = interaction.options.getRole("required-role", true);
        
        const data = await this.container.giveawayManager.start(prize, winners, duration, requiredRoles, interaction.channel as TextChannel);
		return interaction.editReply({
			content: `Giveaway created! ID: ${data.messageId}`
		});
	}
}
