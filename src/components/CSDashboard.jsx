import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import csData from '../data/csData';

// 컴포넌트 시작
const CSDashboard = () => {
  const [view, setView] = useState('monthly'); // 'monthly' 또는 'daily'
  const [selectedMonth, setSelectedMonth] = useState(null);
  
  // 월별 데이터 계산
  const calculateMonthlyData = (data) => {
    const monthlyData = {};
    
    data.forEach(item => {
      const date = new Date(item.날짜);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          총건수: 0,
          채널톡: 0,
          지라: 0,
          해지: 0,
          days: 0
        };
      }
      
      monthlyData[monthKey].총건수 += item.총건수;
      monthlyData[monthKey].채널톡 += item.채널톡;
      monthlyData[monthKey].지라 += item.지라;
      monthlyData[monthKey].해지 += item.해지;
      monthlyData[monthKey].days += 1;
    });
    
    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  };
  
  // 월별 데이터 계산
  const monthlyData = calculateMonthlyData(csData);
  
  // 선택된 월의 데이터 필터링
  const filteredDailyData = selectedMonth 
    ? csData.filter(item => item.날짜.startsWith(selectedMonth))
    : csData;
  
  // 월 선택 핸들러
  const handleMonthSelect = (month) => {
    if (selectedMonth === month) {
      setSelectedMonth(null); // 같은 월을 다시 클릭하면 선택 해제
    } else {
      setSelectedMonth(month);
    }
  };
  
  // 일간/월간 뷰 전환
  const toggleView = () => {
    setView(view === 'monthly' ? 'daily' : 'monthly');
    setSelectedMonth(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '90%', margin: '0 auto' , width : '100%'}}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>CS 데이터 분석 대시보드</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={toggleView}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#4a90e2', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {view === 'monthly' ? '일간 데이터 보기' : '월간 데이터 보기'}
        </button>
        
        {selectedMonth && (
          <button
            onClick={() => setSelectedMonth(null)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              marginLeft: '10px',
              cursor: 'pointer'
            }}
          >
            월 선택 취소
          </button>
        )}
      </div>
      
      {/* 차트 영역 */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px', 
        backgroundColor: 'white', 
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
	width : '100%'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>
          {view === 'monthly' 
            ? '월별 CS 접수 추이' 
            : selectedMonth 
              ? `${selectedMonth} 일별 CS 접수 현황` 
              : '일별 CS 접수 현황'}
        </h2>
        
        <div style={{ height: '800px', width : '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            {view === 'monthly' ? (
              <ComposedChart data={monthlyData} onClick={(data) => data && data.activeLabel && handleMonthSelect(data.activeLabel)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="총건수" name="전체" fill="#8884d8" />
                <Bar dataKey="채널톡" name="채널톡" fill="#82ca9d" />
                <Bar dataKey="지라" name="지라" fill="#ffc658" />
                <Line type="monotone" dataKey="해지" name="해지" stroke="#ff7300" strokeWidth={2} />
              </ComposedChart>
            ) : (
              <LineChart data={filteredDailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="날짜" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="총건수" name="전체" stroke="#8884d8" strokeWidth={2} />
                <Line type="monotone" dataKey="채널톡" name="채널톡" stroke="#82ca9d" />
                <Line type="monotone" dataKey="지라" name="지라" stroke="#ffc658" />
                <Line type="monotone" dataKey="해지" name="해지" stroke="#ff7300" />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* 테이블 영역 */}
      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px', 
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>
          {view === 'monthly' 
            ? '월별 상세 현황' 
            : selectedMonth 
              ? `${selectedMonth} 일별 상세 현황` 
              : '일별 상세 현황'}
        </h2>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
                  {view === 'monthly' ? '월' : '날짜'}
                </th>
                <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>총건수</th>
                <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>채널톡</th>
                <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>지라</th>
                <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>해지</th>
                {view === 'monthly' && (
                  <th style={{ padding: '10px', textAlign: 'right', borderBottom: '2px solid #ddd' }}>일평균</th>
                )}
              </tr>
            </thead>
            <tbody>
              {(view === 'monthly' ? monthlyData : filteredDailyData).map((row, index) => (
                <tr 
                  key={index} 
                  style={{ 
                    backgroundColor: row.해지 > (view === 'monthly' ? 5 : 2) ? '#ffebee' : 'transparent',
                    cursor: view === 'monthly' ? 'pointer' : 'default'
                  }}
                  onClick={() => view === 'monthly' && handleMonthSelect(row.month)}
                >
                  <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {view === 'monthly' ? row.month : row.날짜}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                    {row.총건수}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                    {row.채널톡}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                    {row.지라}
                  </td>
                  <td style={{ 
                    padding: '10px', 
                    textAlign: 'right', 
                    borderBottom: '1px solid #ddd',
                    fontWeight: row.해지 > 0 ? 'bold' : 'normal',
                    color: row.해지 > (view === 'monthly' ? 5 : 2) ? '#d32f2f' : 'inherit'
                  }}>
                    {row.해지}
                  </td>
                  {view === 'monthly' && (
                    <td style={{ padding: '10px', textAlign: 'right', borderBottom: '1px solid #ddd' }}>
                      {(row.총건수 / row.days).toFixed(1)}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CSDashboard;