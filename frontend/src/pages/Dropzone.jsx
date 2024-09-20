import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import "../pages/upload.css";
import Swal from "sweetalert2";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { Stack, Typography } from "@mui/material";
// import { getDroppedOrSelectedFiles } from 'html5-file-selector'
/* eslint-disable */

const UploaderDropzone = ({
  name,
  setFiles,
  files,
  setDone,
  handleFileUpload,
  handleResponses,
}) => {
  // const handleChangeStatus = ({ file  }, status,Files) => {
  //   console.log('status',status)
  //   if (status === 'done') {
  //     if (name === "passport") {
  //       setFiles({ ...files, doc: file });
  //       // extractAndSaveData(file);

  //     }
  //   }
  //   else if (status === "removed") {
  //     if (name === "passport") {
  //       setFiles({ ...files, doc: {} });
  //       setDone(0);
  //     }
  //   }
  // };
  const handleChangeStatus = ({ file }, status) => {
    console.log("status", status);
    if (status === "done") {
      if (name === "passport") {
        setFiles((prevFiles) => ({ ...prevFiles, doc: file }));
      }
    } else if (status === "removed") {
      console.log("removed");
      setFiles((prevFiles) => ({ ...prevFiles, doc: {} }));
            setDone(0);
            handleResponses();
      // if (name === "passport") {
      //   console.log("inside passport");
      //   Swal.fire({
      //     title: "Cancel Upload",
      //     text: "Are You Sure?",
      //     icon: "warning",
      //     color: "white",
      //     background: "linear-gradient(to right, #88775d, #212223)",
      //     confirmButtonText: "Yes",
      //     cancelButtonText: "No",
      //     confirmButtonColor: "#a87b4c",
      //     cancelButtonColor: "#CBBAA8",
      //     showCancelButton: true,
      //     showCloseButton: true,
      //   }).then((result) => {
      //     console.log("outsideresult", result);
      //     if (result.isConfirmed) {
      //       console.log("insideresult");
      //       setFiles((prevFiles) => ({ ...prevFiles, doc: {} }));
      //       setDone(0);
      //       handleResponses();
      //     } else {console.log("am here in else")}
      //   });
      // }
    }
  };

  function saveFileUrlsToMyServer(submittedFiles) {
    setFiles({ ...files, doc: submittedFiles });
    setDone(1);
    //   swal({
    //     title: "File Ready to Upload",
    //     text: "Do you want to upload the file now?",
    //     icon: "warning",
    //     buttons: true,
    //     dangerMode: true,
    // }).then((willUpload) => {
    //     if (willUpload) {
    //         // If user confirms, trigger file upload
    //         setTimeout(() => {
    //           handleFileUpload();
    //         }, 1000)

    //     } else {
    //         // Handle the case where the user cancels the upload
    //         console.log('User canceled the upload.');
    //     }
    // });

    // handleFileUpload();
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
          <Stack
            textAlign="center"
            display="flex"
            alignItems="center"
            color="white"
          >
            {/* <CloudUploadOutlinedIcon fontSize="large" /> */}
            {/* <img width="64" height="64" src="https://img.icons8.com/external-bearicons-blue-bearicons/64/external-upload-call-to-action-bearicons-blue-bearicons.png" alt="external-upload-call-to-action-bearicons-blue-bearicons"/> */}
            <img
              width="80"
              height="80"
              src="https://img.icons8.com/?size=100&id=cWhjh7IgpFHy&format=png&color=000000"
              alt="upload"
            />
            <Typography>Drag and Drop here</Typography>
          </Stack>
        </>
      }
      //   inputWithFilesContent={(files) => `${3 - files.length} more`}
      styles={{ minHeight: "150px !important", overFlow: "auto" }}
    />
  );
};

export default UploaderDropzone;



// import Dropzone from "react-dropzone-uploader";
// import "react-dropzone-uploader/dist/styles.css";
// import "../pages/upload.css";
// import Swal from "sweetalert2";
// import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
// import { Stack, Typography, Button } from "@mui/material";

// const UploaderDropzone = ({
//   name,
//   setFiles,
//   files,
//   setDone,
//   handleFileUpload,
//   handleResponses,
// }) => {
//   const handleChangeStatus = ({ file }, status) => {
//     console.log("status", status);
//     if (status === "done") {
//       if (name === "passport") {
//         setFiles((prevFiles) => ({ ...prevFiles, doc: file }));
//         setDone(1);
//       }
//     } else if (status === "removed") {
//       if (name === "passport") {
//         handleCancelUpload();
//       }
//     }
//   };

//   const handleCancelUpload = (file) => {
//     Swal.fire({
//       title: "Cancel Upload",
//       text: "Are You Sure?",
//       icon: "warning",
//       color: "white",
//       background: "linear-gradient(to right, #88775d, #212223)",
//       confirmButtonText: "Yes",
//       cancelButtonText: "No",
//       confirmButtonColor: "#a87b4c",
//       cancelButtonColor: "#CBBAA8",
//       showCancelButton: true,
//       showCloseButton: true,
//     }).then((result) => {
//       if (result.isConfirmed) {
//         setFiles((prevFiles) => ({ ...prevFiles, doc: {} }));
//         setDone(0);
//         handleResponses();
//       }
//       else if (result.isDenied)  {
//         // Revert the cancellation, re-add the file back if necessary
//         handleChangeStatus();
//         setFiles((prevFiles) => ({ ...prevFiles, doc: file }));
//       }
//     });
//   };

//   function saveFileUrlsToMyServer(submittedFiles) {
//     setFiles({ ...files, doc: submittedFiles });
//     setDone(1);
//   }

//   return (
//     <Dropzone
//       className="benLoad load"
//       // getUploadParams={getUploadParams}
//       onChangeStatus={handleChangeStatus}
//       accept="application/pdf"
//       maxSizeBytes={20 * 1024 * 1024}
//       onSubmit={(files) => {
//         saveFileUrlsToMyServer(files);

//         // swal('Success', 'uploaded ', 'success');
//       }}
//       maxFiles={1}
//       // inputContent='Drag and Drop files here'
//       inputContent={
//         <>
//           <Stack
//             textAlign="center"
//             display="flex"
//             alignItems="center"
//             color="white"
//           >
//             {/* <CloudUploadOutlinedIcon fontSize="large" /> */}
//             {/* <img width="64" height="64" src="https://img.icons8.com/external-bearicons-blue-bearicons/64/external-upload-call-to-action-bearicons-blue-bearicons.png" alt="external-upload-call-to-action-bearicons-blue-bearicons"/> */}
//             <img
//               width="80"
//               height="80"
//               src="https://img.icons8.com/bubbles/100/upload.png"
//               alt="upload"
//             />
//             <Typography>Drag and Drop here</Typography>
//           </Stack>
//         </>
//       }
//       //   inputWithFilesContent={(files) => `${3 - files.length} more`}
//       styles={{ minHeight: "150px !important", overFlow: "auto" }}
//     />
//   );
// };

// export default UploaderDropzone;

