# 디플로이먼트(Deployment)란?
### 디플로이먼트(Deployment)란? 
> 디플로이먼트(Deployment) : 파드를 묶음으로 쉽게 관리할 수 있는 기능

현업에서는 일반적으로 서버를 작동시킬 때 파드(Pod)를 수동으로 배포하진 않는다. 디플로이먼트(Deployment)라는 걸 활용해서 파드(Pod)를 자동으로 배포한다.

### 디플로이먼트(Deployment)의 장점
- 파드의 수를 지정하는 대로 여러 개의 파드를 쉽게 생성할 수 있음.
    - ex) 파드를 100개를 생성하라고 시키면 디플로이먼트가 알아서 파드를 100개 생성해준다.
- 파드가 비정상적으로 종료된 경우, 알아서 새로 파드를 생성해 파드 수를 유지한다.
- 동일한 구성의 여러 파드를 일괄적으로 일시 중지, 삭제, 업데이트를 하기가 쉽다.
    - ex) 디플로이먼트를 활용하면 ‘100개의 파드로 띄워져있는 결제 서버’를 한 번에 일시 중지/삭제/업데이트하는 게 굉장히 쉽다.

### 디플로이먼트(Deployment)의 구조
<img width="691" height="467" alt="image" src="https://github.com/user-attachments/assets/33a01317-b568-4bcb-a030-7e1ce45a8df0" />

- **디플로이먼트(Deployment)가 레플리카셋(ReplicaSet)을 관리하고, 레플리카셋(ReplicaSet)이 여러 파드(Pod)를 관리하는 구조다.**
    - 레플리카(Replica) : 복제본
    - 레플리카셋(ReplicaSet) : 복제본끼리의 묶음

# [예제] 디플로이먼트를 활용해 백엔드(Spring Boot) 서버 3개 띄워보기
### 디플로이먼트를 활용해 백엔드(Spring Boot) 서버 3개 띄워보기
새로운 매니페스트 파일 (spring-deployment.yaml)
```
apiVersion: apps/v1
kind: Deployment

# Deployment 기본 정보
metadata:
  name: spring-deployment # Deployment 이름

# Deployment 세부 정보
spec:
  replicas: 3 # 생성할 파드의 복제본 개수
  selector:
    matchLabels:
      app: backend-app # 아래에서 정의한 Pod 중 'app: backend-app'이라는 값을 가진 파드를 선택

  # 배포할 Pod 정의
  template:
    metadata:
      labels: # 레이블 (= 카테고리), 파드에 대한 카테고리
        app: backend-app # 세부 카테고리
    spec:
      containers:
        - name: spring-container # 컨테이너 이름
          image: spring-server # 컨테이너를 생성할 때 사용할 이미지
          imagePullPolicy: IfNotPresent # 로컬에서 이미지를 먼저 가져온다. 없으면 레지스트리에서 가져온다.
          ports:
            - containerPort: 8080  # 컨테이너에서 사용하는 포트를 명시적으로 표현
```

2. 기존 파드 삭제하기
```
$ kubectl delete pod spring-pod-1 spring-pod-2 spring-pod-3 
$ kubectl get pods # 잘 삭제됐는 지 확인하기
```

3. 매니페스트 파일을 기반으로 디플로이먼트(Deployment) 생성하기
```
$ kubectl apply -f spring-deployment.yaml 
```

4. 디플로이먼트, 레플리카셋, 파드가 잘 생성됐는 지 확인
```
$ kubectl get deployment
$ kubectl get replicaset
$ kubectl get pods
```
<img width="609" height="249" alt="image" src="https://github.com/user-attachments/assets/6e8daf9a-62ba-4f9d-a809-3aa62bdbef71" />


### 전체 구조
<img width="1568" height="1134" alt="image" src="https://github.com/user-attachments/assets/5a17994e-65b7-45f5-9284-da072641b9d7" />

> 백엔드 서버 3개를 각각의 파드에 띄웠다.
> 실제 요청을 보낼 때는 각 서버에 균등하게 트래픽이 분배되어야 한다.
> 그런데 사용자보고 여러 백엔드 서버에 알아서 균등하게 요청을 하라고 시킬 수는 없다.
> 따라서 파드 앞단에 알아서 여러 파드에 균등하게 요청을 분배해줄 무언가가 필요하다.
> 쿠버네티스에서는 서비스(Service)가 여러 파드에 균등하게 요청을 분배해주는 역할을 한다.
> 다음 강의에서 서비스(Service)에 대해 자세히 알아보자.

