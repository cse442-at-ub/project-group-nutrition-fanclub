import React from 'react';
import './Star.scss';


class Star extends React.Component {
  renderScore() {
    let wm_poi_score = this.props.score || '';
    let score = wm_poi_score.toString();
    let scoreArray = score.split('.');

    let fullstar = parseInt(scoreArray[0]);

    let halfstar = parseInt(scoreArray[1]) >= 5 ? 1 : 0;

    let nullstar = 5 - fullstar - halfstar;
    let starjsx = [];


    for (let i = 0; i < fullstar; i++) {
      starjsx.push(<div key={i + 'full'} className="star fullstar"></div>)
    }

    if (halfstar) {
      for (let j = 0; j < halfstar; j++) {
        starjsx.push(<div key={j + 'half'} className="star halfstar"></div>)
      }
    }

    if (nullstar) {
      for (let k = 0; k < nullstar; k++) {
        starjsx.push(<div key={k + 'null'} className="star nullstar"></div>)
      }
    }
    return starjsx;
  }
  render() {
    return <div className="star-score">{this.renderScore()}</div>;
  }
}

export default Star;
