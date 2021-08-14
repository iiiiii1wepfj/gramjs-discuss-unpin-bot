const {
    Api,
    TelegramClient
} = require('telegram');
const {
    NewMessage,
    NewMessageEvent
} = require("telegram/events");
const {
    StringSession
} = require("telegram/sessions");

const apiId = 123456;
const apiHash = "123456abcdfg";
const botToken = "123456789:ABCDEFJHI"

const client = new TelegramClient(new StringSession(""), apiId, apiHash, {
    connectionRetries: 5,
});
async function discussunpinhandler(event) {
    const DiscussGroupChatId = event.message.peerId.channelId;
    const DiscussGroupMessageId = event.message.id;
    const Sender = await event.message.getSender();
    if (event.message.isGroup && Sender.broadcast == true && Sender.megagroup == false) {
        await client.invoke(new Api.messages.UpdatePinnedMessage({
            unpin: true,
            peer: DiscussGroupChatId,
            id: DiscussGroupMessageId
        }));
    }
}

(async () => {

    await client.start({
        botAuthToken: botToken,
    });
    client.addEventHandler(discussunpinhandler, new NewMessage({}));
})();