# 서비스(Service)란?
### 서비스(Service)란? 
> 서비스(Service) : 외부로부터 요청을 받는 역할 / 외부로부터 들어오는 트래픽을 받아, 파드에 균등하게 분배해주는 로드밸런서 역할을 하는 기능

실제 서비스에서 파드(Pod)에 요청을 보낼 때, 포트 포워딩(`port-forward`)이나 파드 내로 직접 접근(`kubectl exec …`)해서 요청을 보내진 않는다. 서비스(Service)를 통해 요청을 보내는 게 일반적이다.

### 서비스(Service)의 구조
<img width="1592" height="1440" alt="image" src="https://github.com/user-attachments/assets/243a8203-4ecd-444a-be95-587ab15a0aa0" />

# [예제] 서비스(Service)를 활용해 백엔드(Spring Boot) 서버와 통신해보기
### 서비스(Service)를 활용해 백엔드(Spring Boot)와 통신해보기
1. 매니페스트 파일 추가하기
spring-service.yaml
```
apiVersion: v1
kind: Service

# Service 기본 정보
metadata:
  name: spring-service # Service 이름
  
# Service 세부 정보
spec:
  type: NodePort # Service의 종류
  selector:
    app: backend-app # 실행되고 있는 파드 중 'app: backend-app'이라는 값을 가진 파드와 서비스를 연결, deployment 의 template.metadata.labels.apps 에 정의해 놓은 것과 일치
  ports:
    - protocol: TCP # 서비스에 접속하기 위한 프로토콜
      port: 8080 # 쿠버네티스 내부에서 Service에 접속하기 위한 포트 번호
      targetPort: 8080 # 매핑하기 위한 파드의 포트 번호 (deployment 의 templage.spec.containers.ports.containerPort)
      nodePort: 30000 # 외부에서 사용자들이 접근하게 될 포트 번호
```
- `Service` 종류에 대해 한 번 짚고 넘어가자. 우선 아래 3가지 개념에 대해서만 이해하고 넘어가자.
    - `NodePort` : 쿠버네티스 내부에서 해당 서비스에 접속하기 위한 포트를 열고 **외부에서 접속 가능**하도록 한다.
    - `ClusterIP` : 쿠버네티스 내부에서만 통신할 수 있는 IP 주소를 부여. 외부에서는 요청할 수 없다.
    - `LoadBalancer` : 외부의 로드밸런서(AWS의 로드밸런서 등)를 활용해 외부에서 접속할 수 있도록 연결한다.

<img width="1588" height="1494" alt="image" src="https://github.com/user-attachments/assets/046dcabf-e6bb-4764-b3a1-156b29c51b49" />

2. 매니페스트 파일을 기반으로 서비스(Service) 생성하기
```
$ kubectl apply -f spring-service.yaml 
```

3. 서비스가 잘 생성됐는 지 확인
```
$ kubectl get service
```

4. 잘 접속되는 지 확인
<img width="644" height="239" alt="image" src="https://github.com/user-attachments/assets/837043de-3a87-4a2e-96c7-cc9cebf841bb" />

# 디플로이먼트를 활용한 서버 개수 조절 방법
### 트래픽이 늘어나서 서버를 5개로 늘리고 싶다면?
1. 매니페스트 파일 수정
spring-deployment.yaml
```
apiVersion: apps/v1
kind: Deployment

metadata:
  name: spring-deployment

spec:
  replicas: 5
  selector:
    matchLabels:
      app: backend-app

  template:
    metadata:
      labels: 
        app: backend-app
    spec:
      containers:
        - name: spring-container
          image: spring-server
          imagePullPolicy: IfNotPresent 
          ports:
            - containerPort: 8080
```

2. 변경사항 적용
```
$ kubectl apply -f spring-deployment.yaml 
```

kubectl apply 명령어는 새롭게 오브젝트(디플로이먼트, 파드 등)를 생성할 때도 사용하고, 변경 사항을 적용시킬 때도 사용할 수 있는 편리한 명령어이다. 

