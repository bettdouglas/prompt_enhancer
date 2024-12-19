import { ContextPlaceholder } from '../types/context';

export function getDisplayValue(value: string, placeholders: ContextPlaceholder[]): string {
  let result = value;
  placeholders.forEach((placeholder) => {
    const pattern = `\\[${placeholder.name}\\]`;
    const regex = new RegExp(pattern, 'g');
    result = result.replace(
      regex,
      `[${placeholder.name}${placeholder.isExpanded ? ': ' + placeholder.template : ''}]`
    );
  });
  return result;
}