import React, { Component } from 'react';
import Chart from 'react-apexcharts';
class ChartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchedData: [],
      options: {
        chart: {
          type: 'candlestick',
          height: 350,
        },
        title: {
          text: 'CandleStick Chart',
          align: 'left',
        },
        xaxis: {
          type: 'datetime',
        },
        yaxis: {
          tooltip: {
            enabled: true,
          },
        },
      },
    };
  }
  componentDidMount() {
    fetch(
      'https://api.crosstower.com/api/3/public/candles/BTCUSD?from=2021-07-31T14:00:00.000Z&till=2021-08-03T14:30:00.000Z&limit=1000'
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          fetchedData: res,
        });
      });
  }
  render() {
    var newSeries = [
      {
        data: this.state.fetchedData.map((value) => {
          return {
            x: new Date(value.timestamp).getTime(),
            y: [
              parseFloat(value.open),
              parseFloat(value.max),
              parseFloat(value.min),
              parseFloat(value.close),
            ],
          };
        }),
      },
    ];
    return (
      <div className='mixed-chart'>
        <Chart
          options={this.state.options}
          series={newSeries}
          type='candlestick'
          height={350}
        />
      </div>
    );
  }
}

export default ChartComponent;
