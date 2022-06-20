import { container } from '@sapphire/framework';
import './lib/setup';
import { Client } from './lib/structures/Client';

const client = new Client();

const main = async () => {
	try {
		client.logger.info('Logging in');
		await client.login();
		container.giveawayManager.reactionAddedListener();
		client.logger.info('logged in');
	} catch (error) {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

main();