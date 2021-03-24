import React, {useMemo, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import ReactPlayer from "react-player";

import {baseStyle, activeStyle, acceptStyle, rejectStyle, thumbsContainer, thumb, thumbInner, img} from "./Style"

function DnD(props) {
  const [files, setFiles] = useState([]);
  const {     getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject} = useDropzone({
    accept: 'image/*, video/*', getFilesFromEvent: event => myCustomFileGetter(event),
    onDrop: acceptedFiles => {
      const filesToSet = acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
      setFiles(filesToSet);
      props.setFiles(filesToSet);
    }
  })

 /* const files = acceptedFiles.map(f => (
    <li key={f.name}>
      {f.name} has <strong>myProps</strong>: {f.myProp === true ? 'YES' : ''}
    </li>
  ))*/
  const regVideo = new RegExp("^(video\/.*)$")
  const regImg = new RegExp("^(image\/.*)$")

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        {regVideo.test(file.type) ? (
             <ReactPlayer
             url={file.preview}
             width="100%"
             height="100%"
             controls={true}
           />
        ) : regImg.test(file.type) ? (
          <img src={file.preview} style={img} />
        ) : (
          "nieobslugiwany typ..."
        )}
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Przenieś pliki lub kliknij tutaj...</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

async function myCustomFileGetter(event) {
  const files = [];
  const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;

  for (var i = 0; i < fileList.length; i++) {
    const file = fileList.item(i);
    
    Object.defineProperty(file, 'myProp', {
      value: true
    });

    files.push(file);
  }

  return files;
}


export default DnD;