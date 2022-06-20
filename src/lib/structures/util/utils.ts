import { CommandInteraction, EmojiResolvable, Message, MessageButton, MessageButtonStyleResolvable } from 'discord.js';
import { envParseArray } from './env-parser';
import type { APIMessage } from 'discord-api-types/v9';

/**
 * Picks a random item from an array
 * @param array The array to pick a random item from
 * @example
 * const randomEntry = pickRandom([1, 2, 3, 4]) // 1
 */
export function pickRandom<T>(array: readonly T[]): T {
	const { length } = array;
	return array[Math.floor(Math.random() * length)];
}

export function getGuildIds(): string[] {
	return envParseArray('COMMAND_GUILD_IDS', []);
}

export function isMessageInstance(message: APIMessage | CommandInteraction | Message): message is Message<true> {
	return message instanceof Message;
}

export function createButton(emoji: EmojiResolvable | null, label: string, style: MessageButtonStyleResolvable, customId: string): MessageButton {
	let button = new MessageButton().setLabel(label).setStyle(style).setCustomId(customId);
	if (emoji) button.setEmoji(emoji);
	return button;
}