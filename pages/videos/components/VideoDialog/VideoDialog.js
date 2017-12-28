import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog'
import { get } from 'lodash'
import { Player } from 'video-react'

export default ({ video, open, onClose, onExited }) => (
  <Dialog maxWidth='md' onClose={onClose} open={open} onExited={onExited}>
    <DialogTitle>{get(video, 'title')}</DialogTitle>
    <DialogContent>
      <div style={{ width: 500 }}>
        <Player aspectRatio='16:9' fluid playsInline src={get(video, 'uri')} />
      </div>
    </DialogContent>
  </Dialog>
)
