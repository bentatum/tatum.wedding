import Layout from 'layout'
import { withRedux, withMUI } from 'components'
import { withHandlers, withState, setStatic, compose } from 'recompact'
import { GridList, GridListTile } from 'material-ui/GridList'
import { readVideos } from 'store/components/gallery/actions'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import { VideoDialog } from './components'
import Head from 'next/head'

const enhance = compose(
  withMUI,
  withRedux(state => ({
    videos: state.gallery.videos,
    browser: state.browser
  })),
  setStatic('getInitialProps', async ({ store }) => {
    await store.dispatch(readVideos())
    return {}
  }),
  withStyles(require('./style').default),
  withState('selectedVideo', 'setSelectedVideo', null),
  withHandlers({
    onCloseFullScreen: props => () => {
      props.setSelectedVideo(null)
    },
    onThumbnailClick: props => video => {
      props.setSelectedVideo(video)
    }
  })
)

export default enhance(({ selectedVideo, onThumbnailClick, onCloseFullScreen, videos, classes }) => (
  <Layout>
    <Head>
      <link rel='stylesheet' href='/static/video-react.css' />
    </Head>
    <div className={classes.grid}>
      <GridList cols={6}>
        {videos.map((video, key) => (
          <GridListTile key={key} cols={1} onClick={() => onThumbnailClick(video)}>
            <Typography>
              {video.title}
            </Typography>
          </GridListTile>
        ))}
      </GridList>
    </div>
    <VideoDialog open={!!selectedVideo} video={selectedVideo} onClose={onCloseFullScreen} />
  </Layout>
))
