import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import swal from "sweetalert";
import NoAuth from '../components/noAuth'
import config from "../config.json";


function RequestPage({ token }) {
  const history = useHistory();

  const [groupOne, setGroupOne] = useState(0);
  const [groupTwo, setGroupTwo] = useState(0);
  const [groupThree, setGroupThree] = useState(0);
  const [groupFour, setGroupFour] = useState(0);
  const [groupFive, setGroupFive] = useState(0);
  const [groupSix, setGroupSix] = useState(0);
  const [groupSeven, setGroupSeven] = useState(0);
  const [groupNine, setGroupNine] = useState(0);
  const [groupTen, setGroupTen] = useState(0);
  const [groupEleven, setGroupEleven] = useState(0);
  const [groupTwelve, setGroupTwelve] = useState(0);
  const [groupThirteen, setGroupThirteen] = useState(0);  
  const [leftDollar, setLeftDollar] = useState(config.MAX_INVEST);  


  const fetchDefault = async () => {
    await axios.get("/api/personal/donation", {
      headers: {Authorization: 'Bearer ' + token}
    })
    .then((res) => {
      setGroupOne(parseInt(res.data.record['group_one']))
      setGroupTwo(parseInt(res.data.record['group_two']))
      setGroupThree(parseInt(res.data.record['group_three']))
      setGroupFour(parseInt(res.data.record['group_four']))
      setGroupFive(parseInt(res.data.record['group_five']))
      setGroupSix(parseInt(res.data.record['group_six']))
      setGroupSeven(parseInt(res.data.record['group_seven']))
      setGroupNine(parseInt(res.data.record['group_nine']))
      setGroupTen(parseInt(res.data.record['group_ten']))
      setGroupEleven(parseInt(res.data.record['group_eleven']))
      setGroupTwelve(parseInt(res.data.record['group_twelve']))
      setGroupThirteen(parseInt(res.data.record['group_thirteen']))
      var left = config.MAX_INVEST;
      left -= parseInt(res.data.record['group_one']);
      left -= parseInt(res.data.record['group_two'])
      left -= parseInt(res.data.record['group_three'])
      left -= parseInt(res.data.record['group_four'])
      left -= parseInt(res.data.record['group_five'])
      left -= parseInt(res.data.record['group_six'])
      left -= parseInt(res.data.record['group_seven'])
      left -= parseInt(res.data.record['group_nine'])
      left -= parseInt(res.data.record['group_ten'])
      left -= parseInt(res.data.record['group_eleven'])
      left -= parseInt(res.data.record['group_twelve'])
      left -= parseInt(res.data.record['group_thirteen'])
      setLeftDollar(left);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    fetchDefault();
  }, [])

  useEffect(() => {
    updateLeftMoney()
  }, [groupOne, groupTwo, groupThree, groupFour, groupFive, groupSix, groupSeven, groupNine, groupTen, groupEleven, groupTwelve, groupThirteen])

  const sendRequest = () => {
    const formData = new FormData();
    
    formData.append("group_one", groupOne);
    formData.append("group_two", groupTwo)
    formData.append("group_three", groupThree);
    formData.append("group_four", groupFour)
    formData.append("group_five", groupFive);
    formData.append("group_six", groupSix);
    formData.append("group_seven", groupSeven);
    formData.append("group_nine", groupNine);
    formData.append("group_ten", groupTen);
    formData.append("group_eleven", groupEleven);
    formData.append("group_twelve", groupTwelve);
    formData.append("group_thirteen", groupThirteen);
    
    axios.post("/api/submit/donation", formData, {
      headers: {Authorization: 'Bearer ' + token}
    })
    .then(res => {
      //pass
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

  const getSum = () => {
    var sum = 0;
    sum += parseInt(groupOne);
    //console.log("sum", sum)
    sum += parseInt(groupTwo);
    sum += parseInt(groupThree);
    sum += parseInt(groupFour);
    sum += parseInt(groupFive);
    sum += parseInt(groupSix);
    sum += parseInt(groupSeven);
    sum += parseInt(groupNine);
    sum += parseInt(groupTen);
    sum += parseInt(groupEleven);
    sum += parseInt(groupTwelve);
    sum += parseInt(groupThirteen);
    // console.log(sum)
    // console.log(groupOne)
    // console.log(groupTwo);
    // console.log(groupThree);
    // console.log(groupFour);
    // console.log(groupFive);
    // console.log(groupSix);
    // console.log(groupSeven);
    // console.log(groupNine);
    // console.log(groupTen);
    // console.log(groupEleven);
    // console.log(groupTwelve);
    // console.log(groupThirteen);
    return sum;
  }
  const getLeftMoney = () => {
    return config.MAX_INVEST - getSum();
  }

  const updateLeftMoney = () => {
    var dollar = getLeftMoney();
    setLeftDollar(dollar);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (getSum() > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Total investment over " + config.MAX_INVEST,
        icon: "error",
      });
      return
    }
    if (groupOne < 0 || groupOne > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }

    if (groupTwo < 0 || groupTwo > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }

    if (groupThree < 0 || groupThree > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }

    if (groupFour < 0 || groupFour > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }

    if (groupFive < 0 || groupFive > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }
    if (groupSix < 0 || groupSix > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }
    if (groupSeven < 0 || groupSeven > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }

    if (groupNine < 0 || groupNine > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }

    if (groupTen < 0 || groupTen > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }

    if (groupEleven < 0 || groupEleven > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }

    if (groupTwelve < 0 || groupTwelve > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }
    if (groupThirteen < 0 || groupThirteen > config.MAX_INVEST) {
      swal({
        title: "Error",
        text: "Please provide valid donation value",
        icon: "error",
      });
      return
    }
  
    if (sendRequest()) {
      history.push({
        pathname: "/dashboard",
      });
    }
    else {
      swal({
        title: "Success",
        text: "Submit Success!",
        icon: "success",
      });
    }
  }


  const handleGroupOneChange = (e) => {
    setGroupOne(e.target.value)
  }

  const handleGroupTwoChange = (e) => {
    setGroupTwo(e.target.value)
  }
  const handleGroupThreeChange = (e) => {
    setGroupThree(e.target.value)
  }
  
  const handleGroupFourChange = (e) => {
    setGroupFour(e.target.value)
  }

  const handleGroupFiveChange = (e) => {
    setGroupFive(e.target.value)
  }

  const handleGroupSixChange = (e) => {
    setGroupSix(e.target.value)
  }

  const handleGroupSevenChange = (e) => {
    setGroupSeven(e.target.value)
  }

  const handleGroupNineChange = (e) => {
    setGroupNine(e.target.value)
  }

  const handleGroupTenChange = (e) => {
    setGroupTen(e.target.value)
  }

  const handleGroupElevenChange = (e) => {
    setGroupEleven(e.target.value)
  }

  const handleGroupTwelveChange = (e) => {
    setGroupTwelve(e.target.value)
  }

  const handleGroupThirteenChange = (e) => {
    setGroupThirteen(e.target.value)
  }

  return (
    <div className="main-wrapper">
      <div className="main-inner">
        {!token && token!=="" &&token!== undefined? (
          <NoAuth />
        ):(
          <form>
            <h3>Investment!</h3>
            <h5>You are left with {leftDollar} dollars</h5>
            
            <h4>Group list</h4>
            
            <div className="form-group">
              <label htmlFor="formWebURLInput">Group one</label>
              <input type="number" className="form-control" id="formWebURLInput" placeholder="value" value={groupOne} onChange={handleGroupOneChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="formWebAccountInput">Group two</label>
              <input type="number" className="form-control" id="formWebAccountInput" placeholder="value" value={groupTwo} onChange={handleGroupTwoChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="formWebPasswordInput">Group three</label>
              <input type="number" className="form-control" id="formWebPasswordInput" placeholder="value" value={groupThree} onChange={handleGroupThreeChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="formWebPasswordInput">Group four</label>
              <input type="number" className="form-control" id="formWebPasswordInput" placeholder="value" value={groupFour} onChange={handleGroupFourChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="formWebPasswordInput">Group five</label>
              <input type="number" className="form-control" id="formWebPasswordInput" placeholder="value" value={groupFive} onChange={handleGroupFiveChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="formWebPasswordInput">Group six</label>
              <input type="number" className="form-control" id="formWebPasswordInput" placeholder="value" value={groupSix} onChange={handleGroupSixChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="formWebPasswordInput">Group seven</label>
              <input type="number" className="form-control" id="formWebPasswordInput" placeholder="value" value={groupSeven} onChange={handleGroupSevenChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="formWebPasswordInput">Group nine</label>
              <input type="number" className="form-control" id="formWebPasswordInput" placeholder="value" value={groupNine} onChange={handleGroupNineChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="formWebPasswordInput">Group ten</label>
              <input type="number" className="form-control" id="formWebPasswordInput" placeholder="value" value={groupTen} onChange={handleGroupTenChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="formWebPasswordInput">Group eleven</label>
              <input type="number" className="form-control" id="formWebPasswordInput" placeholder="value" value={groupEleven} onChange={handleGroupElevenChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="formWebPasswordInput">Group twelve</label>
              <input type="number" className="form-control" id="formWebPasswordInput" placeholder="value" value={groupTwelve} onChange={handleGroupTwelveChange}/>
            </div>

            <div className="form-group">
              <label htmlFor="formWebPasswordInput">Group thirteen</label>
              <input type="number" className="form-control" id="formWebPasswordInput" placeholder="value" value={groupThirteen} onChange={handleGroupThirteenChange}/>
            </div>
            <button type="button" className="btn btn-primary btn-block pantoneZOZl" onClick={onSubmit}>Submit</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default RequestPage