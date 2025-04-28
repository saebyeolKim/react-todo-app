# Docker-Study
비전공자도 이해할 수 있는 Docker 입문/실전

### :blossom: Docker 기본개념
1-1. Docker 를 배우는 이유

> 이식성 : 특정 프로그램을 다른 곳으로 쉽게 옮겨서 설치 및 실행할 수 있는 특성
> 
- 매번 귀찮은 **설치 과정을 일일이 거치지 않아도 된다.**
- **항상 일관되게** 프로그램을 설치할 수 있다. (버전, 환경 설정, 옵션, 운영 체제 등)
- 각 프로그램이 독립적인 환경에서 실행되기 때문에 **프로그램 간에 서로 충돌이 일어나지 않는다.**

---

1-2. IP 와 Port 의 개념

ip : 특정 컴퓨터를 가리키는 주소

port : 한 컴퓨터 내에서 실행되고 있는 특정 프로그램의 주소

---

1-3. Docker ? Container ? Image ?

✅Docker : **컨테이너**를 사용하여 각각의 프로그램을 **분리된 환경**에서 실행 및 관리

✅Container : 윈도우 환경을 사용해보면 하나의 컴퓨터에 여러 사용자로 나눠서 사용할 수 있다. 이처럼 하나의 컴퓨터 환경 내에서 독립적인 컴퓨터 환경을 구성해서, 각 환경에 프로그램을 별도로 설치할 수 있게 만든 개념이다. 컨테이너는 컴퓨터 안에 있는 미니 컴퓨터라고 생각하면 된다.

컨테이너와 컨테이너를 포함하고 있는 컴퓨터를 구분하기 위해 컨테이너를 포함하고 있는 컴퓨터를호스트 컴퓨터라고 부른다.

컨테이너의 독립성 : 디스크(저장 공간), 네트워크(IP, Port) 를 각각 가지고 있다.

✅image : 닌텐도의 게임 칩과 같은 역할이 image 이다. 

---

1-4. Docker 전체 흐름 느껴보기

docker 에 nginx 설치
![image](https://github.com/user-attachments/assets/4d524299-e851-480d-8116-43e86d659536)


웹서버 실행 확인
![image (1)](https://github.com/user-attachments/assets/aa7db88a-2950-463b-8e0f-69321b6c6005)
![image (2)](https://github.com/user-attachments/assets/49fa4f25-574f-4ccd-997e-8ce60054dbb8)

실행 중인지 확인
![image (3)](https://github.com/user-attachments/assets/697d2bd6-c0e8-4196-a9d2-5b8be0f2c5d2)

---
### :seedling: Docker CLI 익히기
2-1 이미지 다운로드, 조회/삭제
* docker pull ~ : 이미지 다운받기
* docker image ls : 다운받은 이미지 목록보기 만약 Docker 이미지의 특정 태그를 정해 다운받고 싶다면 docker hub 에서 확인하면 된다.
* docker image rm IMAGE ID 의 일부 : 이미지 삭제
* docker image rm -f IMAGE ID 의 일부 : 이미지 강제 삭제
Error response from daemon: conflict: unable to delete 2e2da08a061a (must be forced) - image is being used by stopped container 8fe5fe329026
* docker image rm $(docker images -q) : 컨테이너에서 사용하고 있지 않은 전체 이미지 삭제
* docker image rm -f $(docker images -q) : 중단된 컨테이너에서 사용하고 있지 않은 전체 이미지 삭제
* docker image rm ID 의 일부 ID 의 일부 : 여러개의 id 삭제

2-2 컨테이너 생성/실행
```
docker create nginx : 컨테이너 (미니컴퓨터) 생성
docker ps -a : 생성된 컨테이너 목록 조회
docker start (id 의 일부) : 생성된 컨테이너 실행
docker create mysql : 만약 mysql 이미지가 없다면 자동으로 다운받아줌
```
실행 후 다시 docker ps -a 명령어 실행 시
![image](https://github.com/user-attachments/assets/307fc7e9-64eb-4eac-b101-1cec1e4b5cbd)

```
docker run __ : docker create __ 와 docker start 명령어를 한번에 해주는 명렁어
```
해당 명령어 실행 시 foreground 에서 실행되기 때문에 해당 명령어 입력 후 다른 명령어 입력이 안됨.

✅foreground(포그라운드) : 내가 실행시킨 프로그램의 내용이 화면에서 실시간으로 실행되고 출력되는 상태

✅background(백그라운드) : 내가 실행시킨 프로그램이 컴퓨터 내부적으로 실행되는 상태

```
docker run -d nginx : 백그라운드로 실행시키는 명령어
docker run -d --name my-web-server nginx : my-web-server 라는 컨테이너 이름으로 실행
```
nginx 를 up 했는데도 불구하고 localhost 라고 입력하면 사이트에 연결할 수 없음이 나온다.

호스트 컴퓨터의 네트워크와 컨테이너의 네트워크가 분리가 되어있기 때문에 외부에서 접근을 못한다.

그래서 호스트 포트(나의 로컬)와 컨테이너 포트를 연결하는 것이 필요하다
```
docker run -d -p 4001(호스트 포트):80(컨테이너 포트) nginx
```
![image](https://github.com/user-attachments/assets/19706335-8d1a-4ccf-bb9b-b8cd909e682d)

