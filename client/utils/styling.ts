import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const [shortDimension, longDimension] =
  SCREEN_WIDTH < SCREEN_HEIGHT
    ? [SCREEN_WIDTH, SCREEN_HEIGHT]
    : [SCREEN_HEIGHT, SCREEN_WIDTH];

const width = 375;
const height = 812;

export const scale = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel((shortDimension / width) * (size as number))
  );
export const verticalScale = (size: number) =>
  Math.round(
    PixelRatio.roundToNearestPixel((longDimension / height) * (size as number))
  );
