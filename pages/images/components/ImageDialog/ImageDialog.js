import { get } from 'lodash'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { withState, compose, withHandlers } from 'recompact'
import { CircularProgress } from 'material-ui/Progress'
import classnames from 'classnames'

const enhance = compose(
  withStyles(require('./style').default),
  withState('imgLoaded', 'setImgLoaded'),
  withHandlers({
    onImageLoad: props => () => {
      props.setImgLoaded(true)
    }
  })
)

export default enhance(({ imgLoaded, onImageLoad, classes, img, open, onClose }) => (
  <Dialog maxWidth='md' onClose={onClose} open={open}>
    {!imgLoaded &&
      <div className={classes.progress}>
        <CircularProgress />
      </div>
    }
    <DialogContent>
      <div className={classnames({ [classes.maskImg]: !imgLoaded })}>
        <img onLoad={onImageLoad} src={get(img, 'large')} className={classes.img} />
      </div>
    </DialogContent>
    {imgLoaded &&
      <DialogActions>
        <Button raised onClick={onClose}>
          Close
        </Button>
        <Button raised color='primary' onClick={() => window.open(get(img, 'full'))}>
          Download
        </Button>
      </DialogActions>
    }
  </Dialog>
))
