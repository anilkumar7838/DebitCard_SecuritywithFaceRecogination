import "./LoginUi.css";
import react, { useRef, useState,useContext ,useEffect} from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoginContext from "./LoginContext";
import { useNavigate } from "react-router-dom";
const instance = axios.create({
  baseURL: process.env.REACT_APP_LOGIN_BACKEND,
});

const Transition = react.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const poses = ["left","right"]
const LoginUi = () => {
  let navigate = useNavigate();
  const loginDetails = useContext(LoginContext);
  const [verificationMode, setVerificationMode] = useState(null);
  const [open, setOpen] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [frameInterval, setFrameInterval] = useState(null);
  const [userDetails, setUserDetails] = useState({ "username": "", "pin": "", "faceData": "", "width": "", "height": "","faceData2":"","pose":"" });
  const [alertDetails, setAlertDetails] = useState({ "message": "", "severity": "", "open": false });
  const canvasRef = useRef();
  const [poseMessage,setPoseMessage] = useState("");
  const handleClickOpen = () => {
    setVerificationMode("face");
    const pose = poses[Math.floor(Math.random() * poses.length)];
    setPoseMessage(pose);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let w = canvas.width;
      let h = canvas.height;
      const video = document.createElement('video');
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, w, h);
      window.navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
        video.srcObject = stream;
        setLocalStream(stream);
        video.play();
      })
      let it = setInterval(() => {
        ctx.drawImage(video, 0, 0, w, h);
      }, 1000 / 30);
      setFrameInterval(it);
    }
    setOpen(true);

  };

  const handleClose = () => {
    setVerificationMode(null);
    localStream.getVideoTracks()[0].stop();
    clearInterval(frameInterval);
    setOpen(false);
  };

  const handleChange = (e) => {
    setUserDetails((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    });
  }

  const handleSubmit = (details) => {
    if (!details.username || details.username.length != 16) {
      setAlertDetails({ "message": "Please Enter a valid username", "severity": "warning", "open": true });
      setTimeout(() => {
      }, 10000);
      return;
    }
    let loginUrl = verificationMode == "face" ? `/user/login/face` : `/user/login/pin`;
    instance.post(loginUrl, details).then((res) => {
      if (res.data.success && res.data.user) {
        setAlertDetails({ "message": res.data.message, "severity": "success", "open": true });
        loginDetails.login(res.data.user);
        setTimeout(() => {
          setAlertDetails({ "message": "", "severity": "", "open": false });
          navigate("/transaction",{replace:true});
        }, 2000);
      } else {
        setAlertDetails({ "message": res.data.message, "severity": "error", "open": true });
        setTimeout(() => {
          setAlertDetails({ "message": "", "severity": "", "open": false });
        }, 10000);
      }

    })
    .catch((err) => {
      setAlertDetails({ "message": err.message, "severity": "error", "open": true });
      setTimeout(() => {
        setAlertDetails({ "message": "", "severity": "", "open": false });
      }, 10000);
    });
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(userDetails);
  }
  
  const handleFaceLogin = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let imageData = Array.from(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
      const faceData = imageData.filter((val, i) => {
        return i % 4 != 3;
      })
      let newDetails = { ...userDetails, "faceData": faceData, 'width': canvas.width, 'height': canvas.height,"pose":poseMessage };
      setTimeout(()=>{
        let imageData2 = Array.from(ctx.getImageData(0, 0, canvas.width, canvas.height).data);
        const faceData2 = imageData2.filter((val, i) => {
          return i % 4 != 3;
        });
        newDetails["faceData2"] = faceData2
        setUserDetails(newDetails);
        handleSubmit(newDetails);
        handleClose();
      },800);
    }
  }
  useEffect(()=>{
    if(loginDetails.user){
      navigate("/transaction",{replace:true});
    }
  },[])
  return (
    <div className="login-container">
      <Stack sx={{ width: '100%',zIndex:"1000",position:"absolute",top:"0px" }} spacing={2}>
        {alertDetails.open && <Alert severity={alertDetails.severity}>{alertDetails.message}</Alert>}
      </Stack>
      <div className="loginui">
        <h1>Login</h1>
        <form method="post" onSubmit={handleFormSubmit}>
          <div className="txt_field">
            <input type="text" required value={userDetails.username} name="username" onChange={handleChange} />
            <span></span>
            <label>Card Number</label>
          </div>
          {
            verificationMode === "face" ? null :
              <input type="button" value="Face Verify" onClick={() => { handleClickOpen() }} />
          }
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{`Turn face ${poseMessage} slowly`}</DialogTitle>
            <DialogContent style={{ display: "flex", justifyContent: "center" }}>
              <canvas ref={canvasRef} width={300} height={300}></canvas>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleFaceLogin}>Verify</Button>
            </DialogActions>
          </Dialog>
          <h1 style={{ border: "none" }}>OR</h1>
          {
            verificationMode === "pin" ?
              <>
                <div className="txt_field">
                  <input type="password" required name="pin" value={userDetails.pin} onChange={handleChange} />
                  <span></span>
                  <label>Pin</label>
                </div>
                <input type="Submit" value="Submit" />
              </> :
              <input type="button" value="PIN Verify" onClick={() => { setVerificationMode("pin") }} />
          }
        </form>
      </div>
    </div>
  );
};

export default LoginUi;
