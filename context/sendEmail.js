import * as MailComposer from 'expo-mail-composer';

export async function sendEmail(to, subject, body, options = {}) {
  const { cc, bcc } = options;
  try {
    await MailComposer.composeAsync({
      recipients: [to],
      subject,
      body,
      cc: cc ? [cc] : undefined,
      bcc: bcc ? [bcc] : undefined,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    // Handle error (e.g., show error message to user)
  }
}