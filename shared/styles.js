import { css, Global } from "@emotion/core";

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        padding: 0;
        background-color: #fff;
        min-height: 100%;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
          Roboto, "Helvetica Neue", Arial, sans-serif;
        font-size: 1em;
      }
    `}
  />
);
