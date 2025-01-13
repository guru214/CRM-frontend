import React from 'react';
import { Table, Button } from 'react-bootstrap';

const TradingSignals = () => {
  const signals = [
    { name: 'SM', rank: 6, growth: -1.44, weeks: 0, followers: 7, drawdown: 0, fund: 28989.92, riskLevel: 1, followed: true },
    { name: 'MuruganFX', rank: 4, growth: -58.26, weeks: 0, followers: 0, drawdown: 0, fund: 0.00, riskLevel: 1, followed: false },
    { name: 'Check', rank: 15, growth: 5279.68, weeks: 1, followers: 18, drawdown: 0, fund: 463269.62, riskLevel: 1, followed: false },
    { name: 'Teja Test', rank: 10, growth: -227.71, weeks: 2, followers: 3, drawdown: 0, fund: 0.00, riskLevel: 1, followed: false },
    { name: 'SHANGRI-LA', rank: 3, growth: 963.66, weeks: 0, followers: 74, drawdown: 0, fund: 181307.44, riskLevel: 1, followed: false },
    { name: 'AT76', rank: 3, growth: -1712.36, weeks: 0, followers: 3, drawdown: 0, fund: 2019766.28, riskLevel: 1, followed: false },
    { name: 'Mohammed Sharfuddin Khan', rank: 3, growth: 14.98, weeks: 0, followers: 2, drawdown: 0, fund: 0.48, riskLevel: 1, followed: false },
    { name: 'Test Master1', rank: 5, growth: -51.00, weeks: 18, followers: 1, drawdown: 0, fund: 4940.01, riskLevel: 1, followed: false },
    { name: 'Test Master3', rank: 5, growth: -68.00, weeks: 0, followers: 1, drawdown: 0, fund: 4878.00, riskLevel: 1, followed: false },
    { name: 'Mr.Batt', rank: 3, growth: 622.50, weeks: 0, followers: 0, drawdown: 0, fund: 0.00, riskLevel: 1, followed: false },
    { name: 'Siva spandana', rank: 3, growth: -61.78, weeks: 0, followers: 3, drawdown: 0, fund: 81.05, riskLevel: 1, followed: false },
    { name: 'KK', rank: 3, growth: 1438.91, weeks: 23, followers: 1, drawdown: 0, fund: 5268.71, riskLevel: 1, followed: false },
  ];

  return (
    <div>
      <h2>TRADING SIGNALS</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>NAME</th>
            <th>RANK</th>
            <th>GROWTH</th>
            <th>WEEKS</th>
            <th>FOLLOWERS</th>
            <th>DRAWDOWN</th>
            <th>FUND</th>
            <th>RISK LEVEL</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {signals.map((signal, index) => (
            <tr key={index}>
              <td>{signal.name}</td>
              <td>{signal.rank}</td>
              <td>{signal.growth}</td>
              <td>{signal.weeks}</td>
              <td>{signal.followers}</td>
              <td>{signal.drawdown}</td>
              <td>{signal.fund}</td>
              <td>{signal.riskLevel}</td>
              <td>
                <Button variant={signal.followed ? 'danger' : 'primary'}>
                  {signal.followed ? 'UnFollow' : 'Follow'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TradingSignals;
