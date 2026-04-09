"use client";

import type { ComponentPropsWithRef, ReactNode } from "react";
import {
  ColorArea as AriaColorArea,
  ColorField as AriaColorField,
  ColorPicker as AriaColorPicker,
  ColorSlider as AriaColorSlider,
  ColorSwatch as AriaColorSwatch,
  ColorSwatchPicker as AriaColorSwatchPicker,
  ColorSwatchPickerItem as AriaColorSwatchPickerItem,
  ColorThumb as AriaColorThumb,
  ColorWheelTrack as AriaColorWheelTrack,
  ColorWheel as AriaColorWheel,
  SliderOutput,
  SliderTrack,
  type ColorPickerProps as AriaColorPickerProps,
  type ColorSwatchPickerProps as AriaColorSwatchPickerProps,
} from "react-aria-components";
import { cx } from "@/utils";

// ---------------------------------------------------------------------------
// ColorPickerRoot — wraps React Aria ColorPicker
// ---------------------------------------------------------------------------

export interface ColorPickerProps extends AriaColorPickerProps {
  children: ReactNode;
}

const ColorPickerRoot = ({ children, ...props }: ColorPickerProps) => (
  <AriaColorPicker {...props}>
    <div className="flex flex-col gap-4">{children}</div>
  </AriaColorPicker>
);

// ---------------------------------------------------------------------------
// ColorPickerArea — 2D saturation/brightness area
// ---------------------------------------------------------------------------

interface ColorPickerAreaProps {
  colorSpace?: "hsb" | "hsl";
  xChannel?: "saturation";
  yChannel?: "brightness" | "lightness";
  className?: string;
}

const ColorPickerArea = ({
  colorSpace = "hsb",
  xChannel = "saturation",
  yChannel = "brightness",
  className,
}: ColorPickerAreaProps) => (
  <AriaColorArea
    colorSpace={colorSpace}
    xChannel={xChannel}
    yChannel={yChannel}
    className={cx("h-48 w-full rounded-lg", className)}
  >
    <AriaColorThumb className="size-5 cursor-grab rounded-full border-2 border-white shadow-md active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1" />
  </AriaColorArea>
);

// ---------------------------------------------------------------------------
// ColorPickerHueSlider — horizontal hue slider
// ---------------------------------------------------------------------------

interface ColorPickerHueSliderProps {
  className?: string;
}

const ColorPickerHueSlider = ({ className }: ColorPickerHueSliderProps) => (
  <AriaColorSlider
    colorSpace="hsl"
    channel="hue"
    className={cx("w-full", className)}
  >
    <SliderTrack
      style={{ background: "linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))" }}
      className="h-3 w-full rounded-full"
    >
      <AriaColorThumb className="top-1/2 size-5 -translate-y-1/2 cursor-grab rounded-full border-2 border-white shadow-md active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1" />
    </SliderTrack>
  </AriaColorSlider>
);

// ---------------------------------------------------------------------------
// ColorPickerAlphaSlider — horizontal alpha slider
// ---------------------------------------------------------------------------

interface ColorPickerAlphaSliderProps {
  className?: string;
}

const ColorPickerAlphaSlider = ({ className }: ColorPickerAlphaSliderProps) => (
  <AriaColorSlider
    colorSpace="hsl"
    channel="alpha"
    className={cx("w-full", className)}
  >
    <SliderTrack className="relative h-3 w-full overflow-hidden rounded-full">
      {/* Checkerboard for alpha background */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='4' height='4' fill='%23ccc'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ccc'/%3E%3C/svg%3E\")",
        }}
      />
      <AriaColorThumb className="top-1/2 size-5 -translate-y-1/2 cursor-grab rounded-full border-2 border-white shadow-md active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1" />
    </SliderTrack>
  </AriaColorSlider>
);

// ---------------------------------------------------------------------------
// ColorPickerSwatch — single color swatch preview
// ---------------------------------------------------------------------------

interface ColorPickerSwatchProps extends ComponentPropsWithRef<"div"> {
  className?: string;
}

const ColorPickerSwatch = ({ className, ...props }: ColorPickerSwatchProps) => (
  <AriaColorSwatch
    {...(props as any)}
    className={cx("size-8 rounded-md border border-secondary shadow-sm", className)}
  />
);

// ---------------------------------------------------------------------------
// ColorPickerInput — hex / rgba text input
// ---------------------------------------------------------------------------

interface ColorPickerInputProps {
  channel?: "hex" | "red" | "green" | "blue" | "alpha" | "hue" | "saturation" | "brightness" | "lightness";
  label?: string;
  className?: string;
}

