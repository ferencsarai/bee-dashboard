import { ReactElement, useEffect, useState } from 'react'
import { FileInfo, FileManager } from '@solarpunkltd/file-manager-lib'
import { BatchId, Reference } from '@ethersphere/bee-js'
import { createStyles, makeStyles } from '@material-ui/core'
import FileItem from '../../components/FileItem'

const useStyles = makeStyles(() =>
  createStyles({
    errorTextContainer: {
      display: 'flex',
      gap: '10px',
    },
    noFilesText: {
      width: '100%',
      textAlign: 'center',
      marginTop: '200px',
      fontFamily: '"iAWriterMonoV", monospace',
      fontSize: '18px',
    },
    fileListContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    flexDisplay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },
  }),
)
export default function FM(): ReactElement {
  const classes = useStyles()
  const filemanager = new FileManager()
  filemanager.initialize()
  const [fileList, setFileList] = useState<FileInfo[]>([])
  const [fileListError, setFileListError] = useState(false)

  useEffect(() => {
    function fetchFiles() {
      try {
        const files = filemanager.getFileInfoList()
        setFileList(files)
      } catch (error) {
        setFileListError(true)
      }
    }

    fetchFiles()
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-console
    // filemanager.upload('123', '123', {
    //   name: 'ACT WorkShop part3 (2024-03-25 15_06 GMT+1).mp4',
    //   valid: '01/01/2024 00:00',
    //   size: '9456321.854 Gb',
    //   description: 'some description',
    //   label: 'some label',
    //   uploaded: 'by user',
    //   type: 'audio',
    //   preview: 'true',
    // })
    // eslint-disable-next-line no-console
    console.log(filemanager.getFileInfoList())
  }, [])

  return (
    <div>
      {fileList.length === 0 && <div className={classes.noFilesText}>There’re no items!</div>}
      {fileList.length > 0 && (
        <div className={classes.fileListContainer}>
          {fileList.map((file, index) => (
            <div key={index}>
              <FileItem
                name={file.customMetadata?.name ? file.customMetadata.name : ''}
                type={file.customMetadata?.type ? file.customMetadata.type : 'other'}
                size={100}
                hash={file.eFileRef}
                expires={'01/01/2024 00:00'}
                preview={file.customMetadata?.preview ? file.customMetadata.preview : ''}
              ></FileItem>
            </div>
          ))}
        </div>
      )}
      {fileListError && <div className={classes.errorTextContainer}>Uh oh, some error happened</div>}
    </div>
  )
}
