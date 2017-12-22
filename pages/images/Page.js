import React from 'react'
import Layout from 'layout'
import { withRedux, withMUI } from 'components'
import { GridList, GridListTile } from 'material-ui/GridList'
import { withHandlers, withState, setStatic, compose } from 'recompact'
import { read } from 'store/components/gallery/actions'
import { ImageDialog } from './components'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'

function getGridListCols (size) {
  switch (size) {
    case 'small':
      return 2
    case 'medium':
      return 5
    case 'large':
      return 6
    case 'extraLarge':
      return 8
    case 'infinity':
      return 10
    case 'extraSmall':
    default:
      return 1
  }
}

const enhance = compose(
  withMUI,
  withRedux(state => ({
    images: state.gallery.images,
    browser: state.browser
  })),
  setStatic('getInitialProps', async ({ store }) => {
    await store.dispatch(read())
    return {}
  }),
  withState('fullScreen', 'toggleFullScreen', false),
  withState('fullScreenImg', 'setFullScreenImg', null),
  withState('gridCols', 'setGridCols'),
  withHandlers({
    onImgClick: props => img => {
      props.toggleFullScreen(true)
      props.setFullScreenImg(img)
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
      setFullScreenImg,
      images,
      toggleFullScreen,
      browser,
      gridCols,
      classes
    } = this.props

    return (
      <Layout>
        {!gridCols &&
          <div className={classes.progress}>
            <CircularProgress />
          </div>
        }
        {gridCols &&
          <div className={classes.grid}>
            <GridList cols={gridCols}>
              {images.map((img, key) => (
                <GridListTile key={key} cols={1} onClick={() => onImgClick(img)}>
                  <img src={img} />
                </GridListTile>
              ))}
            </GridList>
            <ImageDialog
              open={fullScreen}
              img={fullScreenImg}
              onClose={() => toggleFullScreen(false)}
              onExited={() => setFullScreenImg(null)}
            />
          </div>
        }
      </Layout>
    )
  }
}

export default enhance(Page)
