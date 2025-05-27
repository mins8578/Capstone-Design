# 🎓 Hallym Software Graduation Self-Check Web App

한림대학교 정보과학대학 소프트웨어학부 학생들을 위한  
졸업 자가진단 및 정보 커뮤니티 플랫폼입니다.

---

## 👨‍👩‍👧‍👦 팀 정보

- **팀명**: K2C1  
- **팀장**: 최승혁 (콘텐츠IT 20)  
- **팀원**: 김민석 (빅데이터 20), 김명찬 (빅데이터 17)  
- **지도교수**: 신미영 교수님

---

## 📌 프로젝트 개요

> 기존 학과 홈페이지의 정보 접근성과 커뮤니케이션 한계를 보완하여,  
> 졸업요건·이수과목·학년별 커리큘럼 정보를 손쉽게 조회할 수 있는 졸업 자가진단 기능과,  
> 취업정보 게시판, 공지사항 연동, 학생 간 소통을 위한 커뮤니티 기능을 추가 구현했습니다.  
> 이를 통해 신입생·전과생·편입생도 학사정보에 쉽게 접근하고, 재학생 간 유기적인 소통이 가능한 환경을 제공합니다.

---

## ⚙️ 핵심 기능

- **🎓 졸업 자가진단**  
  필수 과목 이수 여부, 전공별 커리큘럼 안내, 학년별 추천 교과목

- **📢 학과 공지사항 연동**  
  학과 홈페이지 공지를 실시간 연동

- **💬 선후배 커뮤니티 게시판**  
  자유로운 질의응답 및 경험 공유 공간



---

## 🧑‍💻 주요 기술 스택

### 🖥️ Frontend
- React
- HTML / CSS / JavaScript
- Figma (와이어프레임 설계)

### 🧠 Backend
- Spring Boot (Java)
- Spring Data JPA
- Embedded Tomcat

### 🗄️ Database
- MySQL
- AWS RDS
- ERD 기반 설계

### 🌐 인프라 / 배포
- AWS EC2 (서버 배포)
- Nginx (리버스 프록시 & 정적 리소스 서빙)

### 🧰 기타 도구
- GitHub (협업 및 버전 관리)
- Notion (프로젝트 진행 일지)
- VS Code / IntelliJ (개발 환경)

---

## 프로젝트 구조도
![캡스톤 디자인_수정본](https://github.com/user-attachments/assets/d13f0fbb-222d-4f4d-8ba6-b4c965b55632)

---

### ERD
![image](https://github.com/user-attachments/assets/5a7ae3d4-05db-40f0-9717-511959af14c8)

---

### 🎉 메인화면

<p align="center">
  <img src="https://github.com/user-attachments/assets/ccafdba9-b69c-4873-95c9-85418b0e927b" width="90%" />
</p>

- 사용자는 홈페이지 메인 화면에서 프로젝트 전반의 정보를 확인할 수 있다.

---

### 🧑‍💻 로그인

<p align="center">
  <img src="https://github.com/user-attachments/assets/1fe8d737-c4b2-48eb-923b-45f750b506a3" width="90%" />
</p>

- 사용자는 학교 이메일을 통해 본인 인증 후 회원가입을 진행한다.  
- 가입 완료 후 로그인하여 서비스를 이용할 수 있다.

---

### 📘 졸업 자가진단 페이지

<p align="center">
  <img src="https://github.com/user-attachments/assets/b247929d-45a5-48d6-b136-6027ceda93ef" width="90%" />
</p>

- "현재 이수 과목 등록/수정" 버튼을 눌러 이수한 과목을 체크한 뒤 저장할 수 있다.  
- 저장된 과목 정보를 바탕으로 졸업 자가진단 결과를 확인할 수 있다.

<p align="center">
  <img src="https://github.com/user-attachments/assets/0bfa3662-6796-495f-9c1b-3f2ebc757f28" width="90%" />
</p>

- 우측 트랙 배너를 클릭하면 전공별 트랙 및 학년별 추천 과목을 확인할 수 있다.

---

### 🗣️ 커뮤니티 페이지

<p align="center">
  <img src="https://github.com/user-attachments/assets/4d7f0224-eedd-4274-b52e-ecf2403c13da" width="45%" />
  <img src="https://github.com/user-attachments/assets/665b7f34-f374-445c-b52b-b2e2416d7d27" width="45%" />
</p>

- 사용자는 글쓰기 버튼을 눌러 게시글을 작성하고 등록할 수 있다.

<p align="center">
  <img src="https://github.com/user-attachments/assets/c0c4d14f-ddce-40a4-afd8-03534656ef33" width="90%" />
</p>

- 작성한 게시글은 본인이 수정하거나 삭제할 수 있다.  
- 게시글 내에서 공감(좋아요) 버튼을 누를 수 있으며, 댓글 작성 후 본인의 댓글에 한해 수정/삭제가 가능하다.

---

### 📢 공지사항 페이지

<p align="center">
  <img src="https://github.com/user-attachments/assets/84ce3c07-969d-4749-bd78-2399cff9d27e" width="90%" />
</p>

- 소프트웨어학부 공식 홈페이지의 공지사항과 연동시켜 "공지사항" 탭 클릭시 이동한다. 
