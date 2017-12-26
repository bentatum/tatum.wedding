import React from 'react'
import loadScript from 'load-script'
import { defaultProps } from 'recompact'

const enhance = defaultProps({
  siteKey: '7PCbUl5UsEaHOq3Mn8zFHhXbfYdQ7Li5'
})

class Captcha extends React.Component {
  async componentWillMount () {
    window['@@tatumWedding/captcha/callback'] = this.props.callback
    await loadScript('https://authedmine.com/lib/captcha.min.js')
  }

  render () {
    return (
      <form action='?' method='post'>
        <div
          className='coinhive-captcha'
          data-hashes='512'
          data-key='7PCbUl5UsEaHOq3Mn8zFHhXbfYdQ7Li5'
          data-callback='@@tatumWedding/captcha/callback'
          data-whitelabel='false'
        />
      </form>
    )
  }
}

export default enhance(Captcha)
