import Head from "next/head";
import React, { useEffect, useState } from "react";
import Requests from "./helpers/Requests";

const Dashboard = () => {
  return (
    <>
      <Head>
        <title>Admin Area</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div id="admin" className="w-full min-h-screen">
        <div className="flex justify-center py-2 bg-gray-400">
          <h4>Contact Requests</h4>
        </div>
        <div className="container">
          <Requests />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
