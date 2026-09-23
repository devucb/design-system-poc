import { type ComponentType } from 'react';
import { Sheet } from './Sheet';
import type { SheetProps } from './Sheet.props';

/** Wraps a body component in the catalog Sheet overlay. */
export function withSheet<P extends object>(Component: ComponentType<P>) {
  function WithSheet({
    open,
    onOpenChange,
    ...props
  }: P & Pick<SheetProps, 'open' | 'onOpenChange'>) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <Component {...(props as P)} />
      </Sheet>
    );
  }
  const name = Component.displayName ?? Component.name ?? 'Component';
  WithSheet.displayName = `withSheet(${name})`;
  return WithSheet;
}