3. 잘 적용됐는 지 확인하기
```
$ kubectl get pods
```

# 서버가 죽었을 때 자동으로 복구하는 기능 (Self-Healing)
### 실행되고 있는 파드 내 서버가 비정상적으로 종료된다면?
1. 특정 파드의 컨테이너 종료시키기
- 실행 중인 컨테이너 조회하기
```
$ docker ps
```

- 컨테이너 종료하기
```
# docker kill [컨테이너 ID]
$ dokcer kill 8c085c887430
```

2. 파드 조회하기
```
$ kubectl get pods
```
<img width="602" height="156" alt="image" src="https://github.com/user-attachments/assets/3bc5b76c-4593-40e5-9e19-d253edeee7c0" />

파드를 조회해보니 여전히 5개의 파드가 작동하고 있는 걸 알 수 있다. 그런데 제일 첫 번째 파드를 보니 RESTARTS에 1이라고 기록되어 있다. 즉, 파드 내에 컨테이너가 작동하지 않음을 인식하고 컨테이너를 새로 만들어 서버를 재시작 시킨 것이다. 

# 새로운 버전의 서버로 업데이트 시키기
### 새로운 버전의 서버로 업데이트 시키기
1. 코드 수정하기
2. Spring Boot 프로젝트 다시 빌드하기
```
$ ./gradlew clean build
```

3. 빌드된 jar 파일을 기반으로 새로 이미지 빌드하기
```
$ docker build -t spring-server:1.0 .
```

4. 이미지가 잘 생성됐는 지 확인하기
```
$ docker image ls
```

5. 기존 매니페스트 파일 수정하기
spring-deployment.yaml
```
apiVersion: apps/v1
kind: Deployment

metadata:
  name: spring-deployment

spec:
  replicas: 5
  selector:
    matchLabels:
      app: backend-app

  template:
    metadata:
      labels: 
        app: backend-app
    spec:
      containers:
        - name: spring-container 
          image: spring-server:1.0 # 이부분 변경
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080 
```

6. 수정된 매니페스트 파일을 기반으로 업데이트하기
```
$ kubectl apply -f spring-deployment.yaml
```

7. 업데이트 됐는 지 확인하기
<img width="592" height="297" alt="image" src="https://github.com/user-attachments/assets/9faf119d-142e-41aa-b5f0-ab2cb50f39cb" />

# [요약] 지금까지 나온 명령어 정리
### 파드(Pod) 관련 명령어
```bash
$ kubectl get pods # 파드 조회

# kubectl exec -it [파드명] -- bash
$ kubectl exec -it nginx-pod -- bash # 파드 내부로 접속

# kubectl port-forward pod/[파드명] [로컬에서의 포트]/[파드에서의 포트]
$ kubectl port-forward pod/nginx-pod 80:80 # 파드 포트 포워딩

# kubectl delete pod [파드명]
$ kubectl delete pod nginx-pod # nginx-pod라는 파드 삭제
```

### 디플로이먼트(Deployment) 관련 명령어
```bash
$ kubectl get deployment # 디플로이먼트 조회

# kubectl delete deployment [디플로이먼트명] # 디플로이먼트 삭제
$ kubectl delete deployment spring-deployment # spring-deployment라는 디플로이먼트 삭제
```

### 서비스(Service) 관련 명령어
```
$ kubectl get service # 서비스 조회

# kubectl delete service [서비스명] # 서비스 삭제
$ kubectl delete service spring-service # spring-service라는 서비스 삭제
```

### 공통 명령어
```
# kubectl apply -f [파일명] #  매니페스트 파일에 적혀져있는 리소스(파드 등) 생성
$ kubectl apply -f nginx-pod.yaml

$ kubectl delete all --all  # 모든 리소스 삭제
```

# [요약] 파드(Pod), 디플로이먼트(Deployment), 서비스(Service) 개념 정리
###  쿠버네티스에서의 핵심 개념
<img width="1592" height="1440" alt="image" src="https://github.com/user-attachments/assets/3e723df7-7610-4574-aa9d-119737d9b032" />

