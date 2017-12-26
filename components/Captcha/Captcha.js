import React from 'react'
import loadScript from 'load-script'

export default class Captcha extends React.Component {
  static defaultProps = {
    siteKey: '7PCbUl5UsEaHOq3Mn8zFHhXbfYdQ7Li5'
  }

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
