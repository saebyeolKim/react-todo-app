<img width="2048" height="1322" alt="image" src="https://github.com/user-attachments/assets/48e16ed5-d4a8-45e2-902a-a9d7faa79af2" /><img width="2048" height="1695" alt="image" src="https://github.com/user-attachments/assets/1b505849-80d7-4298-81b1-94f5b4bbc38a" /># EKS란? 
### EKS(Elastic Kubernetes Service)란? 
EKS란 **AWS에서 쿠버네티스를 편하게 관리하고 사용할 수 있게 만든 AWS용 쿠버네티스**이다. 
이와 비슷한 예로 MySQL과 같은 DB를 편하게 관리하고 사용할 수 있게 만든 서비스가 **RDS**이고, 
Redis와 같은 캐싱을 편하게 관리하고 사용할 수 있게 만든 서비스가 **ElastiCache**다.

# 쿠버네티스와 EKS의 아키텍처 구조
### 쿠버네티스의 복잡한 아키텍처 구조
<img width="1390" height="690" alt="image" src="https://github.com/user-attachments/assets/c0222ac7-f513-4273-97d2-ace0d1a0b072" />

### 간단하게 표현한 쿠버네티스 아키텍처 구조
<img width="2048" height="1260" alt="image" src="https://github.com/user-attachments/assets/2bf10e02-6dd3-485d-9c4e-3153f0cb761f" />
- `쿠버네티스 클러스터` : 하나의 **마스터 노드**와 여러 **워커 노드**들을 한 묶음으로 부르는 단위
- `마스터 노드` : 쿠버네티스 클러스터 전체를 관리하는 서버 (명령어 치면 지시함)
- `워커 노드` : 쿠버네티스의 파드를 실행시키는 서버 (마스터 노드의 명령에 따라 행동)

### EKS를 활용해 구성할 아키텍처 구조
<img width="2048" height="818" alt="image" src="https://github.com/user-attachments/assets/7234d457-9278-42ec-8e0e-21d56572f374" />

# EKS 클러스터 생성하기 (Ver. 25년 2월)
### EKS 클러스터 생성하기
1. EKS 서비스로 들어가기
<img width="2048" height="468" alt="image" src="https://github.com/user-attachments/assets/60d84a3f-5e3b-41f3-8a6a-cdc29f78e52e" />

2. 클러스터 추가하기
<img width="2048" height="604" alt="image" src="https://github.com/user-attachments/assets/8939fb1e-7eb0-47ca-9f40-7644925c4361" />

3. 클러스터 구성 셋팅하기
<img width="2048" height="1305" alt="image" src="https://github.com/user-attachments/assets/3ebe3d90-095a-40b1-a695-857b07702ec1" />

4. EKS 클러스터의 IAM 역할 생성하기
<img width="2048" height="1286" alt="image" src="https://github.com/user-attachments/assets/d6ba407b-3efe-4f55-8e23-54f84c5771ed" />
<img width="2048" height="1600" alt="image" src="https://github.com/user-attachments/assets/dca8a613-a5e3-4aaf-889f-21acfeb5d0d9" />
<img width="2048" height="548" alt="image" src="https://github.com/user-attachments/assets/32c20849-cfab-4756-8013-d54f2a78147a" />
<img width="2048" height="1861" alt="image" src="https://github.com/user-attachments/assets/7341de07-3f5c-421b-8a2e-219b8f9ae885" />

5. 방금 생성한 역할 선택해 지정하기
<img width="2048" height="651" alt="image" src="https://github.com/user-attachments/assets/c6c7bb4e-d240-4543-bf44-166c87ce03de" />

6. 나머지 옵션은 그대로 두고 다음 버튼 누르기
<img width="2000" height="1760" alt="image" src="https://github.com/user-attachments/assets/9df39fcf-825e-4c0c-a7a6-7e660e43bf11" />
<img width="2048" height="873" alt="image" src="https://github.com/user-attachments/assets/8b4dd8cd-b829-4066-bac9-1b9846640150" />

7. 다음 단계에서도 기본 옵션 그대로 두고 다음 버튼 누르기
<img width="2048" height="1917" alt="image" src="https://github.com/user-attachments/assets/54004142-b441-4900-bc80-2b00854abe85" />
<img width="2048" height="1440" alt="image" src="https://github.com/user-attachments/assets/11e2dbaa-2f85-4528-96ae-7bda26ef5513" />
<img width="1484" height="2220" alt="image" src="https://github.com/user-attachments/assets/e3a81739-2c6a-40b8-99d4-c04d0f80fbcf" />
<img width="1848" height="1980" alt="image" src="https://github.com/user-attachments/assets/f03eb7ee-4395-4164-ab75-ec4611f9d03e" />
<img width="1872" height="2610" alt="image" src="https://github.com/user-attachments/assets/df57b0c7-432d-48ff-a351-d641b140b1ec" />
<img width="1860" height="2028" alt="image" src="https://github.com/user-attachments/assets/a68b6153-8678-4489-af38-32d1dd504966" />

