import { createStyles, Divider, makeStyles } from '@material-ui/core';
import { ReactElement, useEffect, useState } from 'react';
import FileItem, { Props as FileItemProps } from '../../components/FileItem';
import FilesHandler from '../../components/FilesHandler';
import SharedWith from '../../components/SharedWith';
import { getFileInfoList } from '@solarpunkltd/file-manager';
import { BatchId, Reference } from '@ethersphere/bee-js';

export interface FileInfo {
  fileRef: string | Reference;
  batchId: string | BatchId;
  shared?: boolean;
  fileName?: string;
  owner?: string;
  eGlRef?: string | Reference;
  historyRef?: string | Reference;
  timestamp?: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
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
  })
);

// Map FileInfo to FileItemProps
function mapFileInfoToFileItemProps(file: FileInfo): Omit<FileItemProps, 'key'> {
  return {
    name: file.fileName || 'Unknown',
    type: determineFileType(file.fileName || ''),
    size: 0, // Default size if not provided
    hash: file.fileRef.toString(),
    expires: file.timestamp
      ? new Date(file.timestamp).toLocaleDateString()
      : 'N/A',
    preview: false,
    note: false,
    tag: false,
    shared: file.shared ? 'others' : 'me',
    warning: false,
    addedToQueue: false,
  };
}

// Determine file type based on file extension
function determineFileType(fileName: string): FileItemProps['type'] {
  const extension = fileName.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'mp4':
    case 'mkv':
      return 'video';
    case 'mp3':
    case 'wav':
      return 'audio';
    case 'jpg':
    case 'png':
    case 'gif':
      return 'image';
    case 'pdf':
    case 'docx':
      return 'document';
    case undefined:
      return 'folder';
    default:
      return 'other';
  }
}

export default function FileManager(): ReactElement {
  const classes = useStyles();

  const [fileList, setFileList] = useState<FileInfo[]>([]);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const files = await getFileInfoList();
        setFileList(files);
      } catch (error) {
        console.error('Failed to fetch file info list:', error);
      }
    }

    fetchFiles();
  }, []);

  return (
    <div className={classes.container}>
      <FilesHandler />
      <div className={classes.flexDisplay}>
        <SharedWith text="For me" />
        <div style={{ flexGrow: 1 }}>
          <Divider />
        </div>
      </div>
      {fileList.map((file: FileInfo) => {
        const fileItemProps = mapFileInfoToFileItemProps(file);
        return <FileItem {...fileItemProps} />;
      })}
    </div>
  );
}