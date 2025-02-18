import { Box, Grid, Typography } from '@material-ui/core'
import { Web } from '@material-ui/icons'
import { ReactElement, useMemo } from 'react'
import File from 'remixicon-react/FileLineIcon'
import Folder from 'remixicon-react/FolderLineIcon'
import { FitImage } from '../../components/FitImage'
import { shortenText } from '../../utils'
import { getHumanReadableFileSize } from '../../utils/file'
import { shortenHash } from '../../utils/hash'
import { AssetIcon } from './AssetIcon'
import { FitVideo } from '../../components/FitVideo'

interface Props {
  previewUri?: string
  metadata?: Metadata
}

/* eslint-disable react/display-name */
const getPreviewComponent = (previewUri?: string, metadata?: Metadata) => {
  if (metadata?.isVideo) {
    return () => <FitVideo src={previewUri} maxWidth="250px" maxHeight="175px" />
  }

  if (metadata?.isImage) {
    return () => <FitImage maxWidth="250px" maxHeight="175px" alt="Upload Preview" src={previewUri} />
  }

  if (metadata?.isWebsite) {
    return () => <AssetIcon icon={<Web />} />
  }

  if (metadata?.type === 'folder') {
    return () => <AssetIcon icon={<Folder />} />
  }

  return () => <AssetIcon icon={<File />} />
}

const getType = (metadata?: Metadata) => {
  if (metadata?.isWebsite) return 'Website'

  if (metadata?.type === 'folder') return 'Folder'

  return metadata?.type
}

// TODO: add optional prop for indexDocument when it is already known (e.g. downloading a manifest)
export function AssetPreview({ metadata, previewUri }: Props): ReactElement | null {
  const PreviewAssetComponent = useMemo(() => getPreviewComponent(previewUri, metadata), [metadata, previewUri])
  const type = useMemo(() => getType(metadata), [metadata])

  return (
    <Box mb={4}>
      <Box bgcolor="background.paper">
        <Grid container direction="row">
          <PreviewAssetComponent />
          <Box p={2}>
            {metadata?.hash && <Typography>Swarm Hash: {shortenHash(metadata.hash)}</Typography>}
            {metadata?.name && metadata?.name !== metadata?.hash && (
              <Typography>
                {metadata?.type === 'folder' ? 'Folder Name' : 'Filename'}: {shortenText(metadata?.name)}
              </Typography>
            )}
            <Typography>Kind: {type}</Typography>
            {metadata?.size ? <Typography>Size: {getHumanReadableFileSize(metadata.size)}</Typography> : null}
          </Box>
        </Grid>
      </Box>
      {metadata?.type === 'folder' && metadata.count && (
        <Box mt={0.25} p={2} bgcolor="background.paper">
          <Grid container justifyContent="space-between" alignItems="center" direction="row">
            <Typography variant="subtitle2">Folder content</Typography>
            <Typography variant="subtitle2">{metadata.count} items</Typography>
          </Grid>
        </Box>
      )}
    </Box>
  )
}