- 파드(Pod) : 일반적으로 쿠버네티스에서 하나의 프로그램을 실행시키는 단위 (쿠버네티스에서 가장 작은 단위)
- 디플로이먼트(Deployment) : 파드를 묶음으로 쉽게 관리할 수 있는 기능
- 서비스(Service) : 외부로부터 들어오는 트래픽을 받아, 파드에 균등하게 분배해주는 로드밸런서 역할을 하는 기능

> 쿠버네티스에서는 서비스(Service), 디플로이먼트(Deployment), 파드(Pod)와 같은 리소스를 보고 오브젝트(Object)라고 부른다. 

쿠버네티스에서 위 개념 말고도 `스테이트풀셋(StatefulSet)`, `잡(Job)`과 같은 다양한 개념이 존재한다. OT에서 얘기한 파레토의 법칙에 따르면 이 모든 개념을 처음부터 다 흡수하려고 할 필요 없다. 현업에서 가장 많이 사용되고 중요한 개념 위주로 먼저 배우고 익숙해지는 게 중요하다. 

쿠버네티스를 학습할 때 발목을 붙잡는 건 모든 개념을 한 번에 다 익히려고 하는 욕심 때문에 발생한다. 자주 쓰이는 개념 가지고 이것저것 만들어보면서 익숙해진 다음에 새로운 개념들을 하나씩 하나씩 추가적으로 학습해나가야 한다. 그래야 빨리 배울 수 있다.

# [예제] 백엔드(Spring Boot) 서버에 환경변수 등록해 사용하기
1. Spring Boot 프로젝트 셋팅
2. 간단한 코드 작성
```Java
@RestController
public class AppController {
  @Value("${MY_ACCOUNT:default}")
  private String myAccount;
  
  @Value("${MY_PASSWORD:default}")
  private String myPassword;

  @GetMapping("/")
  public String home() {
    return "myAccount: " + myAccount + ", myPassword: " + myPassword;
  }
}
```

3. 프로젝트 실행시켜보기

4. Dockerfile 작성하기
```Docker
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

7. 매니페스트 파일 작성하기
spring-deployment.yaml
```bash
apiVersion: apps/v1
kind: Deployment

# Deployment 기본 정보
metadata:
  name: spring-deployment # Deployment 이름

# Deployment 세부 정보
spec:
  replicas: 3 # 생성할 파드의 복제본 개수
  selector:
    matchLabels:
      app: backend-app # 아래에서 정의한 Pod 중 'app: backend-app'이라는 값을 가진 파드를 선택

  # 배포할 Pod 정의
  template:
    metadata:
      labels: # 레이블 (= 카테고리)
        app: backend-app
    spec:
      containers:
        - name: spring-container # 컨테이너 이름
          image: spring-server # 컨테이너를 생성할 때 사용할 이미지
          imagePullPolicy: IfNotPresent # 로컬에서 이미지를 먼저 가져온다. 없으면 레지스트리에서 가져온다.
          ports:
            - containerPort: 8080  # 컨테이너에서 사용하는 포트를 명시적으로 표현
          env: # 환경변수 등록
            - name: MY_ACCOUNT
              value: jaeseong
            - name: MY_PASSWORD
              value: pwd1234
```
spring-service.yaml
```bash
apiVersion: v1
kind: Service

# Service 기본 정보
metadata:
  name: spring-service
  
# Service 세부 정보
spec:
  type: NodePort # Service의 종류
  selector:
    app: backend-app # 실행되고 있는 파드 중 'app: backend-app'이라는 값을 가진 파드와 서비스를 연결
  ports:
    - protocol: TCP # 서비스에 접속하기 위한 프로토콜
      port: 8080 # 쿠버네티스 내부에서 Service에 접속하기 위한 포트 번호 (Service
      targetPort: 8080 # 매핑하기 위한 파드의 포트 번호
      nodePort: 30000 # 외부에서 사용자들이 접근하게 될 포트 번호
