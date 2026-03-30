import type { Editor } from "@tiptap/core";
import Color from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold01,
  ChevronDown,
  Hash02,
  Image01,
  Italic01,
  Link01,
  List,
  Stars02,
  Type01,
  Underline01,
} from "@opus2-platform/icons";
import type { ChangeEvent } from "react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  Button as AriaButton,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
} from "react-aria-components";
import { Popover } from "@/components/base/select/popover";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils";
import { TextEditorFontSize } from "./text-editor-font-size";

/** Match `TextAreaBase` resize handle. TipTap `attributes.style` must be a string. */
function getResizeHandleStyleString(): string {
  const light = "#D5D7DA";
  const dark = "#373A41";
  const svg = (stroke: string) =>
    `data:image/svg+xml;base64,${btoa(
      `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L2 10" stroke="${stroke}" stroke-linecap="round"/><path d="M11 7L7 11" stroke="${stroke}" stroke-linecap="round"/></svg>`,
    )}`;
  return `--resize-handle-bg: url(${svg(light)}); --resize-handle-bg-dark: url(${svg(dark)})`;
}

const styles = {
  sm: {
    editor: "text-sm",
    /** `h-87` for sm editor (incl. floating toolbar demo). */
    editorHeight: "h-87 min-h-0",
    editorPad: "p-4",
  },
  md: {
    editor: "text-md",
    /** `h-108` for default md with sample copy. */
    editorHeight: "h-108 min-h-0",
    editorPad: "p-5",
  },
  /** “Text editor example” hero: compact toolbar + md editor, `h-37.5` (9.375rem). */
  hero: {
    editor: "text-md",
    editorHeight: "h-[9.375rem] min-h-0",
    editorPad: "p-5",
  },
  /** “With tooltip”: editor-only, `h-87` + `p-4` + `text-md` (no toolbar). */
  withTooltip: {
    editor: "text-md leading-[1.5]",
    editorHeight: "h-87 min-h-0",
    editorPad: "p-4",
  },
} as const;

const DEFAULT_HTML = "<p></p>";

/** Default text color swatch when none is set on the selection. */
const DEFAULT_TEXT_COLOR = "#181D27";

const TOOLBAR_BTN_CLASS =
  "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md p-0! outline-hidden outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2 focus-visible:outline-offset-2 data-[pressed]:bg-primary_hover data-[pressed]:outline-hidden";

/** `md` toolbar — font family / size triggers. */
const TOOLBAR_SELECT_TRIGGER =
  "bg-primary ring-primary relative flex w-full cursor-pointer items-center rounded-lg shadow-xs ring-1 outline-hidden transition duration-100 ease-linear ring-inset";

const TOOLBAR_SELECT_VALUE_ROW =
  "flex h-max w-full items-center justify-start gap-2 truncate py-2 pl-3 pr-2.5 text-left align-middle *:data-icon:size-4 *:data-icon:shrink-0 *:data-icon:stroke-[2.25px] *:data-icon:text-fg-quaternary";

const FONT_OPTIONS = [
  { id: "Inter", label: "Inter" },
  { id: "Comic Sans MS, Comic Sans, cursive", label: "Comic Sans" },
  { id: "serif", label: "serif" },
  { id: "monospace", label: "monospace" },
  { id: "cursive", label: "cursive" },
] as const;

const FONT_SIZE_OPTIONS = (
  [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32] as const
).map((n) => ({ id: `${n}px`, label: `${n}px` }));

export interface TextEditorProps {
  /** Control typography, padding, and toolbar density (`sm` / `md`). */
  size?: "sm" | "md";
  /**
   * `hero` matches the “Text editor example” layout: compact toolbar strip (no font row) + md editor body (`h-37.5`).
   */
  layout?: "default" | "hero";
  /**
   * When `true`: **always-visible** floating chrome above the editor — `sm`: `rounded-lg … p-1`, `md`: `rounded-xl … p-2`.
   * When `false`, a normal fixed toolbar is shown above the content.
   */
  floatingToolbar?: boolean;
  /**
   * Show tooltips on toolbar controls (fixed, floating, or selection bubble when `showToolbar` is false).
   */
  showTooltips?: boolean;
  placeholder?: string;
  /** Initial HTML content. */
  defaultContent?: string;
  className?: string;
  /**
   * When set, shows a character-count hint below the editor: “{n} characters left”.
   * Count is plain-text length (TipTap `getText()`).
   */
  maxLength?: number;
  /** Static hint below the editor (e.g. “Select a text to show a tooltip.”). When set, `maxLength` hint is not shown. */
  hintText?: string;
  /**
   * When `false`, no fixed toolbar is rendered. Use with `showTooltips` to show a selection `BubbleMenu`
   * (“With tooltip”: select text → floating toolbar with tooltips + static `hintText`).
   * @default true
   */
  showToolbar?: boolean;
}

type IconComponent = typeof Bold01;

type ToolbarAction = {
  label: string;
  /** Shown in `aria-label` after the label, e.g. `⌘B`. */
  shortcut?: string;
  Icon: IconComponent;
  onPress: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  can: (editor: Editor) => boolean;
};

const ACTIONS_BIU: ToolbarAction[] = [
  {
    label: "Bold",
    shortcut: "⌘B",
    Icon: Bold01,
    onPress: (e) => e.chain().focus().toggleBold().run(),
    isActive: (e) => e.isActive("bold"),
    can: (e) => e.can().chain().focus().toggleBold().run(),
  },
  {
    label: "Italic",
    shortcut: "⌘I",
    Icon: Italic01,
    onPress: (e) => e.chain().focus().toggleItalic().run(),
    isActive: (e) => e.isActive("italic"),
    can: (e) => e.can().chain().focus().toggleItalic().run(),
  },
  {
    label: "Underline",
    shortcut: "⌘U",
    Icon: Underline01,
    onPress: (e) => e.chain().focus().toggleUnderline().run(),
    isActive: (e) => e.isActive("underline"),
    can: (e) => e.can().chain().focus().toggleUnderline().run(),
  },
];

const ACTIONS_ALIGN: ToolbarAction[] = [
  {
    label: "Left align",
    Icon: AlignLeft,
    onPress: (e) => e.chain().focus().setTextAlign("left").run(),
    isActive: (e) => e.isActive({ textAlign: "left" }),
    can: (e) => e.can().chain().focus().setTextAlign("left").run(),
  },
  {
    label: "Center align",
    Icon: AlignCenter,
    onPress: (e) => e.chain().focus().setTextAlign("center").run(),
    isActive: (e) => e.isActive({ textAlign: "center" }),
    can: (e) => e.can().chain().focus().setTextAlign("center").run(),
  },
  {
    label: "Right align",
    Icon: AlignRight,
    onPress: (e) => e.chain().focus().setTextAlign("right").run(),
    isActive: (e) => e.isActive({ textAlign: "right" }),
    can: (e) => e.can().chain().focus().setTextAlign("right").run(),
  },
];

const ACTIONS_LISTS: ToolbarAction[] = [
  {
    label: "Bullet list",
    Icon: List,
    onPress: (e) => e.chain().focus().toggleBulletList().run(),
    isActive: (e) => e.isActive("bulletList"),
    can: (e) => e.can().chain().focus().toggleBulletList().run(),
  },
  {
    label: "Numbered list",
    Icon: Hash02,
    onPress: (e) => e.chain().focus().toggleOrderedList().run(),
    isActive: (e) => e.isActive("orderedList"),
    can: (e) => e.can().chain().focus().toggleOrderedList().run(),
  },
];

function ToolbarDivider() {
  return (
    <div className="flex items-center self-stretch p-1.5">
      <div className="h-full min-h-4 w-px rounded-full bg-border-primary" />
    </div>
  );
}

function ariaForAction(action: ToolbarAction): string {
  return action.shortcut ? `${action.label} ${action.shortcut}` : action.label;
}

function ToolbarButton({
  editor,
  action,
  showTooltip,
}: {
  editor: Editor;
  action: ToolbarAction;
  showTooltip: boolean;
}) {
  const active = action.isActive(editor);
  const disabled = !action.can(editor);
  const iconClass = "size-5";
  const aria = ariaForAction(action);

  const triggerClass = cx(
    TOOLBAR_BTN_CLASS,
    active ? "bg-primary_hover text-fg-secondary" : "text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover",
    disabled && "cursor-not-allowed opacity-40",
  );

  const Icon = action.Icon;
  const inner = <Icon data-icon aria-hidden className={iconClass} />;

  if (showTooltip) {
    return (
      <Tooltip title={aria} delay={200}>
        <TooltipTrigger isDisabled={disabled} onPress={() => action.onPress(editor)} className={triggerClass} aria-label={aria}>
          {inner}
        </TooltipTrigger>
      </Tooltip>
    );
  }

  return (
    <button
      type="button"
      className={triggerClass}
      disabled={disabled}
      aria-label={aria}
      aria-pressed={active}
      onClick={() => action.onPress(editor)}
    >
      {inner}
    </button>
  );
}

function ColorPickerButton({
  editor,
  showTooltip,
}: {
  editor: Editor;
  showTooltip: boolean;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [color, setColor] = useState(DEFAULT_TEXT_COLOR);

  useEffect(() => {
    const sync = () => {
      const c = editor.getAttributes("textStyle").color as string | undefined;
      setColor(c && /^#/.test(c) ? c : DEFAULT_TEXT_COLOR);
    };
    editor.on("selectionUpdate", sync);
    editor.on("transaction", sync);
    sync();
    return () => {
      editor.off("selectionUpdate", sync);
      editor.off("transaction", sync);
    };
  }, [editor]);

  const onColorChange = (hex: string) => {
    setColor(hex);
    editor.chain().focus().setColor(hex).run();
  };

  const triggerClass = cx(
    TOOLBAR_BTN_CLASS,
    "text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover",
  );

  const swatch = (
    <div
      className="size-4 rounded-full ring-1 ring-black/10 ring-inset in-pressed:outline-[1.5px] in-pressed:outline-offset-2"
      style={{ outlineColor: color, backgroundColor: color }}
    />
  );

  const colorInput = (
    <input
      ref={inputRef}
      id={inputId}
      type="color"
      className="sr-only"
      value={color}
      onChange={(e) => onColorChange(e.target.value)}
      aria-hidden
      tabIndex={-1}
    />
  );

  if (showTooltip) {
    return (
      <>
        <Tooltip title="Text color" delay={200}>
          <TooltipTrigger
            className={cx(triggerClass, "inline-flex")}
            onPress={() => inputRef.current?.click()}
            aria-label="Text color"
          >
            {swatch}
          </TooltipTrigger>
        </Tooltip>
        {colorInput}
      </>
    );
  }

  return (
    <span className="inline-flex items-center">
      <label htmlFor={inputId} className={triggerClass} aria-label="Text color">
        {swatch}
      </label>
      {colorInput}
    </span>
  );
}

function useEditorToolbarSync(editor: Editor) {
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const sync = () => setVersion((v) => v + 1);
    editor.on("transaction", sync);
    editor.on("selectionUpdate", sync);
    return () => {
      editor.off("transaction", sync);
      editor.off("selectionUpdate", sync);
    };
  }, [editor]);
  return version;
}

function ToolbarFontFamilySelect({ editor }: { editor: Editor }) {
  const v = useEditorToolbarSync(editor);
  const selectedKey = useMemo(() => {
    void v;
    const ff = editor.getAttributes("textStyle").fontFamily as string | undefined;
    if (!ff) return "Inter";
    const hit = FONT_OPTIONS.find((o) => o.id === ff);
    return hit ? hit.id : "Inter";
  }, [editor, v]);

  const label = FONT_OPTIONS.find((o) => o.id === selectedKey)?.label ?? "Inter";

  return (
    <AriaSelect
      className="flex w-full flex-col gap-1.5 md:w-38"
      selectedKey={selectedKey}
      onSelectionChange={(key) => {
        if (key == null) return;
        editor.chain().focus().setFontFamily(String(key)).run();
      }}
    >
      <AriaButton className={cx(TOOLBAR_SELECT_TRIGGER, "data-[focus-visible]:ring-brand data-[focus-visible]:ring-2")}>
        <AriaSelectValue className={TOOLBAR_SELECT_VALUE_ROW}>
          <Type01 data-icon aria-hidden />
          <section className="flex w-full gap-x-1.5 truncate">
            <p className="text-primary truncate text-sm font-medium">{label}</p>
          </section>
          <ChevronDown aria-hidden className="text-fg-quaternary ml-auto size-4 shrink-0 stroke-[2.25px]" />
        </AriaSelectValue>
      </AriaButton>
      <Popover size="sm">
        <AriaListBox
          items={[...FONT_OPTIONS]}
          className="size-full max-h-64 overflow-y-auto py-1 outline-hidden"
          selectionMode="single"
        >
          {(item) => (
            <AriaListBoxItem
              id={item.id}
              textValue={item.label}
              className="text-primary cursor-pointer px-3 py-2 text-sm outline-hidden data-[focused]:bg-primary_hover"
            >
              {item.label}
            </AriaListBoxItem>
          )}
        </AriaListBox>
      </Popover>
    </AriaSelect>
  );
}

function ToolbarFontSizeSelect({ editor }: { editor: Editor }) {
  const v = useEditorToolbarSync(editor);
  const selectedKey = useMemo(() => {
    void v;
    const fs = editor.getAttributes("textStyle").fontSize as string | undefined;
    if (!fs) return "16px";
    const hit = FONT_SIZE_OPTIONS.find((o) => o.id === fs);
    return hit ? hit.id : "16px";
  }, [editor, v]);

  const label = FONT_SIZE_OPTIONS.find((o) => o.id === selectedKey)?.label ?? "16px";

  return (
    <AriaSelect
      className="flex w-full flex-col gap-1.5 md:w-22"
      selectedKey={selectedKey}
      onSelectionChange={(key) => {
        if (key == null) return;
        editor.chain().focus().setMark("textStyle", { fontSize: String(key) }).run();
      }}
    >
      <AriaButton className={cx(TOOLBAR_SELECT_TRIGGER, "data-[focus-visible]:ring-brand data-[focus-visible]:ring-2")}>
        <AriaSelectValue className={cx(TOOLBAR_SELECT_VALUE_ROW, "gap-2 pl-3 pr-2.5")}>
          <section className="flex w-full gap-x-1.5 truncate">
            <p className="text-primary truncate text-sm font-medium">{label}</p>
          </section>
          <ChevronDown aria-hidden className="text-fg-quaternary ml-auto size-4 shrink-0 stroke-[2.25px]" />
        </AriaSelectValue>
      </AriaButton>
      <Popover size="sm">
        <AriaListBox
          items={FONT_SIZE_OPTIONS}
          className="size-full max-h-64 overflow-y-auto py-1 outline-hidden"
          selectionMode="single"
        >
          {(item) => (
            <AriaListBoxItem
              id={item.id}
              textValue={item.label}
              className="text-primary cursor-pointer px-3 py-2 text-sm outline-hidden data-[focused]:bg-primary_hover"
            >
              {item.label}
            </AriaListBoxItem>
          )}
        </AriaListBox>
      </Popover>
    </AriaSelect>
  );
}

function ToolbarLinkButton({ editor, showTooltip }: { editor: Editor; showTooltip: boolean }) {
  const action: ToolbarAction = {
    label: "Link",
    shortcut: "⌘K",
    Icon: Link01,
    onPress: (e) => {
      const prev = e.getAttributes("link").href as string | undefined;
      const url = window.prompt("Enter URL", prev ?? "https://");
      if (url === null) return;
      if (url === "") {
        e.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      e.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    },
    isActive: (e) => e.isActive("link"),
    can: () => true,
  };
  return <ToolbarButton editor={editor} action={action} showTooltip={showTooltip} />;
}

function ToolbarImageButton({ editor, showTooltip }: { editor: Editor; showTooltip: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onPick = () => inputRef.current?.click();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      editor.chain().focus().setImage({ src }).run();
    };
    reader.readAsDataURL(file);
  };

  const triggerClass = cx(
    TOOLBAR_BTN_CLASS,
    "text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover",
  );
  const inner = <Image01 data-icon aria-hidden className="size-5" />;

  return (
    <>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onChange} aria-hidden tabIndex={-1} />
      {showTooltip ? (
        <Tooltip title="Insert image" delay={200}>
          <TooltipTrigger type="button" onPress={onPick} className={triggerClass} aria-label="Insert image">
            {inner}
          </TooltipTrigger>
        </Tooltip>
      ) : (
        <button type="button" className={triggerClass} aria-label="Insert image" onClick={onPick}>
          {inner}
        </button>
      )}
    </>
  );
}

function ToolbarGenerateButton({ showTooltip }: { showTooltip: boolean }) {
  const triggerClass = cx(
    TOOLBAR_BTN_CLASS,
    "text-fg-quaternary hover:bg-primary_hover hover:text-fg-quaternary_hover",
  );
  const inner = <Stars02 data-icon aria-hidden className="size-5" />;

  if (showTooltip) {
    return (
      <Tooltip title="Generate" delay={200}>
        <TooltipTrigger type="button" onPress={() => {}} className={triggerClass} aria-label="Generate">
          {inner}
        </TooltipTrigger>
      </Tooltip>
    );
  }

  return (
    <button type="button" className={triggerClass} aria-label="Generate" onClick={() => {}}>
      {inner}
    </button>
  );
}

function ToolbarSurface({
  editor,
  showTooltips,
  variant,
  size,
  surfaceClassName,
}: {
  editor: Editor;
  showTooltips: boolean;
  variant: "fixed" | "bubble";
  size: "sm" | "md";
  /** Merged onto the toolbar root (e.g. floating `sm`: `rounded-lg … ring-secondary_alt`). */
  surfaceClassName?: string;
}) {
  /** Left + center + bullet only (no right align, no numbered list). */
  const alignActions = ACTIONS_ALIGN.slice(0, 2);
  const listActions = ACTIONS_LISTS.slice(0, 1);

  const formattingRow = (
    <>
      {ACTIONS_BIU.map((action) => (
        <ToolbarButton key={action.label} editor={editor} action={action} showTooltip={showTooltips} />
      ))}
      <ToolbarDivider />
      <ColorPickerButton editor={editor} showTooltip={showTooltips} />
      <ToolbarDivider />
      {alignActions.map((action) => (
        <ToolbarButton key={action.label} editor={editor} action={action} showTooltip={showTooltips} />
      ))}
      {listActions.map((action) => (
        <ToolbarButton key={action.label} editor={editor} action={action} showTooltip={showTooltips} />
      ))}
      {size === "md" && (
        <>
          <ToolbarDivider />
          <ToolbarLinkButton editor={editor} showTooltip={showTooltips} />
          <ToolbarImageButton editor={editor} showTooltip={showTooltips} />
          <ToolbarDivider />
          <ToolbarGenerateButton showTooltip={showTooltips} />
        </>
      )}
    </>
  );

  if (size === "sm") {
    return (
      <div
        className={cx(
          "flex w-max max-w-full flex-wrap gap-0.5 md:flex-nowrap md:items-center",
          variant === "bubble" && !surfaceClassName && "max-w-[min(100vw-2rem,36rem)]",
          surfaceClassName,
        )}
      >
        {formattingRow}
      </div>
    );
  }

  /** `md`: font family + font size row, then formatting strip. */
  return (
    <div
      className={cx(
        "flex w-max max-w-full flex-col items-start justify-center gap-2 md:flex-row md:items-center md:justify-start md:gap-3",
        variant === "bubble" && !surfaceClassName && "max-w-[min(100vw-2rem,36rem)]",
        surfaceClassName,
      )}
    >
      <div className="flex gap-2">
        <ToolbarFontFamilySelect editor={editor} />
        <ToolbarFontSizeSelect editor={editor} />
      </div>
      <div className="flex flex-wrap gap-0.5 md:flex-nowrap md:items-center">{formattingRow}</div>
    </div>
  );
}

export const TextEditor = ({
  size = "md",
  layout = "default",
  floatingToolbar = false,
  showTooltips = false,
  placeholder = "Start typing…",
  defaultContent = DEFAULT_HTML,
  className,
  maxLength,
  hintText,
  showToolbar = true,
}: TextEditorProps) => {
  const isHero = layout === "hero";
  const editorSizeKey = !showToolbar ? "withTooltip" : isHero ? "hero" : size;
  const toolbarSize: "sm" | "md" = isHero ? "sm" : size;
  const effectivePlaceholder = isHero ? "Write something…" : placeholder;
  const hintId = useId();
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        bulletList: { HTMLAttributes: { class: "list-disc pl-4" } },
        orderedList: { HTMLAttributes: { class: "list-decimal pl-4" } },
      }),
      Underline,
      TextStyle,
      FontFamily,
      TextEditorFontSize,
      Color.configure({ types: ["textStyle"] }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "text-brand-secondary underline underline-offset-2",
        },
      }),
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class: "max-w-full rounded-lg",
        },
      }),
      Placeholder.configure({ placeholder: effectivePlaceholder }),
    ],
    [effectivePlaceholder],
  );

  const editor = useEditor({
    extensions,
    content: defaultContent,
    editorProps: {
      attributes: {
        class: cx(
          "tiptap ProseMirror w-full overflow-auto rounded-lg bg-primary text-primary caret-fg-brand-primary shadow-xs ring-1 ring-primary ring-inset transition duration-100 ease-linear",
          showToolbar && (size === "md" || isHero) && "max-w-none",
          "selection:bg-fg-brand-primary/10",
          "placeholder:text-placeholder autofill:rounded-lg autofill:text-primary",
          "focus:outline-hidden focus:ring-2 focus:ring-brand",
          "scroll-py-3 resize-y leading-[1.5]",
          styles[editorSizeKey].editorHeight,
          styles[editorSizeKey].editorPad,
          "[&::-webkit-resizer]:bg-(image:--resize-handle-bg) [&::-webkit-resizer]:bg-contain dark:[&::-webkit-resizer]:bg-(image:--resize-handle-bg-dark)",
          "[&_p.is-empty:first-child]:before:pointer-events-none [&_p.is-empty:first-child]:before:float-left [&_p.is-empty:first-child]:before:text-placeholder [&_p.is-empty:first-child]:before:content-[attr(data-placeholder)]",
          styles[editorSizeKey].editor,
        ),
        style: getResizeHandleStyleString(),
        ...(maxLength != null || hintText != null ? { "aria-describedby": hintId } : {}),
      },
    },
  }, [editorSizeKey]);

  const [textLen, setTextLen] = useState(0);
  /** TipTap/Tippy defaults to `document.body`; keep menus inside this subtree so Storybook `dark-mode` tokens apply. */
  const rootRef = useRef<HTMLDivElement>(null);
  const bubbleTippyOptions = useMemo(
    () => ({
      duration: 120,
      appendTo: () => rootRef.current ?? document.body,
    }),
    [],
  );

  useEffect(() => {
    if (!editor) return;
    const sync = () => setTextLen(editor.getText().length);
    editor.on("update", sync);
    editor.on("transaction", sync);
    sync();
    return () => {
      editor.off("update", sync);
      editor.off("transaction", sync);
    };
  }, [editor]);

  if (!editor) {
    return (
      <div
        className={cx(
          "overflow-hidden bg-primary shadow-xs",
          isHero && "mx-auto! min-h-[120px] w-full max-w-128",
          !isHero && size === "sm" && showToolbar && "mx-auto! min-h-[132px] w-full max-w-lg",
          !isHero && size === "md" && showToolbar && "mx-auto! min-h-[172px] w-full max-w-180",
          !showToolbar && "mx-auto! min-h-[220px] w-full max-w-128",
          className,
        )}
        aria-hidden
      />
    );
  }

  const remaining = maxLength != null && hintText == null ? Math.max(0, maxLength - textLen) : null;
  const showHint = hintText != null || remaining != null;

  const editorColumn = (
    <div className="flex flex-col gap-2">
      <div>
        <EditorContent editor={editor} className="text-primary [&_.ProseMirror]:min-h-0" />
      </div>
      {showHint && (
        <span
          className={cx(
            "text-sm text-tertiary group-invalid:text-error-primary",
            remaining != null && "tabular-nums",
            size === "sm" && "in-data-[input-size=sm]:text-xs",
          )}
          id={hintId}
          {...(hintText != null ? { slot: "description" } : {})}
        >
          {hintText ?? (remaining != null ? `${remaining} characters left` : null)}
        </span>
      )}
    </div>
  );

  /** “With tooltip”: no fixed toolbar; optional selection bubble with toolbar tooltips. */
  if (!showToolbar) {
    return (
      <div ref={rootRef} className={cx("group w-full overflow-hidden bg-primary", className)} data-input-size={size}>
        <div className="mx-auto! w-full max-w-128">
          <div className="flex w-full max-w-lg flex-col gap-2">{editorColumn}</div>
        </div>
        {showTooltips ? (
          <BubbleMenu
            editor={editor}
            className="mx-auto! flex max-w-[min(100vw-2rem,36rem)] flex-wrap items-center gap-0.5 rounded-lg bg-primary p-1 shadow-lg ring-1 ring-secondary_alt"
            tippyOptions={bubbleTippyOptions}
          >
            {/** Hero-style strip only (BIU, color, align ×2, bullet) — not full `md` font row / link / image / generate. */}
            <ToolbarSurface editor={editor} showTooltips variant="bubble" size="sm" />
          </BubbleMenu>
        ) : null}
      </div>
    );
  }

  if (isHero) {
    return (
      <div
        ref={rootRef}
        className={cx("group mx-auto! w-full max-w-128 overflow-hidden bg-primary shadow-xs", className)}
        data-input-size={size}
      >
        <div className="flex w-full flex-col gap-3">
          {!floatingToolbar && (
            <div className="w-max mx-auto!">
              <ToolbarSurface editor={editor} showTooltips={showTooltips} variant="fixed" size="sm" />
            </div>
          )}
          {editorColumn}
        </div>

        {floatingToolbar && (
          <BubbleMenu
            editor={editor}
            className="mx-auto! flex max-w-[min(100vw-2rem,36rem)] flex-wrap items-center gap-0.5 rounded-lg bg-primary p-1 shadow-lg ring-1 ring-secondary_alt"
            tippyOptions={bubbleTippyOptions}
          >
            <ToolbarSurface editor={editor} showTooltips={showTooltips} variant="bubble" size="sm" />
          </BubbleMenu>
        )}
      </div>
    );
  }

  /**
   * `default-sm`: plain toolbar row.
   * `floating-toolbar-sm`: same column + **always-visible** bubble chrome (`rounded-lg … ring-secondary_alt`) — not selection-only `BubbleMenu`.
   */
  if (size === "sm") {
    return (
      <div
        className={cx("group w-full overflow-hidden bg-primary", className)}
        data-input-size={size}
      >
        <div className="mx-auto! w-max">
          <div className="flex w-full max-w-lg flex-col gap-2">
            {!floatingToolbar && (
              <ToolbarSurface editor={editor} showTooltips={showTooltips} variant="fixed" size={toolbarSize} />
            )}
            {floatingToolbar && (
              <ToolbarSurface
                editor={editor}
                showTooltips={showTooltips}
                variant="bubble"
                size={toolbarSize}
                surfaceClassName="rounded-lg bg-primary p-1 shadow-lg ring-1 ring-secondary_alt"
              />
            )}
            {editorColumn}
          </div>
        </div>
      </div>
    );
  }

  /**
   * `default-md`: plain font row + format strip.
   * `floating-toolbar-md`: same column + always-visible `rounded-xl … p-2 ring-secondary_alt` around the full toolbar.
   */
  return (
    <div className={cx("group w-full overflow-hidden bg-primary", className)} data-input-size={size}>
      <div className="mx-auto! w-max">
        <div className="flex w-full max-w-180 flex-col gap-3">
          {!floatingToolbar && (
            <ToolbarSurface editor={editor} showTooltips={showTooltips} variant="fixed" size={toolbarSize} />
          )}
          {floatingToolbar && (
            <ToolbarSurface
              editor={editor}
              showTooltips={showTooltips}
              variant="bubble"
              size={toolbarSize}
              surfaceClassName="rounded-xl bg-primary p-2 shadow-lg ring-1 ring-secondary_alt"
            />
          )}
          {editorColumn}
        </div>
      </div>
    </div>
  );
};

TextEditor.displayName = "TextEditor";
