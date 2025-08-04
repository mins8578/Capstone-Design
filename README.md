# 🎓 Hallym Software Graduation Self-Check Web App

한림대학교 정보과학대학 소프트웨어학부 학생들을 위한  
졸업 자가진단 및 정보 커뮤니티 플랫폼입니다.


## 👨‍👩‍👧‍👦 팀 정보

| BE 김민석 | FE 최승혁 | BE 김명찬 |
|:---:|:---:|:---:|
| 백엔드(로그인, 회원가입, 게시판 로직 구현 및 배포 보조) | 프론트엔드(UX/UI, 와이어프레임 구성) | 백엔드(DB설계, 자기진단 로직 구현 배포 |
| 소프트웨어학부 빅데이터전 전공 20학번 | 소프트웨어학부 빅데이터 전공 20학번| 소프트웨어학부 빅데이터 전공 17학번|
| [mins8578](https://github.com/mins8578) | [Choi-sh01](https://github.com/Choi-sh01) | [wtgs9817](https://github.com/wtgs9817) |
| <img src="https://avatars.githubusercontent.com/u/124144536?v=4" width="200"/> | <img src="https://avatars.githubusercontent.com/u/149940585?v=4" width="200"/> | <img src="https://avatars.githubusercontent.com/u/87848350?v=4" width="200"/> |

---
## 마주한 문제점

### 🚨 사용자 정보 동기화
사전 아이디어 구상 당시 학교 전산실로부터 학생들의 정보를 받아와 수강했던 과목들을 조회하여 졸업요건을 분석하여 제시하려고 했으나 학교 측으로부터 반응이 없어 학생들이 직접 수강했던 과목들을 입력하고 저장해야 했습니다. 회원가입 로직 구현 당시 25번 포트를 사용하여 학교 이메일 인증을 통해 가입이 가능하도록 구현하였는데 배포 당시 AWS EC2 서비스에서 스펨 메일 전송을 방지하고자 25번 포트를 기본적으로 차단하고 있었습니다. AWS 측에 메일로 포트 차단 해제를 요청하여 정상적으로 사용할 수 있도록 하였습니다.

### 🚨 웹 페이지 새로고침 시 404 Not Found 에러 발생
웹 사이트 내 어느 페이지에서든 새로고침 시 HTTP 404 Not Found 에러 발생으로 매번 웹 사이트를 나갔다 들어와야 정상적으로 로딩이 되었습니다. 이를 해결하고자 백엔드에서 WebMvcConfig 파일을 만들어 React SPA의 라우팅을 서버에서 처리할 수 있도록 ViewController로 등록하는 역할을 하였습니다. 사용자가 새로고침을 하더라도 React Router가 정상적으로 동작하도록 index.html로 포트포워딩 하도록 구현하였습니다.
결과적으로 React Router가 현재 URL을 읽고 해당 컴포넌트를 다시 렌더링하여 새로고침 시 정상적으로 페이지가 다시 로드되도록 하였습니다.

### 🚨 로직 테스트 과정 중 CORS 에러 발생
백엔드에서 구현한 로직을 테스트 하기 위해 React와 Spring Boot 연동 중 도메인이 달라 브라우저가 보안상 요청을 차단하여 CORS 에러를 발생시켰습니다. 개발 초기 단계에 로컬 환경에서 로직을 구현하고 테스트를 위해 연동을 하려니 요청 도메인이 달라 연동 과정 중 에러가 발생하였습니다. SpringConfig 파일에서 CORS 설정을 통해 에러를 해결하였습니다.

### 🚨 게시글 좋아요 등록 요청, 상태 확인 시 403 Forbidden 에러 발생
React에서 게시글의 좋아요 상태를 확인하거나 좋아요 등록 요청을 할 때 JWT 토큰이 누락된 채로 axios 요청이 전송되었고 Spring Boot에서 해당 요청을 인증되지 않은 사용자로 간주하여 403 코드를 반환하였습니다. axios 요청에 Authorization:Bearer<token>형식으로 헤더를 수동으로 설정하여 에러를 해결하였습니다. 
제가 사용한 코드는 axios 요청마다 직접 Authorization 헤더를 수동으로 추가한 방식을 사용하였습니다. 이 방식이 큰 프로젝트에서는 코드 중복이 많고 유지보수가 힘들 수 있지만 에러를 찾는 과정에서 어떤 요청에 인증이 필요한지 명확하게 알아야 했기에 수동 설정 방식을 사용하여 구현하였습니다.
※ headers를 매번 작성하지 않고 axios 인터셉터를 설정하면 전역 자동 처리로 인해 유지보수와 편의성 측면에서 성능이 더 향상 될 것입니다.

### 프론트엔드와 백엔드의 역할 분담 구조
Spring Boot(WAS)는 백엔드 서버 역할로 클라이언트의 REST API요청을 처리하고 동적 데이터를 응답합니다. 즉, 핵심 로직 처리를 담당합니다.
React(Frontend)는 사용자가 보는 웹 화면(UI)을 구성하는 역할로 사용자가 입력을 받아 API 요청을 보내도록 합니다.
Nginx(웹서버, 리버스 프록시)는 React가 빌드한 정적 파일을 클라이언트에게 제공합니다. 사용자의 API 요청이 오면 그것을 Spring Boot 쪽으로 대신 전달하며 네트워크 요청을 중계하는 역할을 합니다.

기존에는 Spring Boot가 정적 파일 + API 처리를 다 맡아서 했기 때문에 부하가 크고 비효율적이며 유지보수가 어려웠습니다. 하지만 이번 프로젝트를 통해 역할 분담된 구조를 설계함으로써 서버의 부하를 효과적으로 줄이고, 구조적으로 더욱 유연하고 유지보수에 용이한 실무형 아케텍처를 구현할 수 있었습니다.

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
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">

<img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white">


### 🧠 Backend
<img src="https://img.shields.io/badge/springboot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src ="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white">

<img src="https://img.shields.io/badge/Spring%20Data%20JPA-6DB33F.svg?style=for-the-badge&logo=spring&logoColor=white">
<img src="https://img.shields.io/badge/apache%20tomcat-%23F8DC75.svg?style=for-the-badge&logo=apache-tomcat&logoColor=black">

### 🗄️ Database
<img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/AWS%20RDS-%23232F3E.svg?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/ERD--dbdiagram.io-%237A42F2.svg?style=for-the-badge&logo=sqlite&logoColor=white">



### 🌐 인프라 / 배포
<img src="https://img.shields.io/badge/Amazon%20EC2-FF9900?style=for-the-badge&logo=Amazon%20EC2&logoColor=white"> <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white">
 

### 🧰 기타 도구
<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"> <img src="https://img.shields.io/badge/IntelliJIDEA-000000.svg?style=for-the-badge&logo=intellij-idea&logoColor=white">

---
### 시연 동영상
[![한림대학교 졸업자가진단 웹 앱 시연 영상](https://img.youtube.com/vi/ktFZfJ3LUmM/0.jpg)](https://www.youtube.com/watch?v=ktFZfJ3LUmM)
---

### 프로젝트 구조도
![캡스톤디자인_최종](https://github.com/user-attachments/assets/985262b1-af51-4fd0-a64c-75f6a49ba25b)



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
  <img width="1502" height="865" alt="Image" src="https://github.com/user-attachments/assets/698f502d-d702-439e-9ee8-6f76e8ec87ac" />
  <img width="556" height="280" alt="Image" src="https://github.com/user-attachments/assets/c5147cd1-f2cf-4a6e-bfab-cde1ce35b0da" />
</p>


- 사용자는 학교 이메일을 입력하고 인증코드를 입력해 학생 인증을 완료한다.
- 인증되 사용자는 주전공, 복수전공을 선택하여 회원가입을 완료한다.
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
