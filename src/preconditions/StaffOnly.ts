import { AllFlowsPrecondition } from '@sapphire/framework';
import type { Snowflake } from 'discord-api-types/v9';
import { owners, adminRoles, staffRoles } from '../config';

const staff: string[] = [...owners, ...adminRoles, ...staffRoles]

export class UserPrecondition extends AllFlowsPrecondition {
	#message = 'This command can only be used by the owner.';

	public override chatInputRun(...[interaction]: Parameters<AllFlowsPrecondition['chatInputRun']>) {
		return this.doStaffCheck(interaction.user.id);
	}

	public override contextMenuRun(...[interaction]: Parameters<AllFlowsPrecondition['contextMenuRun']>) {
		return this.doStaffCheck(interaction.user.id);
	}

	public override messageRun(...[message]: Parameters<AllFlowsPrecondition['messageRun']>) {
		return this.doStaffCheck(message.author.id);
	}

	private doStaffCheck(userId: Snowflake) {
		return staff.includes(userId) ? this.ok() : this.error({ message: this.#message });
	}
}
