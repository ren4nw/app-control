export const mapKey = (key: string) => {
  switch (key) {
    case '{bksp}':
      return 'backspace';
    case '{space}':
      return 'space';
    case '{lock}':
      return 'esc';
    case '{shift}':
      return 'shift';
    case '{enter}':
      return 'enter';
    default:
      return key;
  }
}