const ColorPickerInput = ({ channel = "hex", label, className }: ColorPickerInputProps) => (
  <div className={cx("flex flex-col gap-1", className)}>
    {label && <span className="text-xs font-medium text-tertiary">{label}</span>}
    <AriaColorField
      colorSpace={channel === "hex" ? undefined : channel === "hue" || channel === "saturation" || channel === "lightness" ? "hsl" : "rgb"}
      channel={channel === "hex" ? undefined : channel as any}
      className="w-full"
    >
      <input
        className="w-full rounded-md border border-secondary bg-primary px-2.5 py-1.5 text-sm text-secondary placeholder:text-placeholder focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 transition duration-100 ease-linear"
      />
    </AriaColorField>
  </div>
);

// ---------------------------------------------------------------------------
// ColorPickerSwatchGrid — grid of selectable preset swatches
// ---------------------------------------------------------------------------

interface ColorPickerSwatchGridProps extends Omit<AriaColorSwatchPickerProps, "children"> {
  colors: string[];
  className?: string;
}

const ColorPickerSwatchGrid = ({ colors, className, ...props }: ColorPickerSwatchGridProps) => (
  <AriaColorSwatchPicker
    {...props}
    className={cx("flex flex-wrap gap-2", className)}
  >
    {colors.map((color) => (
      <AriaColorSwatchPickerItem
        key={color}
        color={color}
        className="size-6 cursor-pointer rounded-md border border-secondary shadow-sm ring-offset-1 transition duration-100 ease-linear focus:outline-none focus-visible:ring-2 focus-visible:ring-brand selected:ring-2 selected:ring-brand selected:ring-offset-2"
      >
        <AriaColorSwatch className="size-full rounded-md" />
      </AriaColorSwatchPickerItem>
    ))}
  </AriaColorSwatchPicker>
);

// ---------------------------------------------------------------------------
// ColorPickerWheel — circular hue/saturation wheel
// ---------------------------------------------------------------------------

interface ColorPickerWheelProps {
  size?: number;
  className?: string;
}

const ColorPickerWheel = ({ size = 160, className }: ColorPickerWheelProps) => (
  <AriaColorWheel
    outerRadius={size / 2}
    innerRadius={size / 2 - 28}
    className={cx(className)}
  >
    <AriaColorWheelTrack />
    <AriaColorThumb className="size-5 cursor-grab rounded-full border-2 border-white shadow-md active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-1" />
  </AriaColorWheel>
);

// ---------------------------------------------------------------------------
// Preset compound layout helpers
// ---------------------------------------------------------------------------

/** Full picker: area + hue slider + alpha slider + input */
const ColorPickerFull = ({ className }: { className?: string }) => (
  <div className={cx("flex flex-col gap-3", className)}>
    <ColorPickerArea />
    <div className="flex items-center gap-3">
      <div className="flex flex-1 flex-col gap-2">
        <ColorPickerHueSlider />
        <ColorPickerAlphaSlider />
      </div>
      <ColorPickerSwatch className="size-10 shrink-0" />
    </div>
    <ColorPickerInput channel="hex" label="HEX" />
  </div>
);

/** Minimal picker: area + hue slider only */
const ColorPickerMinimal = ({ className }: { className?: string }) => (
  <div className={cx("flex flex-col gap-3", className)}>
    <ColorPickerArea />
    <ColorPickerHueSlider />
  </div>
);

// ---------------------------------------------------------------------------
// Compound export
// ---------------------------------------------------------------------------

export const ColorPicker = ColorPickerRoot as typeof ColorPickerRoot & {
  Area: typeof ColorPickerArea;
  HueSlider: typeof ColorPickerHueSlider;
  AlphaSlider: typeof ColorPickerAlphaSlider;
  Swatch: typeof ColorPickerSwatch;
  Input: typeof ColorPickerInput;
  SwatchGrid: typeof ColorPickerSwatchGrid;
  Wheel: typeof ColorPickerWheel;
  Full: typeof ColorPickerFull;
  Minimal: typeof ColorPickerMinimal;
};

ColorPicker.Area = ColorPickerArea;
ColorPicker.HueSlider = ColorPickerHueSlider;
ColorPicker.AlphaSlider = ColorPickerAlphaSlider;
ColorPicker.Swatch = ColorPickerSwatch;
ColorPicker.Input = ColorPickerInput;
ColorPicker.SwatchGrid = ColorPickerSwatchGrid;
ColorPicker.Wheel = ColorPickerWheel;
ColorPicker.Full = ColorPickerFull;
ColorPicker.Minimal = ColorPickerMinimal;
