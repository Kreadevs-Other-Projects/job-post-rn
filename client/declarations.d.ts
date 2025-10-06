declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.jpg" {
  const value: any;
  export default value;
}

declare module "*.jpeg" {
  const value: any;
  export default value;
}

declare module "*.gif" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const value: any;
  export default value;
}

declare module "../constants/styles" {
  export const Colors: {
    primaryColor: string;
    grayColor: string;
  };

  export const Fonts: {
    Medium: string;
    SemiBold: string;
  };
}
