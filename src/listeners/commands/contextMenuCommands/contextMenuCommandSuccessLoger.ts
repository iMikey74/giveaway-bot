import { ApplyOptions } from '@sapphire/decorators';
import { ContextMenuCommandSuccessPayload, Events, Listener, LogLevel } from '@sapphire/framework';
import type { Logger } from '@sapphire/plugin-logger';
import { getSuccessLoggerData } from '../../../lib/structures/util/functions/successLogger';

@ApplyOptions<Listener.Options>({ event: Events.ContextMenuCommandSuccess })
export class UserListener extends Listener {
	public override run(payload: ContextMenuCommandSuccessPayload) {
		const { author, commandName, sentAt } = getSuccessLoggerData(payload);
		this.container.logger.debug(`${commandName} ${author} ${sentAt}`);
	}

	public override onLoad() {
		this.enabled = (this.container.logger as Logger).level <= LogLevel.Debug;
		return super.onLoad();
	}
}
