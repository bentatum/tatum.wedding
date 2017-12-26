import { Header } from './components'
import { withStyles } from 'material-ui/styles'

const enhance = withStyles(require('./style').default)

export default enhance(({ children, classes }) => (
  <div className={classes.root}>
    <Header />
    <div className={classes.children}>{children}</div>
  </div>
))
