/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import { JssProvider } from 'react-jss'
import { withStyles, MuiThemeProvider } from 'material-ui/styles'
import wrapDisplayName from 'recompact/wrapDisplayName'
import { getContext } from 'theme/context'

// Apply some reset
const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale' // Antialiasing.
    },
    body: {
      margin: 0,
      fontFamily: 'Roboto'
    }
  }
})

const AppWrapper = withStyles(styles)(props => props.children)

function withRoot (BaseComponent) {
  class WithRoot extends Component {
    static getInitialProps (ctx) {
      if (BaseComponent.getInitialProps) {
        return BaseComponent.getInitialProps(ctx)
      }

      return {}
    }

    componentDidMount () {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }

    render () {
      const context = getContext()

      if (process.browser) {
        return (
          <MuiThemeProvider theme={context.theme}>
            <AppWrapper>
              <BaseComponent {...this.props} />
            </AppWrapper>
          </MuiThemeProvider>
        )
      }

      return (
        <JssProvider registry={context.sheetsRegistry} jss={context.jss}>
          <MuiThemeProvider
            theme={context.theme}
            sheetsManager={context.sheetsManager}
          >
            <AppWrapper>
              <BaseComponent {...this.props} />
            </AppWrapper>
          </MuiThemeProvider>
        </JssProvider>
      )
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = wrapDisplayName(BaseComponent, 'withRoot')
  }

  return WithRoot
}

export default withRoot