```

8. 매니페스트 기반으로 실행시키기
```
$ kubectl apply -f spring-deployment.yaml
$ kubectl apply -f spring-service.yaml
```

9. 환경변수가 잘 적용됐는 지 확인해보기
<img width="639" height="264" alt="image" src="https://github.com/user-attachments/assets/b525d757-e25a-4ddb-a110-88b0bb6b6314" />

10. 파드 내부로 접속해서 확인해보기
<img width="468" height="407" alt="image" src="https://github.com/user-attachments/assets/7e439fb9-3f8d-4481-8403-a9977588b1cf" />

# 컨피그맵(ConfigMap)을 활용해 환경변수 분리하기
### 컨피그맵(ConfigMap)이란? 
Spring Boot에서는 설정값을 `application.yml`으로 분리해서 관리한다. Nest.js에서도 설정값을 `.env`으로 분리해서 관리한다. 별도의 파일로 분리를 해서 관리함으로써 유지보수가 편리해지고 개발, 테스트, 프로덕션과 같은 환경 분리가 편해진다. 

쿠버네티스에서는 파드(Pod), 디플로이먼트(Deployment), 서비스(Service)가 각각의 역할을 가지고 있는 것처럼 **환경 변수를 관리하는 역할을 가진 오브젝트**가 따로 존재한다. 그게 바로 **컨피그맵(ConfigMap)**이다.

### 디플로이먼트(Deployment)에 환경 변수의 정보를 같이 작성했을 때의 단점
spring-deployment.yaml
```bash
apiVersion: apps/v1
kind: Deployment

# Deployment 기본 정보
metadata:
  name: spring-deployment # Deployment 이름

# Deployment 세부 정보
spec:
  replicas: 3 # 생성할 파드의 복제본 개수
  selector:
    matchLabels:
      app: backend-app # 아래에서 정의한 Pod 중 'app: backend-app'이라는 값을 가진 파드를 선택

  # 배포할 Pod 정의
  template:
    metadata:
      labels: # 레이블 (= 카테고리)
        app: backend-app
    spec:
      containers:
        - name: spring-container # 컨테이너 이름
          image: spring-server # 컨테이너를 생성할 때 사용할 이미지
          imagePullPolicy: IfNotPresent # 로컬에서 이미지를 먼저 가져온다. 없으면 레지스트리에서 가져온다.
          ports:
            - containerPort: 8080  # 컨테이너에서 사용하는 포트를 명시적으로 표현
          env: # 환경변수 등록
            - name: MY_ACCOUNT # Key 값
              value: saebyeol # Value 값
            - name: MY_PASSWORD
              value: pwd1234
```

위 매니페스트 파일을 보면 디플로이먼트(Deployment)에 대한 내용과 환경 변수에 관련된 내용을 같이 작성했다. 이렇게 환경 변수를 디플로이먼트(Deployment) 내부에 작성하면 다른 환경(개발, 테스트, 프로덕션 등)에서 서버를 실행할 때 유연하게 설정 값을 변경하기 어려워진다.

### 컨피그맵(ConfigMap)을 활용해 환경변수 분리하기
1. ConfigMap 매니페스트 파일 생성하기
spring-config.yaml
```bash
apiVersion: v1
kind: ConfigMap

# ConfigMap 기본 정보
metadata:
  name: spring-config # ConfigMap 이름

# Key, Value 형식으로 설정값 저장
data:
  my-account: kimsb
  my-password: password123
```

2. Deployment 매니페스트 파일 수정하기
```bash
apiVersion: apps/v1
kind: Deployment

# Deployment 기본 정보
metadata:
  name: spring-deployment # Deployment 이름

# Deployment 세부 정보
spec:
  replicas: 5 # 생성할 파드의 복제본 개수
  selector:
    matchLabels:
      app: backend-app # 아래에서 정의한 Pod 중 'app: backend-app'이라는 값을 가진 파드를 선택

  # 배포할 Pod 정의
  template:
    metadata:
      labels: # 레이블 (= 카테고리)
        app: backend-app
    spec:
      containers:
        - name: spring-container # 컨테이너 이름
          image: spring-server # 컨테이너를 생성할 때 사용할 이미지
          imagePullPolicy: IfNotPresent # 로컬에서 이미지를 먼저 가져온다. 없으면 레지스트리에서 가져온다.
          ports:
            - containerPort: 8080  # 컨테이너에서 사용하는 포트를 명시적으로 표현
          env:
            - name: MY_ACCOUNT
              valueFrom:
                configMapKeyRef:
                  name: spring-config # ConfigMap의 이름
                  key: my-account # ConfigMap에 설정되어 있는 Key값
            - name: MY_PASSWORD
              valueFrom:
                configMapKeyRef:
                  name: spring-config
                  key: my-password
