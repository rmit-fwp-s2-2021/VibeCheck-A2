// Some code was referenced from docs: https://github.com/reactchartjs/react-chartjs-2/blob/7070c25645b769e40729b7b16f060e46757064e4/example/src/charts/VerticalBar.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function UserFollowingBar(props) {

    const getData = () => {
        const users = props.users;
        const labels = users.map(x => x.username);
        const n_data = users.map(x => x.userFollows.length)
        const red_bg_color = "rgba(255, 99, 132, 0.2)"
        const blue_bg_color = "rgba(54, 162, 235, 0.2)"
        const bg_colors = []
        for(let i = 0; i < users.length; i++){
            if(i % 2 === 0){
                bg_colors.push(red_bg_color);
            }else{
                bg_colors.push(blue_bg_color);
            }
        }

        const data = {
            labels: labels,
            datasets: [
                {
                    label: "# of followings",
                    data: n_data,
                    backgroundColor: bg_colors,
                    borderWidth: 1,
                }
            ],
        };

        return data
    }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="header">
        <h2 className="title">Number of followings (y-axis) against users (x-axis)</h2>
      </div>
      <Bar data={getData()} options={options} />
    </>
  );
}
