import { withStyles } from 'material-ui/styles'

const enhance = withStyles(require('./style').default)

export default enhance(({ classes, ratio, ...others }) =>
  <div
    className={classes.root}
    style={{
      paddingBottom: `${(ratio || 9 / 16) * 100}%`,
    }} {...others}/>
)