```

3. 매니페스트 파일 반영하기
```bash
$ kubectl apply -f spring-config.yaml
$ kubectl apply -f spring-deployment.yaml

# kubectl rollout restart deployment [디플로이먼트명]
$ kubectl rollout restart deployment spring-deployment # Deployment 재시작
```

4. 잘 반영됐는 지 확인하기
<img width="617" height="188" alt="image" src="https://github.com/user-attachments/assets/9fe66434-9c4b-4ff1-a10e-2e6b8696d7ce" />

# 시크릿(Secret)을 활용해 ‘민감한 값’을 환경 변수로 분리하기
### 시크릿(Secret)이란? 
시크릿(Secret)은 컨피그맵(ConfigMap)과 비슷하게 환경 변수를 분리해서 관리하는 오브젝트이다. 차이점은 시크릿(Secret)은 비밀번호와 같이 보안적으로 중요한 값을 관리하기 위한 오브젝트이다.

### 시크릿(Secret)을 활용해 ‘민감한 값’을 따로 분리하기
1. 기존 매니페스트 파일 살펴보기
spring-config.yaml
```bash
apiVersion: v1
kind: ConfigMap

# ConfigMap 기본 정보
metadata:
  name: spring-config # ConfigMap 이름

# Key, Value 형식으로 설정값 저장
data:
  my-account: kimsb
  my-password: password123
```
위 매니페스트 파일에서 my_password의 값이 보안적으로 중요한 값이라고 가정해보자. 그러면 my_password의 값은 컨피그맵(ConfigMap)이 아닌 시크릿(Secret)으로 관리해야 한다. 

2. 기존 매니페스트 파일 수정하기 / 새로운 매니페스트 파일 생성하기
수정 (spring-config.yaml)
```bash
piVersion: v1
kind: Secret

# ConfigMap 기본 정보
metadata:
  name: spring-config # ConfigMap 이름

# Key, Value 형식으로 설정값 저장
data:
  my-account: jscode
  my-password: password123 # 이 부분 제거 필요! 
```

생성 (spring-secret.yaml)
```bash
apiVersion: v1
kind: Secret

# Secret 기본 정보
metadata:
  name: spring-secret # Secret 이름

# Key, Value 형식으로 값 저장
stringData:
  my-password: my-secret-password
```

수정 (spring-deployment.yaml)
```
apiVersion: apps/v1
kind: Deployment

# Deployment 기본 정보
metadata:
  name: spring-deployment # Deployment 이름

# Deployment 세부 정보
spec:
  replicas: 5 # 생성할 파드의 복제본 개수
  selector:
    matchLabels:
      app: backend-app # 아래에서 정의한 Pod 중 'app: backend-app'이라는 값을 가진 파드를 선택

  # 배포할 Pod 정의
  template:
    metadata:
      labels: # 레이블 (= 카테고리)
        app: backend-app
    spec:
      containers:
        - name: spring-container # 컨테이너 이름
          image: spring-server # 컨테이너를 생성할 때 사용할 이미지
          imagePullPolicy: IfNotPresent # 로컬에서 이미지를 먼저 가져온다. 없으면 레지스트리에서 가져온다.
          ports:
            - containerPort: 8080  # 컨테이너에서 사용하는 포트를 명시적으로 표현
          env:
            - name: MY_ACCOUNT
              valueFrom:
                configMapKeyRef:
                  name: spring-config # ConfigMap의 이름
                  key: my-account # ConfigMap에 설정되어 있는 Key값
            - name: MY_PASSWORD
              valueFrom:
                # 이 부분 수정!
                secretKeyRef:
                  name: spring-secret
                  key: my-password
```

3. 매니페스트 파일 반영하기
```
$ kubectl apply -f spring-secret.yaml
$ kubectl apply -f spring-config.yaml
$ kubectl apply -f spring-deployment.yaml
$ kubectl rollout restart deployment spring-deployment
```

4. 잘 반영됐는 지 확인하기
<img width="626" height="239" alt="image" src="https://github.com/user-attachments/assets/dd0bcd75-716c-4f07-afd4-6e68789d4994" />

