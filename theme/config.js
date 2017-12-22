import { primary } from './colors'
import { grey } from 'material-ui/colors'

export const spacing = {
  unit: 8
}

export const palette = {
  primary,
  grey
}

// export const typography = {
//   fontFamily: "'Open Sans', sans-serif"
// }

export const overrides = {
  MuiDialogActions: {
    root: {
      borderTopWidth: 1,
      borderTopColor: grey[200],
      borderTopStyle: 'solid',
      padding: spacing.unit * 3,
      margin: 0
    }
  },
  MuiButton: {
    raisedPrimary: {
      color: '#fff'
    }
  }
}

// export const status = {
//   danger: 'orange'
// }
