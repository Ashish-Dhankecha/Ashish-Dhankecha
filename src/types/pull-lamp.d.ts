import React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "pull-lamp": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          on?: boolean | string;
        },
        HTMLElement
      >;
    }
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "pull-lamp": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          on?: boolean | string;
        },
        HTMLElement
      >;
    }
  }
}