8. 생성이 완료될 때까지 기다리기
약 10분~15분 정도 걸린다. 
<img width="2048" height="1194" alt="image" src="https://github.com/user-attachments/assets/e5ed4789-02f4-4b32-8c90-59d980b09aac" />
<img width="2048" height="829" alt="image" src="https://github.com/user-attachments/assets/1a4ade9e-f1d1-4731-b9a8-8c5bac895c3f" />

# EKS 워커 노드 추가하기 (Ver. 25년 2월)
### EKS 워커 노드 추가하기
1. 노드 그룹 추가하기
<img width="2048" height="1695" alt="image" src="https://github.com/user-attachments/assets/44629552-9059-4861-91b1-bc25a1ef37bb" />

2. 노드 그룹 구성 셋팅하기
<img width="2048" height="850" alt="image" src="https://github.com/user-attachments/assets/49168755-df24-4ca5-9cea-fa22694b1db0" />

3. EKS 노드 그룹의 IAM Role 생성하기
<img width="2048" height="1456" alt="image" src="https://github.com/user-attachments/assets/da252a98-3a68-4bea-a3e3-d634b21d9d57" />
<img width="2048" height="1733" alt="image" src="https://github.com/user-attachments/assets/6ab64fa5-5884-452b-8356-ac6bd14b4bda" />
<img width="2048" height="2028" alt="image" src="https://github.com/user-attachments/assets/cdd1d99a-b640-4a5c-97d9-7939e499d0f0" />

4. 방금 생성한 Role 선택해 지정하기
<img width="2048" height="817" alt="image" src="https://github.com/user-attachments/assets/a9dbce98-b3e1-4f75-996e-c703510c8d90" />
<img width="2048" height="1322" alt="image" src="https://github.com/user-attachments/assets/64368734-1494-4322-8975-060c826d7e8a" />

5. 컴퓨팅 및 조정 구성 설정하기
<img width="2000" height="957" alt="image" src="https://github.com/user-attachments/assets/b1c01e6c-9cff-4f31-9c19-eed27732cb48" />
<img width="2048" height="1871" alt="image" src="https://github.com/user-attachments/assets/479ffdae-0da0-4fcf-9ea9-aa6e95daea4a" />

6. 나머지 옵션은 그대로 두기
<img width="2048" height="766" alt="image" src="https://github.com/user-attachments/assets/d160eca3-3716-45ec-a3b5-febe4f84dd93" />
<img width="2048" height="1858" alt="image" src="https://github.com/user-attachments/assets/2b46bce8-93e3-4a36-8d52-8577f1d21e78" />
<img width="2048" height="1782" alt="image" src="https://github.com/user-attachments/assets/dfe04923-63da-4ebc-9d94-dc690256b535" />

7. 노드 그룹이 생성될 때까지 기다리기
<img width="2048" height="1288" alt="image" src="https://github.com/user-attachments/assets/03cfecdd-4ff5-4002-9f60-1222f882b90f" />
<img width="2048" height="1503" alt="image" src="https://github.com/user-attachments/assets/00905221-130f-4ef9-bcf8-cb3c73e069a3" />
10분 정도 기다리면 활성화된다. 만약 20분 정도까지 기다렸는데도 활성화가 되지 않는다면 노드 그룹을 삭제하고 다시 생성해보자. 

8. EC2 인스턴스 확인하기
EC2 인스턴스 페이지에 들어가면 새로운 EC2 인스턴스 2개가 생성되어 있는 걸 확인할 수 있다. EKS 클러스터에서 하나의 워커 노드(Worker Node)가 하나의 EC2 인스턴스에서 실행되는 구조이기 때문이다.
<img width="2048" height="549" alt="image" src="https://github.com/user-attachments/assets/50fec831-e9a0-4178-96cc-362e3c9978d8" />

# 로컬에서 EKS 클러스터 조정할 수 있게 셋팅하기
### 로컬에서 EKS 클러스터 조정할 수 있게 셋팅하기
1. 현재 kubectl이 어떤 클러스터 환경에서 작동되고 있는 지 확인하기
```
$ kubectl config get-contexts
```
<img width="654" height="83" alt="image" src="https://github.com/user-attachments/assets/04008a65-bd1f-4302-9564-636348764892" />

2. kubectl에 EKS 클러스터 추가하기
```
# aws eks --rgeion ap-northeast-2 update-kubeconfig --name <EKS 클러스터 이름>
$ aws eks --region ap-northeast-2 update-kubeconfig --name kube-practice
```

3. 잘 적용됐는 지 확인하기
```
$ kubectl config get-contexts
```

