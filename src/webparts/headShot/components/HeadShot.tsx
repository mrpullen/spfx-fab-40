import * as React from 'react';
import styles from './HeadShot.module.scss';
import type { IHeadShotProps } from './IHeadShotProps';
import Webcam from "react-webcam";
import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-converter";
import "@tensorflow/tfjs-backend-webgl";
import { mergeStyles } from '@fluentui/react';
import { getSP } from '../../../pnpjs-config';
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/site-users";
import { getRandomString } from '@pnp/common';
import html2canvas, { Options } from 'html2canvas';
import { IFileInfo } from '@pnp/sp/files';


function HeadShot(props: IHeadShotProps): JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const imagePreviewCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const webcamRef = React.useRef<Webcam>(null);
  const [bodypixnet, setBodypixnet] = React.useState<bodyPix.BodyPix>();
  const [prevClassName, setPrevClassName] = React.useState<string>();

  const [datacol, setdatacol] = React.useState<Blob | null>();


  const defaultBackground = props.backgrounds.find((background) => background.default);

  const capture = async (): Promise<void> => {
    if (webcamRef && webcamRef.current && canvasRef && canvasRef.current && imagePreviewCanvasRef && imagePreviewCanvasRef.current) {
      const imgPreview = imagePreviewCanvasRef.current;
      const previewContext = imgPreview.getContext("2d");
      const videoContainer = document.getElementsByClassName(styles.videoContainer)[0] as HTMLElement;
      
      const options: Partial<Options> = {
        width: 400,
        height: 400
      };
      
      const canvasElement = await html2canvas(videoContainer, options );
      //const webcam = webcamRef.current.video as HTMLVideoElement;

      // eslint-disable-next-line require-atomic-updates
      imgPreview.width = 400; //webcam.videoWidth;
      // eslint-disable-next-line require-atomic-updates
      imgPreview.height = 400; //webcam.videoHeight;
      canvasElement.toBlob((blob) => {
        if (blob && previewContext) {
          const img = new Image(400, 400);

          img.onload = function () {
            imgPreview.style.backgroundImage = `url(${img.src})`;
            imgPreview.style.backgroundSize = "cover";
            imgPreview.style.width = "400px";
            imgPreview.style.height = "400px";
            //previewContext.drawImage(img, width, height);
          }

          img.src = URL.createObjectURL(blob);
          setdatacol(blob);
        }
      });


      /*
              
              const webcam = webcamRef.current.video as HTMLVideoElement;
              const canvas = canvasRef.current;
              webcam.width = canvas.width = webcam.videoWidth;
              webcam.height = canvas.height = webcam.videoHeight;
             
             // const context = canvas.getContext("2d");
      
              const tempCanvas = document.createElement("canvas");
              tempCanvas.width = webcam.videoWidth;
              tempCanvas.height = webcam.videoHeight;
              tempCanvas.style.backgroundImage = canvas.style.backgroundImage;
              tempCanvas.style.backgroundSize = "cover";
      
              const tempCtx = canvas.getContext("2d");
              
              //context.canvas.toBlob((blob: Blob) => {  setdatacol(blob); });
              
              if (bodypixnet && tempCtx) {
                // draw mask on tempCanvas
                const segmentation = await bodypixnet.segmentPerson(webcam);
                const mask = bodyPix.toMask(segmentation);
                tempCtx.putImageData(mask, 0, 0);
                // draw original image
              
                tempCtx.drawImage(webcam, 0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.save();
                tempCtx.globalCompositeOperation = "destination-in";
                
                // tempCtx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height);
                tempCtx.restore();
      
                tempCtx..toBlob((blob: Blob) => {
                  setdatacol(blob);
                })
              }
          */
    }


  };

  const remove = (): void => {
    setdatacol(null);

    if (webcamRef && webcamRef.current && imagePreviewCanvasRef && imagePreviewCanvasRef.current) {
      const imgPreview = imagePreviewCanvasRef.current;
      imgPreview.style.backgroundImage = "";

      const webcam = webcamRef.current.video as HTMLVideoElement;
      const width = webcam.videoWidth;
      const height = webcam.videoHeight;

      const previewContext = imgPreview.getContext("2d");
      if (previewContext) {
        previewContext.clearRect(0, 0, width, height);
        previewContext.save();
      }

    }


  };


  const save = async (): Promise<void> => {
    const sp = getSP();
    if (datacol && sp) {
      const user = await sp.web.currentUser();
      let fileName: string = getRandomString(10);
      if (user && user.UserPrincipalName) {
        fileName = `${user.UserPrincipalName.replace("@", "_").replace(".", "_")}.png`;
      }

      const fileInfo: IFileInfo = await sp.web.lists.getById(props.listName).rootFolder.files.addUsingPath(fileName, datacol, { Overwrite: true });
      console.log(fileInfo);
    }
    return;
  };


  const drawimage = async (
    webcam: HTMLVideoElement,
    context: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ): Promise<void> => {
    // create tempCanvas

    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = webcam.videoWidth;
    tempCanvas.height = webcam.videoHeight;
    const tempCtx = tempCanvas.getContext("2d");
    // eslint-disable-next-line no-void
    void (async function drawMask() {

      if (bodypixnet && tempCtx) {
        // draw mask on tempCanvas

        const segmentation = await bodypixnet.segmentPerson(webcam);
        const mask = bodyPix.toMask(segmentation);
        tempCtx.putImageData(mask, 0, 0);

        // draw original image
        context.drawImage(webcam, 0, 0, canvas.width, canvas.height);
        context.save();
        // use destination-out, then only masked area will be removed
        context.globalCompositeOperation = "destination-out";
        context.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        context.restore();

      }

      setTimeout(() => { requestAnimationFrame(drawMask); }, 33.33);

    })();
  };

  const clickHandler = async (background: { title: string; link: string; caption: string, default: boolean }): Promise<void> => {

    if (webcamRef && webcamRef.current && canvasRef && canvasRef.current) {
      const webcam = webcamRef.current.video as HTMLVideoElement;
      const canvas = canvasRef.current;
      webcam.width = canvas.width = webcam.videoWidth;
      webcam.height = canvas.height = webcam.videoHeight;

      const context = canvas.getContext("2d");
      if (context) {
        const className = mergeStyles({
          backgroundImage: background.link,
          backgroundSize: "cover"
        });

        context.clearRect(0, 0, canvas.width, canvas.height);
        if (prevClassName) {
          canvas.classList.remove(prevClassName);
          setPrevClassName(className);

        } else {

          //canvas.style.backgroundImage = "";
          setPrevClassName(className);
        }

        canvas.style.backgroundImage = `url(${background.link})`;
        canvas.style.backgroundSize = 'cover';
        canvas.classList.add(className);

        if (bodypixnet) {
          await drawimage(webcam, context, canvas);
        }
      }
    }
  };


  React.useEffect(() => {

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    bodyPix.load().then(async (net: bodyPix.BodyPix) => {
      setBodypixnet(net);
    });

  }, []);





  React.useEffect(() => {
   
      if (defaultBackground) {
        const ms: number = 500;
        const awaitReady = (): void => {
          if (webcamRef && webcamRef.current && canvasRef && canvasRef.current && bodypixnet) {
            clickHandler(defaultBackground).then(() => {
              console.log("Default Loaded");
            }).catch((err) => {
              console.log(err);
              setTimeout(awaitReady, ms);

            })
          }
          else {
            setTimeout(awaitReady, ms);
          }
        };

        setTimeout(awaitReady, ms);
      
    }
  }, [webcamRef, webcamRef.current, canvasRef, canvasRef.current, bodypixnet]);


  return (
    <div className={styles.container}>

      <div className={styles.main}>

        <div className={styles.middle}>
          <div className={styles.left}>
            <h3>WebCam</h3>
            <div id="videoContainer" className={styles.videoContainer}>
              <Webcam audio={false} ref={webcamRef} className={styles.video} screenshotFormat="image/png" width={400} height={400} />
              <canvas ref={canvasRef} className={styles.canvas} />
            </div>
            <div className={styles.buttons}>
              <button onClick={() => capture()} key="capture">Capture</button>
            </div>
          </div>

          <div className={styles.right}>
            <h3>Preview</h3>
            <div id="videoContainer" className={styles.videoContainer}>
              <canvas ref={imagePreviewCanvasRef} className={styles.canvasCapture} />
            </div>
            <div className={styles.buttons}>
              <button onClick={() => remove()} key="remove">Clear</button>
              <button onClick={() => save()} key="save">Save</button>
            </div>
          </div>

        </div>

        <div className={styles.bottom}>
          <h4 className={styles.title}>Select Backgrounds</h4>
          <div className={styles.backgroundButtons}>
            {props.backgrounds.map(function (background, i) {
              return <button className={styles.bgbutton} style={{
                backgroundImage: `url('${background.link}')`,
                backgroundSize: 'cover'
              }} onLoad={async () => { if (defaultBackground && background.link === defaultBackground.link) { await clickHandler(background); } }} onClick={() => clickHandler(background)} key={i}>{background.title}</button>
            })}
          </div>

        </div>
      </div>
    </div>
  );

}



export default HeadShot;