import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css'
import '../pages/upload.css';
import swal from 'sweetalert';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { Stack, Typography } from '@mui/material';
// import { getDroppedOrSelectedFiles } from 'html5-file-selector'
/* eslint-disable */

const UploaderDropzone = ({ name, setFiles, files, setDone}) => {

  const handleChangeStatus = ({ file  }, status,Files) => {
    console.log('status',status)
    if (status === 'done') {
      if (name === "passport") {
        setFiles({ ...files, doc: file });
        // extractAndSaveData(file);

      }
    }
    else if (status === "removed") {
      if (name === "passport") {
        setFiles({ ...files, doc: {} });
        setDone(0);
      }
    }
  };


  function saveFileUrlsToMyServer(submittedFiles) {
    setFiles({ ...files, doc: submittedFiles });
    setDone(1);
  }

  return (
    <Dropzone
      className="benLoad load"
      // getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      accept="application/pdf"
      maxSizeBytes={20 * 1024 * 1024}
      onSubmit={(files) => {
        saveFileUrlsToMyServer(files);
        // swal('Success', 'uploaded ', 'success');
      }}
      maxFiles={1}
      // inputContent='Drag and Drop files here'
      inputContent={
        <>
          <Stack textAlign='center' display='flex' alignItems='center' color='black'>
            {/* <CloudUploadOutlinedIcon fontSize="large" /> */}            
            {/* <img width="64" height="64" src="https://img.icons8.com/external-bearicons-blue-bearicons/64/external-upload-call-to-action-bearicons-blue-bearicons.png" alt="external-upload-call-to-action-bearicons-blue-bearicons"/> */}
            <img width="80" height="80" src="https://img.icons8.com/bubbles/100/upload.png" alt="upload"/>
             <Typography>Drag and Drop here</Typography>
          </Stack>
        </>
      }
    //   inputWithFilesContent={(files) => `${3 - files.length} more`}
      styles={{ minHeight: '150px !important', overFlow: 'auto' }}
      
    />
  );
};

export default UploaderDropzone;