<img width="2048" height="94" alt="image" src="https://github.com/user-attachments/assets/754eaab1-9f44-43d3-9b8f-d66447d8bb17" />

[참고]
```bash
# 다른 클러스터로 전환
$ kubectl config use-context <컨텍스트 이름>

# 특정 컨텍스트 삭제
$ kubectl config unset contexts.<컨텍스트 이름>
```

# EKS에 백엔드(Spring Boot) 서버 배포하기 (+ RDS, ECR)
### EKS에 백엔드(Spring Boot) 서버 배포하기 (+ RDS, ECR)
1. 매니페스트 파일 수정하기
spring-deployment.yaml
```bash
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
          image: 002177417362.dkr.ecr.ap-northeast-2.amazonaws.com/kube-ecr:2.0 # 컨테이너를 생성할 때 사용할 이미지
          ports:
            - containerPort: 8080  # 컨테이너에서 사용하는 포트를 명시적으로 표현
          env:
            - name: DB_HOST
              valueFrom:
                configMapKeyRef:
                  name: spring-config
                  key: db-host
            - name: DB_PORT
              valueFrom:
                configMapKeyRef:
                  name: spring-config
                  key: db-port
            - name: DB_NAME
              valueFrom:
                configMapKeyRef:
                  name: spring-config
                  key: db-name
            - name: DB_USERNAME
              valueFrom:
                secretKeyRef:
                  name: spring-secret
                  key: db-username
            - name: DB_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: spring-secret
                  key: db-password
```

spring-secret.yaml
```bash
apiVersion: v1
kind: Secret
type: Opaque # 임의의 사용자 정의 데이터를 저장할 때 사용하는 타입

# Secret 기본 정보
metadata:
  name: spring-secret # Secret 이름

# Key, Value 형식으로 값 저장
stringData:
  db-username: admin
  db-password: password
```

spring-config.yaml
```bash
apiVersion: v1
kind: ConfigMap

# ConfigMap 기본 정보
metadata:
  name: spring-config # ConfigMap 이름

# Key, Value 형식으로 설정값 저장
data:
  db-host: kube-database.coseefawhrzc.ap-northeast-2.rds.amazonaws.com
  db-port: "3306"
  db-name: mydb
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
  type: LoadBalancer # Service의 종류
  selector:
    app: backend-app # 실행되고 있는 파드 중 'app: backend-app'이라는 값을 가진 파드와 서비스를 연결
  ports:
    - protocol: TCP # 서비스에 접속하기 위한 프로토콜
      port: 80 # 외부에서 사용자가 요청을 보낼 때 사용하는 포트 번호
      targetPort: 8080 # 매핑하기 위한 파드의 포트 번호
```
- `NodePort` : 쿠버네티스 내부에서 해당 서비스에 접속하기 위한 포트를 열고 외부에서 접속 가능하도록 한다. ⇒ **들어오는 요청을 여러 Worker Node로 트래픽을 분산시키지 않는다.**
- `ClusterIP` : 쿠버네티스 내부에서만 통신할 수 있는 IP 주소를 부여. 외부에서는 요청할 수 없다.
- `LoadBalancer` : 외부의 로드밸런서(AWS의 로드밸런서 등)를 활용해 외부에서 접속할 수 있도록 연결한다. ⇒ **들어오는 요청을 여러 Worker Node로 트래픽을 분산시켜준다.**

2. 매니페스트 파일을 통해 오브젝트 생성하기
```
$ kubectl apply -f spring-secret.yaml
$ kubectl apply -f spring-config.yaml
$ kubectl apply -f spring-deployment.yaml
$ kubectl apply -f spring-service.yaml
```

3. 잘 생성됐는 지 확인하기
```
$ kubectl get secret
$ kubectl get configmap
$ kubectl get deployment
$ kubectl get pods
```
```
$ kubectl get service
```
<img width="2048" height="145" alt="image" src="https://github.com/user-attachments/assets/0dd29548-8386-4c1a-81b4-efb7d4a034a1" />
Service의 Type을 LoadBalancer로 했더니 외부에서 접속할 수 있는 주소가 주어졌다. 

4. Service의 주소로 접속해보기
<img width="1702" height="336" alt="image" src="https://github.com/user-attachments/assets/72fc5774-3c33-4970-aa8b-b021d2d1b18b" />

5. 정말 로드밸런서가 생성됐는 지 확인하기 
<img width="2048" height="1181" alt="image" src="https://github.com/user-attachments/assets/6fd39939-45b2-439d-a896-f845daa3ef61" />

###  아키텍처 다시 한 번 짚어보기
<img width="2048" height="834" alt="image" src="https://github.com/user-attachments/assets/5c501c0c-c5bb-440c-953c-7c430d65690d" />

# 앞으로 해야할 공부
1. 쿠버네티스 관련 책 정독
2. https 붙이기
3. 도메인 붙이기
4. CI/CD 구성하기
