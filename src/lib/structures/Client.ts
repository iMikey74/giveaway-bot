import { container, LogLevel, SapphireClient } from '@sapphire/framework';
import Jsoning from 'jsoning';
import { GiveawayManager } from './giveawayManager';

export class Client extends SapphireClient {
	public constructor() {
		super({
			logger: {
				level: LogLevel.Debug
			},
			partials: ['GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER'],
			intents: [
				'GUILDS',
				'GUILD_MEMBERS',
				'GUILD_BANS',
				'GUILD_EMOJIS_AND_STICKERS',
				'GUILD_MESSAGES',
				'GUILD_MESSAGE_REACTIONS',
				'DIRECT_MESSAGES',
				'DIRECT_MESSAGE_REACTIONS'
			]
		});

		container.db = new Jsoning("database.json");
		container.giveawayManager = new GiveawayManager(this);
	}

	public override login(token?: string) {
		return super.login(token);
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		OwnerOnly: never;
		StaffOnly: never;
	}
}

declare module '@sapphire/pieces' {
	interface Container {
		db: Jsoning
		giveawayManager: GiveawayManager;
	}
}
