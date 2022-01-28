import { AlimtalkDto } from './dto/sendTalk.dto';

export function convertSMS(form: AlimtalkDto) {
  if (!form.to) return;
  const to = form.to.replace(/-/g, '');
  let content = form.content.replace(/◼|🎉/g, '') + '\n';
  content = content.replace(/🙏|⚽️|⌛️|😭|🤗/, '');

  console.log(content);
  if (form.buttons) {
    form.buttons.forEach((button) => {
      content = content + '\n' + '[' + button.name + ']' + '\n' + button.linkMobile;
    });
  }

  return { to, content };
}
