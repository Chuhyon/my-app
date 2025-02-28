import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';

// 샘플 데이터
const sampleData = [
  { date: '2024-01-01', total: 45, channeltalk: 30, jira: 15, cancellation: 5 },
  { date: '2024-01-02', total: 38, channeltalk: 25, jira: 13, cancellation: 3 },
  { date: '2024-01-03', total: 52, channeltalk: 35, jira: 17, cancellation: 7 },
  { date: '2024-01-04', total: 41, channeltalk: 28, jira: 13, cancellation: 2 },
  { date: '2024-01-05', total: 49, channeltalk: 32, jira: 17, cancellation: 4 },
];

// 월별 데이터
const monthlyData = [
  { month: '2024-01', total: 225, channeltalk: 150, jira: 75, cancellation: 21 },
  { month: '2024-02', total: 198, channeltalk: 120, jira: 78, cancellation: 18 },
  { month: '2024-03', total: 210, channeltalk: 135, jira: 75, cancellation: 15 },
];

function App() {
  return (
    <div style={{ padding: '16px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>CS 데이터 분석</h1>
      
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>월별 CS 접수 추이</h2>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', backgroundColor: 'white', height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" name="전체" fill="#8884d8" />
              <Bar dataKey="channeltalk" name="채널톡" fill="#82ca9d" />
              <Bar dataKey="jira" name="지라" fill="#ffc658" />
              <Line type="monotone" dataKey="cancellation" name="해지" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>일별 상세 현황</h2>
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', backgroundColor: 'white', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>날짜</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>총건수</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>채널톡</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>지라</th>
                <th style={{ padding: '8px', textAlign: 'right' }}>해지</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map((row, index) => (
                <tr 
                  key={index} 
                  style={{ 
                    borderBottom: '1px solid #ddd',
                    backgroundColor: row.cancellation > 5 ? '#fee2e2' : 'transparent'
                  }}
                >
                  <td style={{ padding: '8px' }}>{row.date}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>{row.total}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>{row.channeltalk}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>{row.jira}</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: '500' }}>{row.cancellation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
