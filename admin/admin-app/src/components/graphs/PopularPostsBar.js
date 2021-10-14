// Some code was referenced from docs: https://github.com/reactchartjs/react-chartjs-2/blob/7070c25645b769e40729b7b16f060e46757064e4/example/src/charts/VerticalBar.js
import React from "react";
import { Bar } from "react-chartjs-2";

export default function PopularPostsBar(props) {

  const getData = () => {
    const posts = props.posts.filter((f) => f.parent_post_id === null);
    const reactions = props.post_reactions;

    const labels = posts.map((x) => x.post_id);
    const n_data = [];
    /**
     * Algo
     * All posts have a score of 0 at beginning.
     * Each like increases point by 1. Each reply increases point by 2.
     * If post has more dislikes than likes decrease point by 2.
     */

    for (const post_id of labels) {
      let score = 0;
      const post_rxns = reactions.filter((f) => f.post_id === post_id);

      const n_likes = post_rxns.filter((f) => f.is_liked === true).length;
      const n_dislikes = post_rxns.filter((f) => f.is_liked === false).length;
      const n_replies = props.posts.filter(
        (f) => f.parent_post_id === post_id
      ).length;
      score = n_likes + n_replies * 2;
      if (n_dislikes > n_likes) {
        score -= 15;
        score = score < 0 ? 0 : score;
      }
      n_data.push(score);
    }

    const red_bg_color = "rgba(255, 99, 132, 0.2)";
    const blue_bg_color = "rgba(54, 162, 235, 0.2)";
    const bg_colors = [];
    for (let i = 0; i < posts.length; i++) {
      if (i % 2 === 0) {
        bg_colors.push(red_bg_color);
      } else {
        bg_colors.push(blue_bg_color);
      }
    }

    let data = {
      labels: labels,
      datasets: [
        {
          label: "# Post scores",
          data: n_data,
          backgroundColor: bg_colors,
        },
      ],
    };

    return data;
  };

    const options = {
      indexAxis: "y",
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: "right",
        },
        title: {
          display: false,
          text: "Chart.js Horizontal Bar Chart",
        },
      },
    };

  return (
    <>
      <div className="header">
        <h2 className="title">Popular posts of all time.</h2>
      </div>
      <Bar data={getData} options={options} />
    </>
  );
}
