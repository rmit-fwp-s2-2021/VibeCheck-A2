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
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

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
        <h1 className="title">Vertical Bar Chart</h1>
      </div>
      <Bar data={getData()} options={options} />
    </>
  );
}
