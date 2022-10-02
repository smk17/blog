
import { tryFunction } from './try-function';

export type GetContainer = HTMLElement | (() => HTMLElement) | null | undefined;

export function resolveContainer(getContainer?: GetContainer) {
  const container = tryFunction(getContainer);
  return container || document.body;
}
