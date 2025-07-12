# 쿠버네티스 기본 개념
### 쿠버네티스란?
쿠버네티스는 다수의 컨테이너(도커 컨테이너)를 효율적으로 배포, 확장 및 관리하기 위한 오픈 소스 시스템이다. 쿠버네티스는 docker compose 와 비슷한 느낌을 가지고 있다. docker compose 의 확장판이라고 생각하면 편하다.

### 쿠버네티스의 장점
- 컨테이너 관리 자동화 (배포, 확장, 업데이트)
- 부하 분산 (로드 밸런싱)
- 쉬운 스케일링
- 셀프 힐링

# 로컬에서의 쿠버네티스 설치
### 로컬에서의 쿠버네티스 설치
docker desktop 이라는 걸 활용하면 아주 쉽게 쿠버네티스를 설치해서 사용할 수 있다.

- [Mac 에서 kubernates 설치하기](https://soojae.tistory.com/87)

- [Windows 에서 kubernates 설치하기](https://hong-yp-ml-records.tistory.com/127)

- [Mac 에서 kubectl 설치하기](https://kubernetes.io/ko/docs/tasks/tools/install-kubectl-macos/)

- [Windows 에서 kubectl 설치하기](https://kubernetes.io/ko/docs/tasks/tools/install-kubectl-windows/)

# 파드(Pod)란?
### 파드란?
도커에서는 하나의 프로그램을 실행시키는 단위를 컨테이너라고 주로 불렀다. 쿠버네티스에서는 하나의 프로그램을 실행시키는 단위를 파드(Pod)라고 부른다. 쿠버네티스에서 하나의 프로그램을 실행시키는 단위.
- 쿠버네티스에서 가장 작은 단위
- 일반적으로 하나의 파드가 하나의 컨테이너를 가진다. (예외적으로 하나의 파드가 여러개의 컨테이너를 가지는 경우도 있다.)

  ** 컨테이너: 'Docker' 컨테이너를 뜻한다.

<img width="590" height="394" alt="image" src="https://github.com/user-attachments/assets/9bb7d67b-ab91-4b5f-98fa-8c57d5db571f" />

- 2개의 결제 서버가 띄워져있다.
  - 2개의 결제서버 파드가 띄워져있다.
- 1개의 결제 서버가 죽었다.
  - 1개의 결제 서버 파드가 죽었다.
- 업로드 서버를 하나 띄우자.
  - 업로드 서버 하나를 파드로 띄우자. 

### 쿠버네티스도 도커러첨 이미지를 기반으로 파드를 띄워 실행시킨다.

<img width="650" height="385" alt="image" src="https://github.com/user-attachments/assets/1e10d031-a035-4309-9be5-3655afacdbe8" />

# 웹서버(Nginx)를 파드(Pod)로 띄워보기
### 웹서버를 파드로 띄워보기
파드를 생성할 때는 CLI 를 활용하는 방법도 있고, yaml 파일을 활용하는 방법이 있다. 실제 현업에서는 yaml 파일을 활용하는 경우가 많다.

1. yaml 파일 생성하기
   nginx-pod.yaml
   ```
   apiVersion: v1 # Pod를 생성할 때는 v1이라고 기재한다. (공식 문서)
   kind: Pod # Pod를 생성한다고 명시
   metadata:
   name: nginx-pod # Pod에 이름 붙이는 기능
   spec:
    containers:
    - name: nginx-container # 생성할 컨테이너의 이름
    image: nginx # 컨테이너를 생성할 때 사용할 Docker 이미지
    ports:
    - containerPort: 80 # 해당 컨테이너가 어떤 포트를 사용하는 지 명시적으로 표현
   ```

   <img width="658" height="312" alt="image" src="https://github.com/user-attachments/assets/c3329c34-2d91-484f-8c65-7e3d3310f6da" />

2. yaml 파일을 기반으로 파드 생성하기
   ```
   $ kubectl apply -f nginx-pod.yaml # yaml 파일에 적혀져있는 리소스(파드)를 생성
   ```
3. 파드가 잘 생성되었는지 확인
   ```
   $ kubectl get pods # 파드(Pod) 조회
   ```

<img width="643" height="121" alt="image" src="https://github.com/user-attachments/assets/0ffd6584-11a4-45a3-9410-0a6c6c4915ab" />

- NAME : Pod의 이름
- READY : (파드 내 준비 완료된 컨테이너 수)/(파드 내 총 컨테이너 수)
- STATUS : 파드의 상태 ( Running : 정상적으로 실행 중)
- RESTARTS : 해당 파드의 컨테이너가 재시작된 횟수
- AGE : 파드가 생성되어 실행된 시간

4. Nginx에 정상적으로 접속이 되는지 확인해보면 접속이 안됨!


> 쿠버네티스에서는 위에서 작성한 yaml 파일을 보고 매니페스트 파일(Manifest File)이라고 부른다. 이 매니페스트 파일은 쿠버네티스에서
> 다양한 리소스(파드, 서비스, 볼륨 등)를 생성하고 관리하기 위해 사용하는 파일이라고 기억하자. 이 용어는 자주 사용되니 반드시 기억해두자.
> (Docker로 치면 Dockerfile과 같은 역할을 하는 파일이다.)'

# 파드로 띄운 프로그램 접속이 안되는 이유
### 파드로 띄운 프로그램 접속이 안되는 이유
<img width="625" height="357" alt="image" src="https://github.com/user-attachments/assets/3407e6d1-aead-46c0-8d4f-d3648a76ee51" />
- 도커에 대해서 공부했을 때에는 컨테이너 내부와 컨테이너 외부의 네트워크가 서로 독립적으로 분리되어있었다. 하지만 쿠버네티스에서는 파드 내부의 네트워크를 컨테이너가 공유해서 같이 사용한다.
- 파드의 네트워크는 로컬 컴퓨터의 네트워크와는 독립적으로 분리되어 있다. 이 때문에 파드로 띄운 Nginx에 아무리 요청을 보내도 응답이 없다.

따라서 Nginx가 띄우는 웹페이지에 접근하려면 2가지 방법이 있다.
1. 파드 내부로 들어가서 접근하기
2. 파드의 내부 네트워크를 외부에서도 접속할 수 있도록 포트 포워딩(=포트 연결시키기) 활용하기

### 파드 내부로 들어가서 접근하기
```
kubectl exec -it nginx-pod -- bash
내부에서 curl localhost:80
```
<img width="659" height="492" alt="image" src="https://github.com/user-attachments/assets/56d768b9-0d53-4186-a524-78097f5adc05" />

### 파드의 내부 네트워크를 외부에서도 접속할 수 있도록 포트 포워딩(=포트 연결시키기) 활용하기
<img width="648" height="355" alt="image" src="https://github.com/user-attachments/assets/fe9f03b1-b2b2-4499-a643-2737ad6a1236" />

```
kubectl port-forward pod/nginx-pod 80:80
```
<img width="718" height="98" alt="image" src="https://github.com/user-attachments/assets/ddf600a2-691a-4f52-a1bb-346548aa55e1" />
<img width="1118" height="367" alt="image" src="https://github.com/user-attachments/assets/b89e5751-2d34-48b2-b523-dc93f748d057" />

### 파드 삭제하기
```
kubectl delete pod nginx-pod # nginx-pod라는 파드 삭제
kubectl get pods # 파드가 잘 삭제됐는 지 확인
```
<img width="663" height="100" alt="image" src="https://github.com/user-attachments/assets/f9647c18-a4dd-4ba6-8024-f5581407aef2" />

# 백엔드(Spring boot) 서버를 파드로 띄워보기
### 백엔드(Spring boot) 서버를 파드로 띄워보기
1. Spring boot 프로젝트 세팅
2. 간단한 코드 작성
  AppController
  ```java
  @RestController
  public class AppController {
    @GetMapping("/")
    public String home() {
      return "Hello, World!";
    }
  }
  ```
3. 프로젝트 실행시켜보기
4. Dockerfile 작성하기
  Dockerfile
  ```
  FROM openjdk:17-jdk

  COPY build/libs/*SNAPSHOT.jar app.jar
  
  ENTRYPOINT ["java", "-jar", "/app.jar"]
  ```
5. Spring Boot 프로젝트 빌드하기
  ```
  $ ./gradlew clean build
  ```
6. Dockerfile을 바탕으로 이미지 빌드하기
  ```
  $ docker build -t spring-server .
  ```
7. 이미지가 잘 생성됐는 지 확인하기
  ```
  $ docker image ls
  ```
8. 매니페스트 파일 작성하기
spring-pod.yaml
  ```
  apiVersion: v1
  kind: Pod
  metadata:
    name: spring-pod
  spec:
    containers:
      - name: spring-container
        image: spring-server
        ports:
          - containerPort: 8080
  ```
<img width="564" height="300" alt="image" src="https://github.com/user-attachments/assets/82f205cb-e049-4267-b285-d00bd5851872" />

9. 매니페스트 파일을 기반으로 파드(Pod) 생성하기
  ```bash
  $ kubectl apply -f spring-pod.yaml 
  ```
10. 파드(Pod)가 잘 생성됐는 지 확인
  ```
  $ kubectl get pods
  ```
<img width="541" height="118" alt="image" src="https://github.com/user-attachments/assets/fe94d355-7fcf-4654-ac5c-3b000032f445" />

# 이미지가 없다고 에러가 뜨는 이유 (이미지 풀 정책)
### 이미지가 없다고 에러가 뜨는 이유
이미지 풀 정책 때문에 발생!

### 이미지 풀 정책
쿠버네티스가 yaml 파일을 읽어들여 파드를 생성할 때, 이미지를 어떻게 Pull 받아올 것인지에 대한 정책을 의미한다. 어떤 적책들이 있는 지 알아보자.
1. `Always` : 로컬에서 이미지를 가져오지 않고, 무조건 레지스트리(= Dockerhub, ECR 과 같은 원격 이미지 저장소)에서 가져온다.
2. `IfNotPresent` : 로컬에서 이미지를 먼저 가져온다. 만약 로컬에 이미지가 없는 경우에만 레지스트리에서 가져온다.
3. `Never` : 로컬에서만 이미지를 가져온다.

### 매니페스트 파일에서 이미지 풀 정책 설정하는 방법
```bash
apiVersion: v1
kind: Pod
metadata:
  name: spring-pod
spec:
  containers:
    - name: spring-container
      image: spring-server
      ports:
        - containerPort: 8080
      imagePullPolicy: IfNotPresent
```
- 이미지의 태그가 `latest`이거나 명시되지 않은 경우 : `imagePullPolicy`는 `Always`로 설정됨
- 이미지의 태그가 `latest`가 아닌 경우 : `imagePullPolicy`는 `IfNotPresent`로 설정됨

위와 같이 설정해준 뒤 기존 파드 삭제 후 다시 생성
```
$ kubectl delete pod spring-pod
$ kubectl apply -f spring-pod.yaml
$ kubectl get pods
```
<img width="446" height="77" alt="image" src="https://github.com/user-attachments/assets/4e945848-9727-48bb-8a8d-3216b9362698" />

Spring Boot 서버에 요청을 보내서 잘 응답하는 지도 알아보자. 

**방법 1. 파드 내부로 들어가서 요청보내기**
```
$ kubectl exec -it spring-pod -- bash 
$ curl localhost:8080
```

**방법 2. 포트 포워딩 활용하기**
```
# 포트
$ kubectl port-forward pod/spring-pod 12345:8080
```

<img width="552" height="205" alt="image" src="https://github.com/user-attachments/assets/7618b632-eef8-4168-886a-3fff2504fe79" />
