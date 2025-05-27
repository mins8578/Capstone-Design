# Node.js를 기반으로 하는 리액트 앱 이미지
# Node.js v16을 기반으로 하는 경량 Alpine 리눅스 이미지를 사용
# AS build : 이 단계를 "build"라는 이름으로 명명해서, 나중에 COPY --from=build 같은 식으로 참조 가능
# 이 단계에서는 리액트 앱을 빌드하고 결과물만 추출
# 이 줄에서부터 다음 FROM 줄이 나오기 전까지가 전부 "build" 라는 이름의 빌드 스테이지임.

# 스테이지 : Dockerfile 에서는 여러 단계를 나눠서 빌드할 수 있는데, 그걸 멀티 스테이지 빌드라고 함.
# 각 단계는 FROM 으로 시작
# AS [이름] 을 붙이면, **나중에 그 스테이지의 파일을 참조할 수 있는 별칭(alias)"" 이 됨.

FROM node:16-alpine AS build

# 컨테이너 안에서 작업할 디렉토리를 /app 으로 설정
# 이후의 모든 경로는 /app 기준으로 수행됨.
WORKDIR /app

# 의존성 설치 및 빌드(CI)
# package.json이란?
# Node.js 프로젝트의 설정, 의존성, 실행 명령어, 메타데이터를 담고 있는 JSON 파일입니다.
# React, Express, Vue, Next 등 npm 기반 프로젝트라면 무조건 포함됩니다.
COPY package.json .
RUN npm install

# 현재 디렉토리의 모든 소스 코드 복사  --> (/app 에 복사됨)
# 첫 번째 . → 호스트(로컬)의 현재 디렉토리
# 두 번째 . → 컨테이너의 현재 작업 디렉토리 (/app)

# 이때 package-lock.json, src/, public/, nginx/ 등 프로젝트 전체가 /app에 들어감
COPY . .

RUN npm run build

# Nginx를 기반으로 하는 최종 이미지
FROM nginx:alpine

# Nginx 설정 파일 복사
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# mime.types 파일을 복사
COPY nginx/mime.types /etc/nginx/mime.types

# 빌드된 리액트 앱을 Nginx의 HTML 디렉토리로 복사

# COPY: 호스트 시스템의 파일이나 디렉터리를 이미지의 파일 시스템으로 복사
# --from=build : 위에서 AS build로 명명한 스테이지에서 복사하겠다는 뜻
# /app/build :위 "build 스테이지"에서 만들어진 컨테이너 파일시스템 내부의 경로, 빌드된 리액트 정적 파일들이 있는 경로 || 가져올 경로.
# /usr/share/nginx/html : Nginx가 정적 파일을 서빙하는 기본 디렉토리 (이곳으로 복사됨)

# ** "원래 호스트 시스템의 파일이나 디렉터리를 이미지의 파일 시스템으로 복사한다" 이지만 예외도 있음. COPY --from=... 는 예외적인 경우로 **다른 이미지의 파일 시스템에서 복사** 하는 용도로도 사용됨.


# 의미 : build 스테이지라는 이름의 중간 이미지 내부에서 /app/build 경로에 있는 파일들을 현재 이 Dockerfile 단계의 이미지(/usr/share/nginx/html)로 복사해라.
COPY --from=build /app/build /usr/share/nginx/html

# 포트 설정
EXPOSE 80

# Nginx 실행
# daemon off;"
# daemon 옵션은 Nginx가 백그라운드(데몬)로 실행될지 여부를 결정함
# 기본값은 on이라서 Nginx가 백그라운드로 빠짐 → Docker는 이걸 "종료됨"으로 인식함
# 그래서 반드시 daemon off; 를 설정해서 Nginx가 포그라운드로 실행되게 해야 함

# 왜 daemon off;가 중요하냐면?
# Docker 컨테이너는 **"가장 앞에서 실행되는 프로세스가 종료되면 컨테이너도 같이 종료"**됩니다.
# Nginx가 백그라운드에서 돌면 메인 프로세스가 없어서 컨테이너가 꺼짐
# daemon off; → 포그라운드 실행 → Docker는 이 프로세스를 계속 추적 → 컨테이너가 살아있음

# CMD  컨테이너 실행 시 수행할 명령어 지정
# "nginx"  웹 서버 실행
# -g	nginx 설정을 명령줄에서 직접 지정
# "daemon off;"	 포그라운드 실행 (Docker 컨테이너가 계속 살아있도록)

# 전체 의미 : Nginx 웹서버를 컨테이너에서 포그라운드로 실행시키기 위한 명령
CMD ["nginx", "-g", "daemon off;"]