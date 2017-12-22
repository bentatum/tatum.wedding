export default theme => ({
  root: {
    backgroundColor: theme.palette.common.white,
    boxShadow: 'none'
  },
  heart: {
    fontSize: 33,
    color: theme.palette.primary[500],
    marginRight: theme.spacing.unit / 1.5
  },
  title: {
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  }
})
