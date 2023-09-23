import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
const EmailMessge = ({ message, own, image, video, document }: any) => {
  const data = message.body
  const validate = /Re:/i

  return (
    <Box sx={{ paddingX: 3 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {message !== '' ? (
          <>
            <>
              <Typography
                sx={
                  message.subject.match(validate)
                    ? null
                    : {
                        p: '10px',
                        borderRadius: '0.5rem',
                        backgroundColor: '#007ef2',
                        color: 'white',
                        maxWidth: '100%',
                        width: '100%',
                      }
                }
              >
                {message.subject.match(validate) ? (
                  <>
                    <Divider />
                    <Typography>{message.subject}</Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      Subject:
                    </Typography>
                  </>
                )}
              </Typography>
            </>

            <>
              {message.subject.match(validate) ? null : (
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Body:
                </Typography>
              )}
            </>
            <>
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{
                  __html: data,
                }}
              ></Typography>
            </>
          </>
        ) : (
          <Box
            sx={{
              minWidth: '25vw',
              minHeight: '25vh',
              maxHeight: '25vh',
              maxWidth: '25vw',
            }}
          >
            {/* <MediaCarsoul isVideo={false} media={media} /> */}
          </Box>
        )}
      </Box>
      {/* <div className="messageBottom">{message.createdAt}</div> */}
    </Box>
  )
}

export default EmailMessge
