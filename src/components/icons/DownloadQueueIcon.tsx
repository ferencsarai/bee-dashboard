import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import React from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    downloadQueueIconContainer: {
      position: 'relative',
    },
  }),
)

interface Props {
  added?: boolean
}

const DownloadQueueIcon = ({ added }: Props): ReactElement => {
  const classes = useStyles()
  const [addedToQueue, setAddedToQueue] = React.useState<boolean>(added ? added : false)

  return (
    <div className={classes.downloadQueueIconContainer} onClick={() => setAddedToQueue(!addedToQueue)}>
      {added ? (
        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 5.58398C12.3222 5.58398 12.5833 5.84515 12.5833 6.16732V12.3424L13.9209 11.0048C14.1487 10.777 14.518 10.777 14.7458 11.0048C14.9736 11.2326 14.9736 11.602 14.7458 11.8298L12.4125 14.1631C12.1847 14.3909 11.8153 14.3909 11.5875 14.1631L9.25419 11.8298C9.02638 11.602 9.02638 11.2326 9.25419 11.0048C9.48199 10.777 9.85134 10.777 10.0791 11.0048L11.4167 12.3424V6.16732C11.4167 5.84515 11.6778 5.58398 12 5.58398ZM7.33333 11.4173C7.6555 11.4173 7.91667 11.6785 7.91667 12.0007V16.6673C7.91667 16.822 7.97812 16.9704 8.08752 17.0798C8.19692 17.1892 8.34529 17.2507 8.5 17.2507H15.5C15.6547 17.2507 15.8031 17.1892 15.9125 17.0798C16.0219 16.9704 16.0833 16.822 16.0833 16.6673V12.0007C16.0833 11.6785 16.3445 11.4173 16.6667 11.4173C16.9888 11.4173 17.25 11.6785 17.25 12.0007V16.6673C17.25 17.1314 17.0656 17.5766 16.7374 17.9048C16.4092 18.2329 15.9641 18.4173 15.5 18.4173H8.5C8.03587 18.4173 7.59075 18.2329 7.26256 17.9048C6.93437 17.5766 6.75 17.1314 6.75 16.6673V12.0007C6.75 11.6785 7.01117 11.4173 7.33333 11.4173Z"
            fill="#DE7700"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26 2.23723L22 0L18 2.23723V6.7117L22 8.94893L26 6.7117V2.23723ZM20 4.72611L21.3333 6L24 3.45223L23.53 3L21.3333 5.09873L20.47 4.27389L20 4.72611Z"
            fill="#DE7700"
          />
        </svg>
      ) : (
        <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 5.58398C12.3222 5.58398 12.5833 5.84515 12.5833 6.16732V12.3424L13.9209 11.0048C14.1487 10.777 14.518 10.777 14.7458 11.0048C14.9736 11.2326 14.9736 11.602 14.7458 11.8298L12.4125 14.1631C12.1847 14.3909 11.8153 14.3909 11.5875 14.1631L9.25419 11.8298C9.02638 11.602 9.02638 11.2326 9.25419 11.0048C9.48199 10.777 9.85134 10.777 10.0791 11.0048L11.4167 12.3424V6.16732C11.4167 5.84515 11.6778 5.58398 12 5.58398ZM7.33333 11.4173C7.6555 11.4173 7.91667 11.6785 7.91667 12.0007V16.6673C7.91667 16.822 7.97812 16.9704 8.08752 17.0798C8.19692 17.1892 8.34529 17.2507 8.5 17.2507H15.5C15.6547 17.2507 15.8031 17.1892 15.9125 17.0798C16.0219 16.9704 16.0833 16.822 16.0833 16.6673V12.0007C16.0833 11.6785 16.3445 11.4173 16.6667 11.4173C16.9888 11.4173 17.25 11.6785 17.25 12.0007V16.6673C17.25 17.1314 17.0656 17.5766 16.7374 17.9048C16.4092 18.2329 15.9641 18.4173 15.5 18.4173H8.5C8.03587 18.4173 7.59075 18.2329 7.26256 17.9048C6.93437 17.5766 6.75 17.1314 6.75 16.6673V12.0007C6.75 11.6785 7.01117 11.4173 7.33333 11.4173Z"
            fill="#333333"
          />
          <rect x="20.5996" width="1.8" height="9" fill="#333333" />
          <rect x="17" y="5.39941" width="1.8" height="9" transform="rotate(-90 17 5.39941)" fill="#333333" />
        </svg>
      )}
    </div>
  )
}

export default DownloadQueueIcon
