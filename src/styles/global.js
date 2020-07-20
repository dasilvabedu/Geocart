import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  @import url(https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap);
  @import url(https://fonts.googleapis.com/icon?family=Material+Icons);

  html, body {
    height: 100vh;
  }
    
  body {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 0;
    margin-right: 0.23em;
    padding: 0;
    font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
  }
  
  * {
    outline: none;
    list-style: none;
    text-decoration: none;
  }

  *, *:before, *:after {
    font-family: inherit;
    box-sizing: inherit;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }
`
