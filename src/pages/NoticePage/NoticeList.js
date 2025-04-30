import React, { useState } from 'react';

const dummyData = [
  { id: 1, title: "2025년 소프트웨어학부 안내", author: "관리자", date: "2025-04-30", views: 123 },
  { id: 2, title: "AI 해커톤 안내", author: "관리자", date: "2025-04-25", views: 77 },
  // ... 원하는 만큼 추가
];

const NoticeList = () => {
  const [search, setSearch] = useState('');

  return (
    <div>
      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>조회</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td>{item.date}</td>
              <td>{item.views}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        &lt; <span>1</span> <span>2</span> <span>3</span> &gt;
      </div>

      <div className="search-area">
        <select>
          <option>제목</option>
          <option>작성자</option>
        </select>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>검색</button>
      </div>
    </div>
  );
};

export default NoticeList;
