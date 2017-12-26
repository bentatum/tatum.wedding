export default theme => ({
  img: {
    maxWidth: '100%'
  },
  maskImg: {
    visibility: 'hidden'
  },
  progress: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  captchaWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.unit * 4
  },
  captchaTitle: {
    marginBottom: theme.spacing.unit * 2
  },
  captchaSubHeading: {
    textAlign: 'center',
    marginTop: theme.spacing.unit
  }
})
