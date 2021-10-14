// Some code was referenced from docs: https://github.com/reactchartjs/react-chartjs-2/blob/7070c25645b769e40729b7b16f060e46757064e4/example/src/charts/VerticalBar.js
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

export default function UserFollowedBar(props) {

    const getData = () => {
        const users = props.users;
        const labels = users.map(x => x.username);
        //const n_data = users.map(x => x.userFollows.length)
        // get all recepients of each user and check how many of those recepients are curr user.
        const n_data = []
        for(const username of labels){
            let count = 0
            for(const user of users){
                if (user.userFollows.length != 0){
                    const recepients = user.userFollows.map(x => x.user_recepient)
                    if (recepients.includes(username)){
                        count++;
                    }
                    n_data.push(count);
                }

            }
        }
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
                    label: "# of followers",
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
        <h2 className="title">Number of followers (y-axis) against users (x-axis)</h2>
      </div>
      <Bar data={getData()} options={options} />
    </>
  );
}
