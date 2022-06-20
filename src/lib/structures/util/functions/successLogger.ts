import type { ChatInputCommandSuccessPayload, Command, ContextMenuCommandSuccessPayload } from '@sapphire/framework';
import { cyan } from 'colorette';
import type { APIUser } from 'discord-api-types/v9';
import type { Guild, User } from 'discord.js';

function getCommandInfo(command: Command) {
	return cyan(command.name);
}

function getAuthorInfo(author: User | APIUser) {
	return `${author.username}[${cyan(author.id)}]`;
}

function getGuildInfo(guild: Guild) {
	return `${guild.name}[${cyan(guild.id)}]`;
}

export function getSuccessLoggerData({ interaction, command }: ContextMenuCommandSuccessPayload | ChatInputCommandSuccessPayload) {
	const commandName = getCommandInfo(command);
	const author = getAuthorInfo(interaction.member!.user);
	const sentAt = getGuildInfo(interaction.guild!);

	return { commandName, author, sentAt };
}
