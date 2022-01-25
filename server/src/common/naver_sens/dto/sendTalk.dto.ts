export class AlimtalkDto {
  to: string;
  content: string;
  buttons?: ButtonForm[];
}

export class ButtonForm {
  type: string;
  name: string;
  linkMobile: string;
  linkPc: string;
}
