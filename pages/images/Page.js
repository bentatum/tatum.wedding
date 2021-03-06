import React from 'react'
import Layout from 'layout'
import { withRedux, withMUI } from 'components'
import { GridList, GridListTile } from 'material-ui/GridList'
import { withHandlers, withState, setStatic, compose } from 'recompact'
import { readImages } from 'store/components/gallery/actions'
import { ImageDialog } from './components'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

function getGridListCols (size) {
  switch (size) {
    case 'small':
      return 2
    case 'medium':
      return 4
    case 'large':
    case 'extraLarge':
    case 'infinity':
      return 6
    case 'extraSmall':
    default:
      return 1
  }
}

function getImgSize (size) {
  switch (size) {
    case 'small':
    case 'extraSmall':
      return 'medium'
    default:
      return 'small'
  }
}

const enhance = compose(
  withMUI,
  withRedux(state => ({
    images: state.gallery.images,
    browser: state.browser
  })),
  setStatic('getInitialProps', async ({ store }) => {
    await store.dispatch(readImages())
    return {}
  }),
  withState('fullScreen', 'toggleFullScreen', false),
  withState('fullScreenImg', 'setFullScreenImg', null),
  withState('gridCols', 'setGridCols'),
  withState('showCaptcha', 'toggleCaptcha'),
  withState('queuedImgForDownload', 'queueImgForDownload'),
  withState('newTabBlocked', 'setNewTabBlocked'),
  withHandlers({
    onImgClick: props => img => {
      props.toggleFullScreen(true)
      props.setFullScreenImg(img)
    },
    handleImageDownloadClick: props => img => {
      props.toggleCaptcha(true)
      props.queueImgForDownload(img)
    },
    handleCaptchaComplete: props => () => {
      const newTab = window.open(props.queuedImgForDownload.full, '_blank')

      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        props.setNewTabBlocked(true)
      } else {
        props.toggleFullScreen(false)
      }
    },
    handleImageDialogExited: props => () => {
      props.setFullScreenImg(null)
      props.toggleCaptcha(false)
      props.queueImgForDownload(null)
    }
  }),
  withStyles(require('./style').default)
)

class Page extends React.Component {
  componentDidMount () {
    this._setGridCols(this.props.browser.mediaType)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.browser.mediaType !== nextProps.browser.mediaType) {
      this._setGridCols(nextProps.browser.mediaType)
    }
  }

  _setGridCols (mediaType) {
    this.props.setGridCols(getGridListCols(mediaType))
  }

  render () {
    const {
      onImgClick,
      fullScreen,
      fullScreenImg,
      images,
      toggleFullScreen,
      browser,
      gridCols,
      classes,
      showCaptcha,
      handleCaptchaComplete,
      handleImageDownloadClick,
      handleImageDialogExited,
      newTabBlocked
    } = this.props

    return (
      <Layout>
        {!gridCols && (
          <div className={classes.progress}>
            <CircularProgress />
          </div>
        )}
        {gridCols && (
          <div className={classes.grid}>
            <GridList cols={gridCols}>
              {images.map((img, key) => (
                <GridListTile
                  key={key}
                  cols={1}
                  onClick={() => onImgClick(img)}
                >
                  <img src={img[getImgSize(browser.mediaType)]} />
                </GridListTile>
              ))}
            </GridList>
            <ImageDialog
              open={fullScreen}
              img={fullScreenImg}
              showCaptcha={showCaptcha}
              newTabBlocked={newTabBlocked}
              onDowloadClick={handleImageDownloadClick}
              captchaCallback={handleCaptchaComplete}
              onClose={() => toggleFullScreen(false)}
              onExited={handleImageDialogExited}
            />
          </div>
        )}
      </Layout>
    )
  }
}

export default enhance(Page)
