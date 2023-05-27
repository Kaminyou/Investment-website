import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import swal from "sweetalert";
import isEmpty from 'validator/lib/isEmpty'

export default function UserList({userlist, token}) {
  const [open, setOpen] = useState(false);

  const [targetAccount, setTargetAccount] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleClickOpen = (account) => {
    setTargetAccount(account);
    setOpen(true);
  };

  const handleClose = () => {
    setTargetAccount("");
    setOpen(false);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleChangePassword = () => {
    if (isEmpty(targetAccount) || isEmpty(newPassword)) {
      swal({
        title: "Error",
        text: "Please provide password",
        icon: "error",
      });
      return
    }
    const formData = new FormData();
    
    formData.append("account", targetAccount);
    formData.append("password", newPassword)
    
    axios.post("/api/personal/changepwd", formData, {
      headers: {Authorization: 'Bearer ' + token}
    })
    .then(res => {
      setTargetAccount("");
      setNewPassword("");
      setOpen(false);
      swal({
        title: "Success",
        text: "Change successfully!",
        icon: "success",
      });
    })
    .catch(
      err => {
        console.warn(err);
        swal({
          title: "Error",
          text: "Server error",
          icon: "error",
        });
      }
    );
  }

  return (
    <div>
      <h4>User list</h4>
      <table>
        <tbody>
          {userlist.map((user) => {
              return (
                <tr>
                  <td width='250'><b>ID {user.account}</b></td>
                  <td width='250'><b>Group {user.group}</b></td>
                  <td>
                  <Button variant="outlined" onClick={() => handleClickOpen(user.account)}>
                    Change password
                  </Button>
                  </td>
                </tr>
              )
            }
          )}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change the password of <b>{targetAccount}</b>
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNewPasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChangePassword}>Change</Button>
        </DialogActions>
      </Dialog>
      <br></br>
    </div>
  );
}