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
