import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'

const enhance = withStyles(require('./style').default)

export default enhance(({ classes }) => (
  <AppBar classes={{ root: classes.root }}>
    <Toolbar>
      <Typography classes={{ root: classes.title }} type='title'>
        <span>
          <span className={classes.heart}>♥</span>
        </span>
        Allie & Ben Tatum
      </Typography>
      <Button color='primary'>
        Images
      </Button>
      <Button color='primary'>
        Videos
      </Button>
    </Toolbar>
  </AppBar>
))
