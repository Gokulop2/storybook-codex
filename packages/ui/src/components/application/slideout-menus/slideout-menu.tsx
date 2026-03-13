"use client";

import { type ComponentPropsWithRef, type ReactNode, type RefAttributes } from "react";
import type {
  DialogProps as AriaDialogProps,
  ModalOverlayProps as AriaModalOverlayProps,
  ModalRenderProps as AriaModalRenderProps,
} from "react-aria-components";
import { Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Modal as AriaModal, ModalOverlay as AriaModalOverlay } from "react-aria-components";
import { CloseButton } from "@/components";
import { cx } from "@/utils";

interface ModalOverlayProps extends AriaModalOverlayProps, RefAttributes<HTMLDivElement> {}

export const MenuOverlay = (props: ModalOverlayProps) => {
  return (
    <AriaModalOverlay
      {...props}
      className={(state) =>
        cx(
          "bg-overlay/70 fixed inset-0 flex min-h-dvh w-full items-center justify-end pl-6 outline-hidden ease-linear md:pl-10",
          state.isEntering && "animate-in fade-in duration-300",
          state.isExiting && "animate-out fade-out duration-500",
          typeof props.className === "function" ? props.className(state) : props.className
        )
      }
    />
  );
};
MenuOverlay.displayName = "MenuOverlay";

interface MenuProps extends AriaModalOverlayProps, RefAttributes<HTMLDivElement> {}

export const Menu = (props: MenuProps) => (
  <AriaModal
    {...props}
    className={(state) =>
      cx(
        "inset-y-0 right-0 h-full w-full max-w-100 shadow-xl transition",
        state.isEntering && "animate-in slide-in-from-right duration-300",
        state.isExiting && "animate-out slide-out-to-right duration-500",
        typeof props.className === "function" ? props.className(state) : props.className
      )
    }
  />
);
Menu.displayName = "Menu";

interface DialogProps extends AriaDialogProps, RefAttributes<HTMLElement> {}

export const MenuDialog = (props: DialogProps) => (
  <AriaDialog
    role="dialog"
    {...props}
    className={cx("bg-primary ring-secondary_alt relative flex size-full flex-col items-start gap-6 overflow-y-auto ring-1 outline-hidden", props.className)}
  />
);
MenuDialog.displayName = "MenuDialog";

interface SlideoutMenuProps extends Omit<AriaModalOverlayProps, "children">, RefAttributes<HTMLDivElement> {
  children: ReactNode | ((children: AriaModalRenderProps & { close: () => void }) => ReactNode);
  dialogClassName?: string;
}

const Root = ({ children, dialogClassName, ...props }: SlideoutMenuProps) => {
  return (
    <MenuOverlay {...props}>
      <Menu className={(state) => cx(typeof props.className === "function" ? props.className(state) : props.className)}>
        {(state) => (
          <MenuDialog className={dialogClassName}>
            {({ close }) => {
              return typeof children === "function" ? children({ ...state, close }) : children;
            }}
          </MenuDialog>
        )}
      </Menu>
    </MenuOverlay>
  );
};
Root.displayName = "SlideoutMenu";

const Content = ({ role = "main", ...props }: ComponentPropsWithRef<"div">) => {
  return <div role={role} {...props} className={cx("flex size-full flex-col gap-6 overflow-y-auto overscroll-auto px-4 md:px-6", props.className)} />;
};
Content.displayName = "SlideoutContent";

interface SlideoutHeaderProps extends ComponentPropsWithRef<"header"> {
  onClose?: () => void;
}

const Header = ({ className, children, onClose, ...props }: SlideoutHeaderProps) => {
  return (
    <header {...props} className={cx("relative z-1 w-full px-4 pt-6 md:px-6", className)}>
      {children}
      <CloseButton size="md" className="absolute top-3 right-3 shrink-0" onClick={onClose} />
    </header>
  );
};
Header.displayName = "SlideoutHeader";

const Footer = (props: ComponentPropsWithRef<"footer">) => {
  return <footer {...props} className={cx("shadow-border-secondary w-full p-4 shadow-[inset_0px_1px_0px_0px] md:px-6", props.className)} />;
};
Footer.displayName = "SlideoutFooter";

const SlideoutMenu = Root as typeof Root & {
  Trigger: typeof AriaDialogTrigger;
  Content: typeof Content;
  Header: typeof Header;
  Footer: typeof Footer;
};
SlideoutMenu.displayName = "SlideoutMenu";

SlideoutMenu.Trigger = AriaDialogTrigger;
SlideoutMenu.Content = Content;
SlideoutMenu.Header = Header;
SlideoutMenu.Footer = Footer;

export { SlideoutMenu };
