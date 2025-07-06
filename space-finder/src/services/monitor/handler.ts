import { SNSEvent } from "aws-lambda";
import { Context } from "vm";

const webHookUrl = 'https://hooks.slack.com/services/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';

async function handler(event: SNSEvent, context: Context) {
    for (const record of event.Records) {
        await fetch(webHookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "text": `We have a problem: ${record.Sns.Message}`
            })
        });
    }
}

export { handler }