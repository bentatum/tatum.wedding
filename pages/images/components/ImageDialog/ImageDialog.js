import React from 'react'
import { get } from 'lodash'
import Dialog, {
  DialogActions,
  DialogContent
} from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import { withState, compose, withHandlers } from 'recompact'
import { CircularProgress } from 'material-ui/Progress'
import classnames from 'classnames'
import { Captcha } from 'components'
import Typography from 'material-ui/Typography'

const enhance = compose(
  withStyles(require('./style').default),
  withState('imgLoaded', 'setImgLoaded'),
  withHandlers({
    onImageLoad: props => () => {
      props.setImgLoaded(true)
    }
  })
)

export default enhance(
  ({
    handleCaptchaComplete,
    imgLoaded,
    onImageLoad,
    classes,
    img,
    open,
    onClose,
    showCaptcha,
    onDowloadClick,
    captchaCallback,
    onExited,
    newTabBlocked
  }) => (
    <Dialog maxWidth='md' onClose={onClose} open={open} onExited={onExited}>
      {showCaptcha && (
        <React.Fragment>
          <div className={classes.captchaWrap}>
            <Captcha callback={captchaCallback} />
            <Typography classes={{ root: classes.captchaSubHeading }}>
              Serving fast websites and high quality photographs can be costly.
              We want to make sure everyone is able to view the photos of our
              wedding as they were intended. This widget helps
              us pay for everything by momentarily using your computer to solve
              a few math problems and contribute to the{' '}
              <a
                href='https://www.amazon.com/Internet-Money-Andreas-M-Antonopoulos/dp/1537000454'
                target='_blank'
              >
                internet of money
              </a>. As soon as this is complete, the image will load in another tab.
            </Typography>
            {newTabBlocked &&
              <div className={classes.captchaPopUpBlocked}>
                <Typography type='subheading' classes={{ root: classes.captchaSubHeading }} gutterBottom>
                  Your popups are blocked, click the link below.
                </Typography>
                <Typography type='title' component='a' href={img.full} target='_blank' classes={{ root: classes.captchaSubHeading }}>
                  {img.full}
                </Typography>
              </div>
            }
          </div>
        </React.Fragment>
      )}
      {!imgLoaded && (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      )}
      <DialogContent>
        <div className={classnames({ [classes.maskImg]: !imgLoaded })}>
          <img
            onLoad={onImageLoad}
            src={get(img, 'large')}
            className={classes.img}
          />
        </div>
      </DialogContent>
      {imgLoaded &&
        !showCaptcha && (
          <DialogActions>
            <Button raised onClick={onClose}>
              Close
            </Button>
            <Button
              raised
              color='primary'
              onClick={() => onDowloadClick(img)}
            >
              Download
            </Button>
          </DialogActions>
        )}
    </Dialog>
  )
)
