import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import NoAuth from '../components/noAuth'
import InvestmentBar from '../components/SimpleBar'

function DashBoard({ token }) {
  const history = useHistory();
  const MINUTE_MS = 2000; // 2 sec

  const [apiData, setApiData] = useState(null);
  
  const getDashBoard = async () => {
    await axios
      .get("/api/dashboard/donation", {
        headers: {Authorization: 'Bearer ' + token}
      })
      .then((res) => {
        console.log(res)
        setApiData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getDashBoard();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
        getDashBoard();
      }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="main-wrapper">
      <div className="main-inner">
        {!token && token!=="" &&token!== undefined? (
          <NoAuth />
        ):(
          <>
            <InvestmentBar data={apiData}></InvestmentBar>
          </>
        )}
      </div>
    </div>
  )
}

export default DashBoard