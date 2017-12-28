export default {
  root: {
    position: 'relative',
    height: 0,
    padding: 0,
    // paddingBottom: `${(props.ratio || 9 / 16) * 100}%`,
    overflow: 'hidden',
    '& > video': {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      bottom: 0,
      left: 0,
      border: 0
    }
  }
}
