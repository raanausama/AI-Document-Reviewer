import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css'
import '../pages/upload.css';
import swal from 'sweetalert';
// import { getDroppedOrSelectedFiles } from 'html5-file-selector'
/* eslint-disable */

const UploaderDropzone = ({ name, setFiles, files,setDone,}) => {

  const handleChangeStatus = ({ file  }, status,Files) => {
    if (status === 'done') {
      if (name === "passport") {
        setFiles({ ...files, doc: file });
        
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
      maxSizeBytes={3000000}
      onSubmit={(files) => {
        saveFileUrlsToMyServer(files);

        swal('Success', 'uploaded ', 'success');
      }}
      maxFiles={1}
      inputContent='Upload'
    //   inputWithFilesContent={(files) => `${3 - files.length} more`}
      styles={{ minHeight: '150px !important', overFlow: 'auto' }}
      
    />
  );
};

export default UploaderDropzone;
