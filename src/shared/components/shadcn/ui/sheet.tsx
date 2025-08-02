'use client';

import * as React from 'react';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
  container,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Portal> & {
  container?: HTMLElement | null;
}) {
  return (
    <SheetPrimitive.Portal
      data-slot="sheet-portal"
      container={container}
      {...props}
    />
  );
}

function SheetOverlay({
  className,
  isContained = false,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay> & {
  isContained?: boolean;
}) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-1000',
        isContained ? 'absolute inset-0' : 'fixed inset-0',
        className
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = 'right',
  containerId,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
  containerId?: string;
}) {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  const [isContained, setIsContained] = React.useState(false);

  React.useEffect(() => {
    if (!containerId) {
      setContainer(null);
      setIsContained(false);
      return;
    }

    const findContainer = () => {
      const element = document.getElementById(containerId);
      if (element) {
        setContainer(element);
        setIsContained(true);

        // Ensure the container has relative positioning
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.position === 'static') {
          element.style.position = 'relative';
        }

        return true;
      }
      return false;
    };

    // Try to find the container immediately
    if (!findContainer()) {
      // If not found, set up a MutationObserver to watch for it
      const observer = new MutationObserver(() => {
        if (findContainer()) {
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });

      // Cleanup observer on unmount
      return () => observer.disconnect();
    }
  }, [containerId]);

  const positionClasses = React.useMemo(() => {
    const baseClasses =
      'data-[state=open]:animate-in data-[state=closed]:animate-out z-1000 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 bg-light-gray border-none';

    if (isContained) {
      // Use absolute positioning when contained
      const containedClasses = {
        right:
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right absolute top-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left absolute top-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top absolute top-0 left-0 right-0 h-auto border-b',
        bottom:
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom absolute bottom-0 left-0 right-0 h-auto border-t',
      };
      return cn(baseClasses, containedClasses[side]);
    } else {
      // Use fixed positioning when not contained (default behavior)
      const fixedClasses = {
        right:
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right fixed inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left fixed inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top fixed inset-x-0 top-0 h-auto border-b',
        bottom:
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom fixed inset-x-0 bottom-0 h-auto border-t',
      };
      return cn(baseClasses, fixedClasses[side]);
    }
  }, [side, isContained]);

  return (
    <SheetPortal container={container}>
      <SheetOverlay isContained={isContained} />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={cn(positionClasses, className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-full opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none cursor-pointer">
          <X className="size-6" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn('text-foreground font-semibold', className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
