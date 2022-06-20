// @ts-nocheck
import { GiveawaysManager } from "discord-giveaways";
import type { Role, Snowflake, TextChannel } from "discord.js";
import type { BDClient } from "./Client";
import ms from "ms";
import { container } from "@sapphire/framework";
import type { APIRole } from "discord-api-types/v10";

export class GiveawayManager {
    manager: GiveawaysManager;
    client: BDClient;
    constructor(client: BDClient) {
        this.client = client;
        this.manager = new GiveawaysManager(client, {
            default: {
                botsCanWin: false,
                embedColor: "#5C72FF",
                embedColorEnd: "RED",
                lastChance: {
                    enabled: true,
                    content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
                    threshold: 5000,
                    embedColor: '#805da7'
                },
            }
        });
    }

    public reactionAddedListener() {
        this.manager.on('giveawayReactionAdded', async (giveaway, member, reaction) => {
            let requiredRoleId = await container.db.get(giveaway.messageId);
            // @ts-ignore
            if(!member.roles.cache.has(requiredRoleId)) {
                member.user
                    .send({
                        content: `Your entry for the giveaway ${giveaway.messageURL} is not valid as you dont have the required role(s).`
                    })
                    .catch(() => {});
                return reaction.users.remove(member.user.id);
            }
            return;
        });
    }

    checkDuration(duration: string) {
        if(ms(duration)) return true;
        else return false;
    }

    public async start(prize: string, winners: number, duration: string, requiredRoles: Role | APIRole, channel: TextChannel) {
        let giveaway = await this.manager.start(channel, {
            duration: ms(duration),
            winnerCount: winners,
            prize,
            reaction: "987074268229689395",
            messages: {
                giveaway: '<:yay:987074268229689395> **GIVEAWAY** <:yay:987074268229689395>',
                giveawayEnded: '<:yay:987074268229689395> **GIVEAWAY ENDED** <:yay:987074268229689395>',
                drawing: 'Drawing: {timestamp}',
                dropMessage: 'Be the first to react with <:yay:987074268229689395> !',
                inviteToParticipate: 'React with <:yay:987074268229689395> to participate!',
                winMessage: 'Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
                embedFooter: '{this.winnerCount} winner(s)',
                noWinner: 'Giveaway cancelled, no valid participations.',
                winners: 'Winner(s):',
                endedAt: 'Ended at'
            },
        });

        container.db.set(giveaway.messageId, requiredRoles.id);
        return giveaway;
    }

    public end(messageId: Snowflake) {
        return this.manager.end(messageId);
    }

    public delete(messageId: Snowflake) {
        container.db.delete(messageId);
        return this.manager.delete(messageId);
    }

    public reroll(messageId: Snowflake) {
        return this.manager.reroll(messageId);
    }
}